import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Search, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import projectService from "@/services/projectService";

export const Route = createFileRoute("/group")({
  component: () => (
    <ProtectedRoute>
      <GroupPage />
    </ProtectedRoute>
  ),
});

const members = [
  { name: "Bagas Mahpie", role: "Developer", online: true },
  { name: "Sir Dandy", role: "Designer", online: true },
  { name: "Jhon Tosan", role: "Researcher", online: false },
  { name: "Luna Kira", role: "Project Lead", online: true },
  { name: "Ahmad Faisal", role: "Backend Dev", online: false },
];

function GroupPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const { data: teams = [], isLoading } = useQuery({
    queryKey: ["my-teams"],
    queryFn: () => projectService.getMyTeams(),
  });

  // Gather all unique members across all my projects
  const allMembers = teams.flatMap((team) =>
    team.members.map((m) => ({ ...m, project: team.title }))
  );
  const unique = allMembers.filter(
    (m, i, arr) => arr.findIndex((x) => x.user_id === m.user_id) === i
  );
  const filtered = unique.filter(
    (m) =>
      !search ||
      m.full_name.toLowerCase().includes(search.toLowerCase()) ||
      m.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold font-display mb-6">{t("myGroup")}</h1>

      <div className="retro-card rounded-xl bg-card p-4 mb-6 flex items-center gap-3">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchMembers")}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-card p-12 text-center text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm">
            {search ? `No members matching "${search}"` : "No team members yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <div key={m.user_id} className="retro-card rounded-xl bg-card p-5 flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {m.full_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{m.full_name}</p>
                <p className="text-xs text-muted-foreground">@{m.username}</p>
                <p className="text-[10px] text-primary font-medium mt-0.5 truncate">{m.project}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
