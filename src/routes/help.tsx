import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { HelpCircle, MessageCircle, BookOpen } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/help")({
  component: HelpPage,
});

function HelpPage() {
  const { t } = useLanguage();

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold font-display mb-6">{t("helpCenter")}</h1>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: HelpCircle, title: t("faq"), desc: t("commonQuestions") },
            { icon: MessageCircle, title: t("contactSupport"), desc: t("getInTouch") },
            { icon: BookOpen, title: t("documentation"), desc: t("learnMore") },
          ].map((item) => (
            <div key={item.title} className="retro-card rounded-xl bg-card p-5 text-center space-y-2">
              <item.icon className="h-8 w-8 mx-auto text-primary" />
              <h3 className="font-bold font-display">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold font-display">{t("frequentlyAskedQuestions")}</h2>
          {faqs.map((faq) => (
            <div key={faq.q} className="retro-card rounded-xl bg-card p-5">
              <h3 className="font-semibold text-sm">{faq.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
