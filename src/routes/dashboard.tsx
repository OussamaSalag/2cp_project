import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Users, MessageSquare, CheckCircle2, ArrowRight, Quote,
  RefreshCw, Loader2, GraduationCap, Circle, Pen, ChevronDown,
} from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import taskService from "@/services/taskService";
import type { TaskResponse, ProjectResponse, TaskStatus } from "@/types/api";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const mentors = [
  { name: "Z. Louhab", subject: "UI/UX Design" },
  { name: "Oussama Serhane", subject: "Web Dev" },
  { name: "Bekkouche Mohammed", subject: "Data Science" },
  { name: "Saidi Mohammed El Fatih", subject: "Software Engineering" },
  { name: "Si Mohammed Nasreddine", subject: "AI & ML" },
];

const quotes = [
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Education is the most powerful weapon you can use to change the world.", author: "Nelson Mandela" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
];

// ── Skeleton ──────────────────────────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-muted ${className}`} />
  );
}

// ── Task status badge ─────────────────────────────────────────────────────
function statusLabel(s: string) {
  if (s === "done") return "Done";
  if (s === "in_progress") return "In Progress";
  return "To Do";
}

function DashboardPage() {
  const { user, storedUser } = useAuth();
  const { t } = useLanguage();

  // Quote rotator
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextQuote = useCallback(() => {
    setAnimating(true);
    setTimeout(() => { setQuoteIndex((prev) => (prev + 1) % quotes.length); setAnimating(false); }, 300);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(nextQuote, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [nextQuote]);

  const handleQuoteClick = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    nextQuote();
    timerRef.current = setInterval(nextQuote, 5000);
  };

  // ── Data fetching ─────────────────────────────────────────────────────────
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => taskService.getDashboard(),
    staleTime: 1000 * 60, // 1 min
  });

  const displayName = user?.full_name || storedUser?.full_name || "there";
  const myProjects: ProjectResponse[] = dashboard?.my_projects ?? [];
  const recentTasks: TaskResponse[] = dashboard?.recent_tasks ?? [];
  const summary = dashboard?.tasks_summary ?? { todo: 0, in_progress: 0, done: 0 };
  const currentQuote = quotes[quoteIndex];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome banner */}
          <div className="rounded-2xl bg-gradient-to-br from-[hsl(202,77%,62%)] via-[hsl(210,72%,55%)] to-[hsl(195,80%,50%)] p-8 text-white relative overflow-hidden shadow-lg shadow-primary/20">
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore background="transparent" minSize={0.4} maxSize={1.4} particleDensity={100} className="w-full h-full" particleColor="#FFFFFF" speed={1} />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium opacity-80">{t("welcomeBack")}</p>
              <h1 className="mt-2 text-3xl font-bold font-display">
                Hey, {displayName} 👋
              </h1>
              <p className="mt-2 text-sm opacity-80">{t("continueJourney")}</p>
            </div>
          </div>

          {/* Task Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "To Do", value: summary.todo, color: "text-orange-500" },
              { label: "In Progress", value: summary.in_progress, color: "text-blue-500" },
              { label: "Done", value: summary.done, color: "text-emerald-500" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-card p-4 text-center shadow-sm">
                {isLoading ? (
                  <Skeleton className="h-8 w-12 mx-auto mb-1" />
                ) : (
                  <p className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* My Teams */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-display">{t("myTeams")}</h2>
              <a href="/projects" className="text-sm text-primary font-semibold flex items-center gap-1">
                {t("seeAll")} <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-32 w-full" />
              </div>
            ) : myProjects.length === 0 ? (
              <div className="rounded-2xl bg-card p-8 text-center text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p className="text-sm">You're not in any teams yet.</p>
                <a href="/projects" className="mt-3 inline-block text-primary text-sm font-semibold">
                  Browse projects →
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {myProjects.map((team) => (
                  <div
                    key={team.id}
                    className="group relative rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 p-4 shadow-sm hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="h-1.5 w-12 rounded-full bg-primary" />
                        <h3 className="font-bold font-display text-base">{team.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{team.description}</p>
                      </div>
                      <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                        team.status === "in_progress"
                          ? "text-primary bg-primary/10"
                          : team.status === "open"
                          ? "text-violet-600 bg-violet-500/10"
                          : "text-emerald-600 bg-emerald-500/10"
                      }`}>
                        {team.status === "in_progress" && <Loader2 className="h-3 w-3 animate-spin" />}
                        {team.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {team.member_count} members
                      </span>
                      <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full capitalize">
                        {team.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Tasks */}
          <div>
            <h2 className="text-xl font-bold font-display mb-4">{t("incompleteTasks")}</h2>
            {isLoading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => <Skeleton key={i} className="h-20 w-full" />)}
              </div>
            ) : recentTasks.length === 0 ? (
              <div className="rounded-2xl bg-card p-8 text-center text-muted-foreground">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No tasks yet. Create one in the Tasks page.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTasks.map((task, i) => (
                  <TaskCard key={task.id} task={task} index={i} t={t} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 shadow-sm flex flex-col items-center text-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-primary/30 blur-2xl" />
              <div className="absolute -bottom-10 -right-6 h-36 w-36 rounded-full bg-accent/40 blur-2xl" />
            </div>
            <div className="relative h-20 w-20 rounded-full bg-primary/20 border-4 border-primary/40 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <h3 className="relative mt-4 font-bold font-display text-lg">
              {displayName} 🔥
            </h3>
            <p className="relative mt-1 text-xs text-muted-foreground">
              Ready to create magic today?
            </p>
          </div>

          {/* Quote card */}
          <div
            onClick={handleQuoteClick}
            className="rounded-2xl bg-gradient-to-br from-[hsl(202,77%,62%)] to-[hsl(195,80%,50%)] p-6 text-white cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden shadow-lg shadow-primary/20"
          >
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore background="transparent" minSize={0.4} maxSize={1.4} particleDensity={80} className="w-full h-full" particleColor="#FFFFFF" speed={1} />
            </div>
            <div className={`relative z-10 transition-all duration-300 ${animating ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"}`}>
              <div className="flex items-center justify-between mb-3">
                <Quote className="h-8 w-8 opacity-60" />
                <RefreshCw className="h-4 w-4 opacity-50" />
              </div>
              <p className="text-lg font-display font-bold leading-snug">"{currentQuote.text}"</p>
              <p className="mt-3 text-sm opacity-80">— {currentQuote.author}</p>
              <p className="mt-2 text-[10px] opacity-40">{t("clickForQuote")}</p>
            </div>
          </div>

          {/* Mentors */}
          <MentorsCard mentors={mentors} t={t} />
        </div>
      </div>
    </DashboardLayout>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

function MentorsCard({ mentors, t }: { mentors: { name: string; subject: string }[]; t: (k: string) => string }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? mentors : mentors.slice(0, 3);
  const hiddenCount = mentors.length - 3;
  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm">
      <h3 className="font-bold font-display mb-4">Mentors</h3>
      <div className="space-y-3">
        {visible.map((m) => (
          <div key={m.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.subject}</p>
              </div>
            </div>
            <button className="rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              {t("follow")}
            </button>
          </div>
        ))}
      </div>
      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 w-full flex items-center justify-center gap-1 rounded-full bg-primary/10 hover:bg-primary/20 px-3 py-2 text-xs font-semibold text-primary transition-colors"
        >
          {expanded ? "Show less" : `+${hiddenCount} more`}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}

function TaskCard({ task, index, t }: { task: TaskResponse; index: number; t: (k: string) => string }) {
  const queryClient = useQueryClient();
  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
      taskService.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => toast.error("Failed to update task status"),
  });

  const done = task.status === "done";
  
  const handleToggle = () => {
    const next: TaskStatus = done ? "todo" : "done";
    toggleMutation.mutate({ id: task.id, status: next });
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl p-4 shadow-sm transition-all duration-500 ${done ? "bg-gradient-to-br from-emerald-500/10 via-card to-primary/10" : "bg-gradient-to-br from-primary/5 via-card to-accent/10 hover:shadow-md hover:-translate-y-0.5"}`}>
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${done ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-primary/10 text-primary"}`}>
            {done ? <CheckCircle2 className="h-4.5 w-4.5" /> : <Pen className="h-4 w-4" />}
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-semibold truncate transition-all duration-300 ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {task.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {task.source} · <span className="font-medium">{statusLabel(task.status)}</span>
              {task.due_date && ` · Due ${new Date(task.due_date).toLocaleDateString()}`}
            </p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          disabled={toggleMutation.isPending}
          className={`relative shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 ${done ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30" : "bg-muted text-muted-foreground border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"}`}
        >
          {done ? <><CheckCircle2 className="h-3.5 w-3.5" /> Done</> : <><Circle className="h-3.5 w-3.5" /> Mark</>}
        </button>
      </div>
    </div>
  );
}
