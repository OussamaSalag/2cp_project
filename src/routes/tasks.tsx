import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CheckCircle2, Circle, Clock, Plus, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import taskService from "@/services/taskService";
import type { TaskResponse, TaskStatus } from "@/types/api";

export const Route = createFileRoute("/tasks")({
  component: () => (
    <ProtectedRoute>
      <TasksPage />
    </ProtectedRoute>
  ),
});

function StatusIcon({ status }: { status: string }) {
  if (status === "done") return <CheckCircle2 className="h-5 w-5 text-primary" />;
  if (status === "in_progress") return <Clock className="h-5 w-5 text-primary/70" />;
  return <Circle className="h-5 w-5 text-muted-foreground" />;
}

// ── Skeleton ──────────────────────────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className}`} />;
}

function TasksPage() {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  // ── Fetch tasks ───────────────────────────────────────────────────────────
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService.getMyTasks(),
  });

  // ── Toggle status mutation ────────────────────────────────────────────────
  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
      taskService.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => toast.error("Failed to update task status"),
  });

  // ── Create task mutation ──────────────────────────────────────────────────
  const createMutation = useMutation({
    mutationFn: (title: string) =>
      taskService.createTask({ title, source: "personal", status: "todo" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setNewTitle("");
      setShowCreate(false);
      toast.success("Task created!");
    },
    onError: () => toast.error("Failed to create task"),
  });

  const handleToggle = (task: TaskResponse) => {
    const next: TaskStatus = task.status === "done" ? "todo" : "done";
    toggleMutation.mutate({ id: task.id, status: next });
  };

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    createMutation.mutate(newTitle.trim());
  };

  // ── Group by source ───────────────────────────────────────────────────────
  const grouped: Record<string, TaskResponse[]> = {
    personal: [],
    project: [],
    mentor: [],
    system: [],
  };
  for (const t of tasks) {
    grouped[t.source] = [...(grouped[t.source] ?? []), t];
  }

  const categories = [
    { key: "personal", title: "Personal Tasks", color: "border-l-primary" },
    { key: "project", title: t("fromTeamLeader"), color: "border-l-blue-500" },
    { key: "mentor", title: t("fromMentor"), color: "border-l-primary/60" },
    { key: "system", title: "System Tasks", color: "border-l-primary/30" },
  ].filter((c) => (grouped[c.key]?.length ?? 0) > 0);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-display">{t("myTasks")}</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="retro-btn flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> New Task
        </button>
      </div>

      {/* Create task inline */}
      {showCreate && (
        <div className="rounded-xl bg-card border border-border p-4 mb-6 flex items-center gap-3">
          <input
            autoFocus
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="Task title…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={handleCreate}
            disabled={!newTitle.trim() || createMutation.isPending}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
          >
            {createMutation.isPending ? "…" : "Add"}
          </button>
          <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Progress */}
      <div className="rounded-xl bg-card border border-border p-5 mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{t("progress")}</span>
          <span className="text-sm font-bold text-primary">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-3" />
        <p className="text-xs text-muted-foreground">
          {completedTasks} / {totalTasks} {t("completed")}
        </p>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-2xl bg-card p-12 text-center text-muted-foreground">
          <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm">No tasks yet. Create your first task above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const catTasks = grouped[cat.key] ?? [];
            const catDone = catTasks.filter((t) => t.status === "done").length;
            const catPercent = catTasks.length > 0 ? Math.round((catDone / catTasks.length) * 100) : 0;
            return (
              <div key={cat.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-display">{cat.title}</h2>
                  <span className="text-xs font-semibold text-primary">{catPercent}%</span>
                </div>
                <Progress value={catPercent} className="h-2" />
                {catTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`retro-card rounded-xl bg-card p-4 border-l-4 ${cat.color} space-y-2`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.status === "done"}
                        onCheckedChange={() => handleToggle(task)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusIcon status={task.status} />
                          <p className="text-xs text-muted-foreground">
                            {task.due_date
                              ? `${t("due")}: ${new Date(task.due_date).toLocaleDateString()}`
                              : "No due date"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
