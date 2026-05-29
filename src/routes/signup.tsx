import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Handshake, ArrowLeft, KeyRound, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { GeometricBackground } from "@/components/ui/shape-landing-hero";
import { useLanguage } from "@/i18n/LanguageContext";
import authService from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Sign Up — TeamUp" },
      { name: "description", content: "Create your TeamUp account and start collaborating." },
    ],
  }),
});

function SignupPage() {
  const { t } = useLanguage();
  const { refreshUser, isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      window.location.replace("/dashboard");
    }
  }, [isAuthenticated, authLoading]);


  // Form state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const validateEmail = (val: string) => {
    if (!val.endsWith("@esi-sba.dz")) {
      setEmailError(t("emailDomainError"));
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateEmail(email)) {
      toast.error(t("emailDomainError"));
      return;
    }
    if (fullName.trim().length < 2) {
      toast.error("Full name must be at least 2 characters");
      return;
    }
    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        email,
        password,
        full_name: fullName.trim(),
        username: username.trim(),
      });
      await refreshUser();
      toast.success("Account created! Welcome to TeamUp 🎉");
      window.location.href = "/dashboard";
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          toast.error(err.detail); // "Email already registered" or "Username already taken"
        } else {
          toast.error(err.detail || "Registration failed");
        }
      } else {
        toast.error("Could not connect to server. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Registration form ─────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative">
      <GeometricBackground />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> {t("backToHome")}
        </Link>

        <form onSubmit={handleSubmit} className="retro-card rounded-2xl bg-card p-8 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Handshake className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-display">{t("createAccount")}</h1>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Ayoub Abdelliche"
              className="mt-2 w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

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
              placeholder={t("emailPlaceholder")}
              className="mt-2 w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            {emailError && (
              <p className="mt-1 text-xs text-destructive font-medium">{emailError}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">{t("emailDomainHint")}</p>
          </div>

          {/* Username */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("username")}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t("chooseUsername")}
              className="mt-2 w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full rounded-lg border-2 border-border bg-background px-4 pr-10 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              className="mt-2 w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email || !fullName || !username || !password || !confirmPassword}
            className="retro-btn block w-full rounded-xl bg-primary px-8 py-3 text-center text-sm font-bold text-primary-foreground disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Creating account…
              </>
            ) : (
              t("createAccount")
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            {t("alreadyHaveAccount")}{" "}
            <Link to="/login" className="text-primary font-semibold">{t("login")}</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
