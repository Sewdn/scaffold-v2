import { Layers, Network, Boxes, GitBranch } from "lucide-react";

import { cn } from "@/lib/utils";

const philosophyItems = [
  {
    icon: Layers,
    label: "Clear boundaries",
  },
  {
    icon: Network,
    label: "Explicit dependency flow",
  },
  {
    icon: Boxes,
    label: "Effect-driven state",
  },
  {
    icon: GitBranch,
    label: "Modular service isolation",
  },
];

interface PhilosophySectionProps {
  className?: string;
}

const PhilosophySection = ({ className }: PhilosophySectionProps) => {
  return (
    <section className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="container max-w-6xl mx-auto px-3 md:px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent-highlight">
            Core philosophy
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl [text-wrap:balance]">
            Architecture is the <span className="text-gradient-indigo">new prompt.</span>
          </h2>
          <p className="mt-6 md:mt-10 lg:mt-12 text-base md:text-lg lg:text-xl text-muted-foreground [text-wrap:balance]">
            When your repository encodes clear boundaries, explicit dependency flow, Effect-driven
            state, and modular service isolation — AI doesn&apos;t guess how to write code. It
            follows the rails.
          </p>
          <div className="mt-10 md:mt-12 grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {philosophyItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-xl border border-surface bg-card-surface p-4 md:p-6 transition-colors hover:border-primary/50 hover:bg-muted"
              >
                <Icon className="size-8 text-primary" strokeWidth={1.5} />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { PhilosophySection };
