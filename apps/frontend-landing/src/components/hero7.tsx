import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Hero7Props {
  heading?: string;
  description?: string;
  variant?: "default" | "overlay" | "overlayLight";
  button?: {
    text: string;
    url: string;
    className?: string;
  };
  showReviews?: boolean;
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
  className?: string;
}

const Hero7 = ({
  heading: _heading = "A Collection of Components Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  variant = "default",
  showReviews = true,
  button = {
    text: "Discover all components",
    url: "https://www.shadcnblocks.com",
  },
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
  className,
}: Hero7Props) => {
  const isOverlay = variant === "overlay" || variant === "overlayLight";
  const isLightOverlay = variant === "overlayLight";
  const headingCls = isOverlay
    ? isLightOverlay
      ? "text-slate-800"
      : "text-white"
    : "text-foreground";
  const descCls = isOverlay
    ? isLightOverlay
      ? "text-slate-600"
      : "text-slate-200"
    : "text-muted-foreground";
  const gradientCls = isOverlay
    ? isLightOverlay
      ? "text-gradient-indigo"
      : "text-gradient-indigo-overlay"
    : "text-gradient-indigo";
  const highlightCls = isOverlay
    ? isLightOverlay
      ? "text-pink-600"
      : "text-pink-400"
    : "text-accent-highlight";

  return (
    <section className={cn("py-16 md:py-24 lg:py-32 px-4", className)}>
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1
            className={cn(
              "text-5xl font-semibold tracking-tighter md:text-6xl lg:text-7xl xl:text-9xl text-balance",
              headingCls,
            )}
          >
            <span className={highlightCls}>Stop</span> prompting.{" "}
            <span className={gradientCls}>Start scaffolding.</span>
          </h1>
          <p
            className={cn(
              "text-base md:text-lg lg:text-xl text-balance max-w-3xl mx-auto",
              descCls,
            )}
          >
            {description}
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="mt-8 md:mt-10 bg-accent-secondary hover:opacity-90 text-primary-foreground"
        >
          <a href={button.url}>{button.text}</a>
        </Button>
        {showReviews && (
          <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <span className="mx-4 inline-flex items-center -space-x-4">
              {reviews.avatars.map((avatar, index) => (
                <Avatar key={index} className="size-14 border">
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                </Avatar>
              ))}
            </span>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="mr-1 font-semibold">{reviews.rating?.toFixed(1)}</span>
              </div>
              <p className="text-left font-medium text-muted-foreground">
                from {reviews.count}+ reviews
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export { Hero7 };
