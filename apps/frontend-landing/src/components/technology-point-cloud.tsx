"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

import type { Technology } from "@/data/technologies";
import { TECHNOLOGIES } from "@/data/technologies";

/** Golden angle in radians - creates organic spiral distribution */
const GOLDEN_ANGLE = 2.39996323;

/**
 * Distribute n points in a spiral pattern for point-cloud layout.
 * Returns array of { x, y } in 0–100 (percentage of container).
 */
function distributeInCloud(n: number): { x: number; y: number }[] {
  const centerX = 50;
  const centerY = 50;
  const maxRadius = 42;

  return Array.from({ length: n }, (_, i) => {
    const r = maxRadius * Math.sqrt((i + 1) / n);
    const theta = i * GOLDEN_ANGLE;
    const x = centerX + r * Math.cos(theta);
    const y = centerY + r * Math.sin(theta);
    return { x, y };
  });
}

interface TechNodeProps {
  tech: Technology;
  position: { x: number; y: number };
  index: number;
}

const TechNode = ({ tech, position, index }: TechNodeProps) => {
  const animationDelay = `${index * 0.08}s`;
  const animationDuration = `${2.5 + (index % 5) * 0.3}s`;

  return (
    <div
      className="tech-node absolute flex flex-col items-center justify-center gap-1 rounded-lg md:rounded-xl border border-surface bg-card-surface p-2 md:p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:shadow-md"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        animationDelay,
        animationDuration,
      }}
      title={tech.name}
    >
      <div className="flex size-10 md:size-12 items-center justify-center overflow-hidden rounded-lg bg-muted">
        {tech.logo ? (
          <img
            src={tech.logo}
            alt={tech.name}
            className="size-6 md:size-8 object-contain"
          />
        ) : (
          <span className="text-base md:text-lg font-semibold text-muted-foreground">
            {tech.name.charAt(0)}
          </span>
        )}
      </div>
      <span className="text-[10px] md:text-xs font-medium text-muted-foreground">
        {tech.name}
      </span>
    </div>
  );
};

interface TechnologyPointCloudProps {
  technologies?: Technology[];
  className?: string;
}

const TechnologyPointCloud = ({
  technologies = TECHNOLOGIES,
  className,
}: TechnologyPointCloudProps) => {
  const positions = useMemo(
    () => distributeInCloud(technologies.length),
    [technologies.length]
  );

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[4/3] w-full max-w-4xl min-h-[280px] md:min-h-[320px]",
        "rounded-xl md:rounded-2xl border border-surface bg-card/30 p-3 md:p-4",
        className
      )}
    >
      {technologies.map((tech, index) => (
        <TechNode
          key={tech.id}
          tech={tech}
          position={positions[index]}
          index={index}
        />
      ))}
    </div>
  );
};

export { TechnologyPointCloud };
