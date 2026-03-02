import { cn } from "@/lib/utils";

interface Stats1Props {
  className?: string;
}

const Stats1 = ({ className }: Stats1Props) => {
  return (
    <section className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="container max-w-6xl mx-auto px-3 md:px-4">
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl lg:text-5xl xl:text-6xl [text-wrap:balance] mb-12 md:mb-16 lg:mb-20">
          Built for <span className="text-gradient-pink">agentic coding</span>
        </h2>
        <div className="grid gap-8 md:gap-10 pt-6 md:pt-10 lg:pt-20 grid-cols-1 md:grid-cols-3">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">Deterministic output</p>
            <p className="pt-4 text-5xl md:text-6xl lg:text-7xl font-semibold text-gradient-indigo lg:pt-10">
              100%
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-muted-foreground pt-2">
              deterministic, less prompting
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">App types supported</p>
            <p className="pt-4 text-5xl md:text-6xl lg:text-7xl font-semibold text-accent-secondary lg:pt-10">
              8+
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-muted-foreground pt-2">
              SPAs, APIs, CLIs, MCP, docs
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">Monorepo ready with</p>
            <p className="pt-4 text-5xl md:text-6xl lg:text-7xl font-semibold text-accent-highlight lg:pt-10">
              1
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-muted-foreground pt-2">
              command
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Stats1 };
