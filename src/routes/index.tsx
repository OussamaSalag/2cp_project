import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Handshake, Users, FolderOpen, ListTodo, ArrowRight, Sparkles, Sun, Moon } from "lucide-react";
import { GeometricBackground } from "@/components/ui/shape-landing-hero";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/i18n/LanguageContext";
import heroImage from "@/assets/hero-illustration.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "TeamUp — Connect, Build, Innovate Together" },
      { name: "description", content: "The premium platform for students to discover teammates, showcase projects, and build the next generation of technology." },
    ],
  }),
});

function AnimatedWord({ children, delay }: { children: string; delay: number }) {
  return (
    <motion.span
      className="inline-block cursor-default"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{
        scale: 1.08,
        color: "hsl(200 76% 60%)",
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.span>
  );
}

function LandingPage() {
  const { isDark, toggle } = useTheme();
  const { t } = useLanguage();

  const stats = [
    { value: "1", label: t("activeProjects"), icon: FolderOpen },
    { value: "5", label: t("students"), icon: Users },
    { value: "3+", label: t("mentors"), icon: Sparkles },
    { value: "1", label: t("tasksCompleted"), icon: ListTodo },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <GeometricBackground />

      <nav className="relative z-20 flex items-center justify-between px-8 py-4 border-b border-primary/20 bg-primary/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Handshake className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold font-display tracking-tight">TeamUp</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
          </button>
          <Link
            to="/login"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-foreground border border-border hover:bg-card transition-colors"
          >
            {t("login")}
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t("getStarted")}
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden px-8 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              {t("landingTagline")}
            </span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold font-display leading-[1.1] tracking-tight text-foreground">
            <AnimatedWord delay={0.2}>{t("heroTitle1")}</AnimatedWord>{" "}
            <AnimatedWord delay={0.35}>{t("heroTitle2")}</AnimatedWord>
            <br />
            <motion.span
              className="inline-block cursor-default text-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              {t("heroTitle3")}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed"
          >
            {t("heroDesc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
            >
              {t("explorePlatform")} <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-base font-bold text-foreground hover:bg-muted transition-colors"
            >
              {t("browseProjects")}
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-8"
        >
          <div className="overflow-hidden rounded-2xl border border-border shadow-xl md:w-2/5 shrink-0">
            <img
              src={heroImage}
              alt="Students collaborating on projects together"
              width={640}
              height={360}
              className="w-full h-auto"
            />
          </div>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
            TeamUp is your hub for collaborative learning in computer science. Connect with fellow students, discover innovative projects, and bring your ideas to life by joining or creating teams. Whether you're looking to build something groundbreaking or find the perfect collaborators for your next assignment, TeamUp makes it easy to find your people, share your work, and grow together as a community of developers and creators.
          </p>
        </motion.div>
      </section>

      <section className="border-t border-b border-border/50 bg-card/50 backdrop-blur-sm px-8 py-16 relative z-10">
        <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="flex flex-col items-center gap-3 rounded-xl bg-background p-6 text-center border border-border/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-3xl font-bold font-display text-primary">{stat.value}</span>
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-8 py-20 relative z-10">
        <div className="mx-auto max-w-7xl text-center space-y-4">
          <h2 className="text-4xl font-bold font-display">{t("everythingTeamNeeds")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("featuresDesc")}
          </p>
        </div>
        <div className="mx-auto max-w-7xl mt-12 grid md:grid-cols-3 gap-6">
          {[
            { title: t("projectHub"), desc: t("projectHubDesc") },
            { title: t("taskManager"), desc: t("taskManagerDesc") },
            { title: t("teamInbox"), desc: t("teamInboxDesc") },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="rounded-xl bg-card p-8 space-y-4 border border-border/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="inline-flex rounded-lg bg-primary p-3">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold font-display">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/50 px-8 py-8 relative z-10">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Handshake className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">TeamUp</span>
          </div>
          <p className="text-sm text-muted-foreground">{t("footerText")}</p>
        </div>
      </footer>
    </div>
  );
}
