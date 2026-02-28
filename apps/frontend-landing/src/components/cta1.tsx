import { ArrowRight, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Cta1Props {
  className?: string;
}

const Cta1 = ({ className }: Cta1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Card className="flex flex-col justify-between border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 pb-0 md:flex-row md:py-6 dark:from-primary/10 dark:to-primary/5">
          <div className="p-6 md:max-w-96">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Sparkles className="size-4" strokeWidth={1.5} />
              </span>
              <h4 className="text-2xl font-bold">Start scaffolding today</h4>
            </div>
            <p className="text-muted-foreground">
              Create TypeScript monorepos with one command. Turborepo, Bun, and a
              consolidated dependency setup—out of the box.
            </p>
            <Button className="mt-8" asChild>
              <a href="#">
                Get Started <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="aspect-video object-cover md:max-w-96"
          />
        </Card>
      </div>
    </section>
  );
};

export { Cta1 };
