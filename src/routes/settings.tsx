import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { Bell, Moon, Globe, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageNames, type Language } from "@/i18n/translations";

export const Route = createFileRoute("/settings")({
  component: () => (
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  ),
});

function SettingsPage() {
  const { t, lang, setLang } = useLanguage();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailNotifs: true,
    soundEffects: false,
    profileVisibility: true,
    showOnlineStatus: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold font-display mb-6">{t("settings")}</h1>
      <div className="space-y-4">
        <div className="retro-card rounded-xl bg-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-bold font-display">{t("notifications")}</h2>
          </div>
          <div className="space-y-3">
            <ToggleRow label={t("pushNotifications")} desc={t("pushNotificationsDesc")} checked={settings.notifications} onChange={() => toggle("notifications")} />
            <ToggleRow label={t("emailNotifications")} desc={t("emailNotificationsDesc")} checked={settings.emailNotifs} onChange={() => toggle("emailNotifs")} />
            <ToggleRow label={t("soundEffects")} desc={t("soundEffectsDesc")} checked={settings.soundEffects} onChange={() => toggle("soundEffects")} />
          </div>
        </div>

        <div className="retro-card rounded-xl bg-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <Moon className="h-5 w-5 text-primary" />
            <h2 className="font-bold font-display">{t("appearance")}</h2>
          </div>
          <ToggleRow label={t("darkMode")} desc={t("darkModeDesc")} checked={settings.darkMode} onChange={() => toggle("darkMode")} />
        </div>

        <div className="retro-card rounded-xl bg-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="font-bold font-display">{t("privacy")}</h2>
          </div>
          <div className="space-y-3">
            <ToggleRow label={t("profileVisibility")} desc={t("profileVisibilityDesc")} checked={settings.profileVisibility} onChange={() => toggle("profileVisibility")} />
            <ToggleRow label={t("showOnlineStatus")} desc={t("showOnlineStatusDesc")} checked={settings.showOnlineStatus} onChange={() => toggle("showOnlineStatus")} />
          </div>
        </div>

        <div className="retro-card rounded-xl bg-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="font-bold font-display">{t("language")}</h2>
          </div>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
          >
            {(Object.entries(languageNames) as [Language, string][]).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        <button className="retro-btn rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground">
          {t("saveChanges")}
        </button>
      </div>
    </DashboardLayout>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}
