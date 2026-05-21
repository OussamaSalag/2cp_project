import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-primary/[0.12]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-primary/[0.15]",
            "shadow-[0_8px_32px_0_hsl(200_76%_60%_/_0.08)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function GeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-primary/[0.05]" />
      <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-primary/[0.12]" className="top-[-10%] left-[-5%]" />
      <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-primary/[0.10]" className="top-[10%] right-[-8%]" />
      <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-primary/[0.14]" className="bottom-[5%] left-[5%]" />
      <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-primary/[0.08]" className="top-[60%] right-[15%]" />
      <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-primary/[0.08]" className="top-[35%] left-[20%]" />
    </div>
  );
}

function SidebarGeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-primary/[0.04]" />
      <ElegantShape delay={0.5} width={280} height={70} rotate={15} gradient="from-primary/[0.08]" className="top-[5%] left-[-20%]" />
      <ElegantShape delay={0.8} width={200} height={50} rotate={-12} gradient="from-primary/[0.06]" className="top-[40%] right-[-30%]" />
      <ElegantShape delay={1.0} width={160} height={40} rotate={20} gradient="from-primary/[0.06]" className="bottom-[15%] left-[-10%]" />
    </div>
  );
}

export { ElegantShape, GeometricBackground, SidebarGeometricBackground };
