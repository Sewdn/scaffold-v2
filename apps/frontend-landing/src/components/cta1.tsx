import { ArrowRight, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Cta1Props {
  className?: string;
}

const Cta1 = ({ className }: Cta1Props) => {
  return (
    <section className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="container max-w-6xl mx-auto px-3 md:px-4">
        <Card className="flex flex-col justify-between border-border bg-card/50 pb-0 md:flex-row md:py-6 overflow-hidden">
          <div className="p-4 md:p-6 md:max-w-96 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/20 text-primary shrink-0">
                <Sparkles className="size-4" strokeWidth={1.5} />
              </span>
              <h4 className="text-xl md:text-2xl font-bold text-foreground [text-wrap:balance]">
                Shape the environment it{" "}
                <span className="text-gradient-indigo">learns from</span>
              </h4>
            </div>
            <p className="text-muted-foreground text-sm md:text-base [text-wrap:balance]">
              You don&apos;t fight your AI. Scaffold an opinionated monorepo with
              deterministic patterns, Effect-driven composition, and a batteries-included
              setup — so coding agents follow the rails by design.
            </p>
            <Button className="mt-8 bg-accent-secondary hover:opacity-90 text-primary-foreground border-0" asChild>
              <a href="#">
                Get Started <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>
          <img
            src="https://placehold.co/400x300/64748b/94a3b8?text=scaffold+project+my-app"
            alt="Scaffold CLI output"
            className="aspect-video object-cover w-full md:max-w-96 md:min-w-80 rounded-b-lg md:rounded-l-none md:rounded-r-lg shrink-0"
          />
        </Card>
      </div>
    </section>
  );
};

export { Cta1 };
