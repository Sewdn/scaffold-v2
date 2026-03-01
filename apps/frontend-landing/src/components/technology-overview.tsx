import { cn } from "@/lib/utils";

import { TechnologyPointCloud } from "@/components/technology-point-cloud";

interface TechnologyOverviewProps {
  className?: string;
}

const TechnologyOverview = ({ className }: TechnologyOverviewProps) => {
  return (
    <section id="technologies" className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="container max-w-6xl mx-auto px-3 md:px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent-highlight">
            Technology stack
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl [text-wrap:balance]">
            <span className="text-gradient-indigo">Batteries included</span>
          </h2>
          <p className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl text-muted-foreground [text-wrap:balance]">
            The scaffolding tool orchestrates and integrates a curated set of
            technologies — from core runtimes to UI libraries, backend frameworks
            to protocols. Add your logos to see them come alive.
          </p>
        </div>
        <div className="mt-10 md:mt-12 lg:mt-16">
          <TechnologyPointCloud />
        </div>
      </div>
    </section>
  );
};

export { TechnologyOverview };
