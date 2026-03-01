import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature1Props {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  buttonPrimary: {
    text: string;
    href: string;
  };
  buttonSecondary: {
    text: string;
    href: string;
  };
  className?: string;
}

const Feature1 = ({
  title = "Blocks built with Shadcn & Tailwind",
  description = "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  imageAlt = "placeholder hero",
  buttonPrimary = {
    text: "Get Started",
    href: "https://shadcnblocks.com",
  },
  buttonSecondary = {
    text: "Learn More",
    href: "https://shadcnblocks.com",
  },
  className,
}: Feature1Props) => {
  return (
    <section className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="container max-w-6xl mx-auto px-3 md:px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="my-4 md:my-6 mt-0 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl [text-wrap:balance]">
              <span className="text-gradient-indigo">{title}</span>
            </h2>
            {description && (
              <p className="mb-6 md:mb-8 max-w-xl text-muted-foreground text-base md:text-lg lg:text-xl text-balance">
                {description}
              </p>
            )}
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild className="bg-accent-secondary hover:opacity-90 text-primary-foreground border-0">
                <a href={buttonPrimary.href} target="_blank" rel="noreferrer">
                  {buttonPrimary.text}
                </a>
              </Button>
              <Button variant="outline" asChild className="border-border text-muted-foreground hover:bg-muted">
                <a href={buttonSecondary.href} target="_blank" rel="noreferrer">
                  {buttonSecondary.text}
                </a>
              </Button>
            </div>
          </div>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-64 md:max-h-80 lg:max-h-96 w-full rounded-xl object-cover border border-border"
          />
        </div>
      </div>
    </section>
  );
};

export { Feature1 };
