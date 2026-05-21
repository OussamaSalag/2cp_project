import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Search, Plus, Users, ArrowRight, GraduationCap,
  UserPlus, FolderOpen, X, Loader2,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import projectService from "@/services/projectService";
import type { ProjectResponse } from "@/types/api";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/projects")({
  component: () => (
    <ProtectedRoute>
      <ProjectsPage />
    </ProtectedRoute>
  ),
});

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className}`} />;
}

function statusColor(status: string) {
  if (status === "open") return "bg-violet-500/20 text-violet-600";
  if (status === "in_progress") return "bg-blue-500/20 text-blue-600";
  if (status === "completed") return "bg-emerald-500/20 text-emerald-600";
  return "bg-muted text-muted-foreground";
}

function ProjectCard({
  p,
  onJoin,
  isOwner,
}: {
  p: ProjectResponse;
  onJoin: (id: string) => void;
  isOwner: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div className="retro-card rounded-xl bg-card overflow-hidden">
      {/* Cover / placeholder */}
      <div className="w-full h-32 bg-gradient-to-br from-primary/20 via-card to-accent/20 flex items-center justify-center">
        <FolderOpen className="h-10 w-10 text-primary/40" />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold font-display">{p.title}</h3>
          <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${statusColor(p.status)}`}>
            {p.status.replace("_", " ")}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>

        {p.required_skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {p.required_skills.slice(0, 3).map((s) => (
              <span key={s.id} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                {s.name}
              </span>
            ))}
            {p.required_skills.length > 3 && (
              <span className="text-[10px] text-muted-foreground">+{p.required_skills.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {p.member_count}/{p.max_members} {t("members")}
          </span>
          {!isOwner && p.status === "open" && (
            <button
              onClick={() => onJoin(p.id)}
              className="flex items-center gap-1 text-xs font-semibold text-primary border border-primary rounded-lg px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <UserPlus className="h-3.5 w-3.5" /> Join
            </button>
          )}
          {isOwner && (
            <span className="text-xs text-muted-foreground italic">Your project</span>
          )}
          {!isOwner && p.status !== "open" && (
            <button className="flex items-center gap-1 text-sm font-semibold text-primary">
              {t("view")} <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CreateProjectModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState(5);
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      projectService.createProject({ title, description, max_members: maxMembers }),
    onSuccess: () => {
      toast.success("Project created!");
      onCreated();
      onClose();
    },
    onError: () => toast.error("Failed to create project"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display">New Project</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            className="mt-1 w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this project about?"
            rows={3}
            className="mt-1 w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Max Members: {maxMembers}
          </label>
          <input
            type="range"
            min={2}
            max={10}
            value={maxMembers}
            onChange={(e) => setMaxMembers(Number(e.target.value))}
            className="mt-2 w-full accent-primary"
          />
        </div>
        <button
          onClick={() => mutate()}
          disabled={!title.trim() || !description.trim() || isPending}
          className="retro-btn w-full rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating…</> : "Create Project"}
        </button>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const { t } = useLanguage();
  const { storedUser } = useAuth();
  const queryClient = useQueryClient();
  const tabs = [t("explore"), t("join"), t("create")] as const;
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const isExplore = activeTab === t("explore");
  const isJoin = activeTab === t("join");
  const isCreate = activeTab === t("create");

  // Explore: all projects
  const { data: allProjects = [], isLoading: loadingAll } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.listProjects({ limit: 20 }),
    enabled: isExplore,
  });

  // My teams
  const { data: myTeams = [], isLoading: loadingMine } = useQuery({
    queryKey: ["my-teams"],
    queryFn: () => projectService.getMyTeams(),
    enabled: isJoin || isCreate,
  });

  // Search
  const { data: searchResults = [], isLoading: loadingSearch } = useQuery({
    queryKey: ["projects-search", search],
    queryFn: () => projectService.searchProjects(search),
    enabled: isExplore && search.trim().length >= 2,
  });

  // Join mutation
  const joinMutation = useMutation({
    mutationFn: (projectId: string) => projectService.joinProject(projectId),
    onSuccess: () => {
      toast.success("Join request sent!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["my-teams"] });
    },
    onError: () => toast.error("Failed to send join request"),
  });

  const displayProjects: ProjectResponse[] =
    isExplore && search.trim().length >= 2
      ? searchResults
      : isExplore
      ? allProjects
      : myTeams;

  const isLoading = isExplore ? loadingAll || loadingSearch : loadingMine;

  const topRightAction = isCreate ? (
    <button
      onClick={() => setShowCreate(true)}
      className="retro-btn flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
    >
      <Plus className="h-4 w-4" /> {t("newProject")}
    </button>
  ) : isJoin ? (
    <span className="text-xs text-muted-foreground">Your joined projects</span>
  ) : null;

  return (
    <DashboardLayout>
      {showCreate && (
        <CreateProjectModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            queryClient.invalidateQueries({ queryKey: ["my-teams"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
          }}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-display">{t("projects")}</h1>
        {topRightAction}
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`retro-btn rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isExplore && (
        <div className="retro-card rounded-xl bg-card p-4 mb-6 flex items-center gap-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchProjects")}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
      ) : displayProjects.length === 0 ? (
        <div className="rounded-2xl bg-card p-12 text-center text-muted-foreground">
          <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm">
            {isExplore && search
              ? `No results for "${search}"`
              : isJoin
              ? "You haven't joined any projects yet."
              : "No projects found. Be the first to create one!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayProjects.map((p) => (
            <ProjectCard
              key={p.id}
              p={p}
              onJoin={(id) => joinMutation.mutate(id)}
              isOwner={p.owner_id === storedUser?.user_id}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
