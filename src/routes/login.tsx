import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { GeometricBackground } from "@/components/ui/shape-landing-hero";
import { useLanguage } from "@/i18n/LanguageContext";
import authService from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login — TeamUp" },
      { name: "description", content: "Sign in to your TeamUp account." },
    ],
  }),
});

function LoginPage() {
  const { t } = useLanguage();
  const { refreshUser, isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      window.location.replace("/dashboard");
    }
  }, [isAuthenticated, authLoading]);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (val: string) => {
    if (!val.endsWith("@esi-sba.dz")) {
      setEmailError(t("emailDomainError"));
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (val: string) => {
    if (val.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const emailOk = validateEmail(email);
    const passOk = validatePassword(password);
    if (!emailOk || !passOk) return;

    setLoading(true);
    try {
      await authService.login({ email, password });
      await refreshUser();
      toast.success("Welcome back! 🎉");
      window.location.href = "/dashboard";
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          toast.error("Invalid email or password");
        } else if (err.status === 403) {
          toast.error("Please verify your email first. Check your inbox.");
        } else {
          toast.error(err.detail || "Login failed");
        }
      } else {
        toast.error("Could not connect to server. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative">
      <GeometricBackground />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> {t("backToHome")}
        </Link>

        <div className="retro-card rounded-2xl bg-card p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Mail className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display">{t("welcomeBackLogin")}</h1>
              <p className="text-sm text-muted-foreground">{t("loginDesc")}</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("schoolEmail")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder={t("emailPlaceholder")}
                className="mt-2 w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              {emailError && (
                <p className="mt-1 text-xs text-destructive font-medium">{emailError}</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">{t("emailDomainHint")}</p>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) validatePassword(e.target.value);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border-2 border-border bg-background pl-9 pr-10 py-2.5 text-sm outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-xs text-destructive font-medium">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="retro-btn w-full rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            {t("dontHaveAccount")}{" "}
            <Link to="/signup" className="text-primary font-semibold">
              {t("signUp")}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
