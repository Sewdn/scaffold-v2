import { cn } from "@/lib/utils";

interface CardAnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

const CardAnimatedBorder = ({
  children,
  className,
  innerClassName,
}: CardAnimatedBorderProps) => {
  return (
    <div
      className={cn(
        "relative m-4 overflow-hidden rounded-xl border border-slate-800 p-[1px] backdrop-blur-3xl",
        className
      )}
    >
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        aria-hidden
      />
      <div
        className={cn(
          "relative z-10 inline-flex h-full w-full justify-center rounded-[calc(0.75rem-1px)] bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { CardAnimatedBorder };
