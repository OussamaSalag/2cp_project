import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Users, Mail, GraduationCap, Pencil, Check, X, LogOut } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import userService from "@/services/userService";
import projectService from "@/services/projectService";
import type { SkillResponse } from "@/types/api";

export const Route = createFileRoute("/profile")({
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className}`} />;
}

function ProfilePage() {
  const { t } = useLanguage();
  const { logout, user } = useAuth();
  const queryClient = useQueryClient();

  // Edit state
  const [editing, setEditing] = useState(false);
  const [editFullName, setEditFullName] = useState("");
  const [editBio, setEditBio] = useState("");

  // ── Fetch data ────────────────────────────────────────────────────────────
  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
  });

  const { data: skills = [], isLoading: loadingSkills } = useQuery({
    queryKey: ["my-skills"],
    queryFn: () => userService.getMySkills(),
  });

  const { data: myTeams = [], isLoading: loadingTeams } = useQuery({
    queryKey: ["my-teams"],
    queryFn: () => projectService.getMyTeams(),
  });

  // ── Update profile mutation ───────────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: () =>
      userService.updateProfile({
        full_name: editFullName || profile?.full_name,
        bio: editBio || profile?.bio || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated!");
      setEditing(false);
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const startEdit = () => {
    setEditFullName(profile?.full_name ?? "");
    setEditBio(profile?.bio ?? "");
    setEditing(true);
  };

  const displayName = profile?.full_name ?? user?.full_name ?? "—";
  const displayEmail = profile?.email ?? user?.email ?? "—";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header card */}
        <div className="retro-card rounded-2xl bg-card overflow-hidden">
          {/* Cover */}
          <div className="relative h-44 overflow-hidden bg-gradient-to-b from-[#0a1a3a] via-[#0d2451] to-[#1a2f5c]">
            {Array.from({ length: 30 }).map((_, i) => {
              const left = (i * 37) % 100;
              const size = 1 + (i % 4) * 0.8;
              const duration = 5 + (i % 6);
              const delay = (i % 10) * 0.6;
              const opacity = 0.4 + (i % 5) * 0.12;
              return (
                <span
                  key={i}
                  className="absolute top-0 rounded-full bg-white animate-snow-fall"
                  style={{
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
          </div>

          <div className="px-8 pb-6 -mt-14 flex items-end gap-5">
            {/* Avatar initials */}
            <div className="relative">
              <div className="h-28 w-28 rounded-full border-4 border-card bg-primary/20 flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-primary">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="pb-2 flex-1">
              {editing ? (
                <input
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="text-2xl font-bold font-display bg-transparent border-b-2 border-primary outline-none w-full"
                />
              ) : loadingProfile ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                <h1 className="text-2xl font-bold font-display">{displayName}</h1>
              )}
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <GraduationCap className="h-4 w-4" /> {t("student")}
              </p>
            </div>
            <div className="pb-2 flex items-center gap-2">
              {editing ? (
                <>
                  <button
                    onClick={() => updateMutation.mutate()}
                    disabled={updateMutation.isPending}
                    className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {updateMutation.isPending ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="rounded-lg border border-border px-4 py-2 text-xs font-semibold"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={startEdit}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" /> {t("edit")}
                </button>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-lg border border-destructive/50 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Profile fields */}
        <div className="retro-card rounded-xl bg-card divide-y divide-border">
          {loadingProfile ? (
            [0, 1, 2].map((i) => (
              <div key={i} className="px-8 py-4">
                <Skeleton className="h-5 w-full" />
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center gap-8 px-8 py-4">
                <span className="text-sm font-semibold text-muted-foreground w-32 shrink-0 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {t("schoolEmail")}
                </span>
                <span className="text-sm font-medium">{displayEmail}</span>
              </div>
              <div className="flex items-center gap-8 px-8 py-4">
                <span className="text-sm font-semibold text-muted-foreground w-32 shrink-0">Username</span>
                <span className="text-sm font-medium">@{profile?.username ?? "—"}</span>
              </div>
              <div className="flex items-start gap-8 px-8 py-4">
                <span className="text-sm font-semibold text-muted-foreground w-32 shrink-0 mt-0.5">Bio</span>
                {editing ? (
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows={2}
                    placeholder="Tell us about yourself…"
                    className="flex-1 text-sm bg-transparent border-2 border-border rounded-lg px-3 py-2 outline-none focus:border-primary resize-none"
                  />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    {profile?.bio || "No bio yet"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-8 px-8 py-4">
                <span className="text-sm font-semibold text-muted-foreground w-32 shrink-0">Member since</span>
                <span className="text-sm font-medium">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
                    : "—"}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Skills */}
        <div className="retro-card rounded-xl bg-card p-6">
          <h2 className="text-lg font-bold font-display mb-4">{t("mySkills")}</h2>
          {loadingSkills ? (
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-8 w-20 rounded-full" />)}
            </div>
          ) : skills.length === 0 ? (
            <p className="text-sm text-muted-foreground">No skills added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((s: SkillResponse) => (
                <span key={s.id} className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
                  {s.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* My Teams */}
        <div className="retro-card rounded-xl bg-card p-6">
          <h2 className="text-lg font-bold font-display mb-4">{t("myTeamsProfile")}</h2>
          {loadingTeams ? (
            <div className="space-y-3">
              {[0, 1].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
            </div>
          ) : myTeams.length === 0 ? (
            <p className="text-sm text-muted-foreground">You haven't joined any projects yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myTeams.map((team) => (
                <div key={team.id} className="rounded-2xl border border-border bg-background p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold font-display text-base">{team.title}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${
                      team.status === "in_progress"
                        ? "bg-blue-500/20 text-blue-600"
                        : team.status === "open"
                        ? "bg-violet-500/20 text-violet-600"
                        : "bg-emerald-500/20 text-emerald-600"
                    }`}>
                      {team.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{team.description}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {team.member_count} / {team.max_members} {t("members")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
