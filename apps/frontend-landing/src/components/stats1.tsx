import { cn } from "@/lib/utils";

interface Stats1Props {
  className?: string;
}

const Stats1 = ({ className }: Stats1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-center text-4xl font-semibold text-primary lg:text-6xl">
          Built for productivity
        </h2>
        <div className="grid gap-10 pt-9 md:grid-cols-3 lg:gap-0 lg:pt-20">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Setup time reduced by
            </p>
            <p className="pt-4 text-7xl font-semibold text-primary lg:pt-10">90%</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              faster
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              App types supported
            </p>
            <p className="pt-4 text-7xl font-semibold text-primary lg:pt-10">8+</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              frontend, backend, CLI, docs
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Monorepo ready with
            </p>
            <p className="pt-4 text-7xl font-semibold text-primary lg:pt-10">1</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              command
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Stats1 };
