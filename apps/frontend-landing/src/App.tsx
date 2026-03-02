"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Hero7 } from "@/components/hero7";
import { Navbar1 } from "@/components/navbar1";
import { Feature1 } from "@/components/feature1";
import { Card } from "@/components/ui/card";
import { PhilosophySection } from "@/components/philosophy-section";
import { TechnologyOverview } from "@/components/technology-overview";
import { Stats1 } from "@/components/stats1";
import { Cta1 } from "@/components/cta1";
import { Footer1 } from "@/components/footer1";
import { ThemeToggle } from "@/components/theme-toggle";

function App() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const heroBg = isLight ? "/bg-1-light.png" : "/bg-1.webp";
  const footerBg = isLight ? "/bg-2-light.png" : "/bg-1.webp";
  const heroOverlay = isLight ? "bg-white/60" : "bg-[rgba(15,23,42,0.8)]";
  const footerOverlay = isLight ? "bg-white/70" : "bg-slate-800/70";
  const footerText = isLight ? "text-slate-800" : "text-white";
  const footerButton = isLight
    ? "bg-indigo-600 text-white hover:bg-indigo-700"
    : "text-black bg-white hover:opacity-90";

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar1
        logo={{
          url: "/",
          src: "/logo.png",
          alt: "Scaffold CLI",
          title: "Scaffold CLI",
        }}
        menu={[
          { title: "Home", url: "#" },
          { title: "Technologies", url: "#technologies" },
          {
            title: "Docs",
            url: "#docs",
            items: [
              {
                title: "Quick Start",
                description: "Get up and running in minutes",
                url: "#docs",
              },
              {
                title: "CLI Commands",
                description: "Full command reference",
                url: "#docs",
              },
            ],
          },
          { title: "GitHub", url: "#" },
        ]}
        auth={{
          login: { title: "Docs", url: "#docs" },
          signup: { title: "Get Started", url: "#cta" },
        }}
      />
      <div className="absolute right-4 top-20 z-50 lg:top-6 lg:right-8">
        <ThemeToggle />
      </div>
      <main className="min-h-screen flex flex-col bg-background overflow-hidden">
        <section
          className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-center bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url('${heroBg}')` }}
        >
          <div className={cn("absolute inset-0", heroOverlay)} />
          <div className="relative z-10 flex flex-col justify-center items-center min-h-full">
            <div className="flex flex-col p-4 justify-center items-center flex-1 w-full max-w-5xl">
              <Card className="m-0 w-[96px] h-[96px] md:w-[128px] md:h-[128px] flex items-center justify-center overflow-hidden border-border bg-card/80">
                <div
                  className="w-full h-full bg-no-repeat bg-center bg-contain scale-150"
                  style={{ backgroundImage: "url('/logo.png')" }}
                />
              </Card>
              <Hero7
                variant={isLight ? "overlayLight" : "overlay"}
                heading="Stop prompting. Start scaffolding."
                description="In the age of agentic coding, the best way to control AI isn't more instructions. It's better examples. This opinionated monorepo scaffolds production-grade architectures that guide coding agents by design — not by endless prompt tweaking."
                showReviews={false}
                button={{
                  text: "Get Started",
                  url: "#cta",
                }}
              />
            </div>
            <a
              href="#start"
              className={cn(
                "text-6xl xl:text-9xl shrink-0 mb-8 animate-bounce",
                isLight ? "text-slate-700" : "text-white",
              )}
              aria-label="Scroll to content"
            >
              ⌄
            </a>
          </div>
        </section>
        <section
          id="start"
          className="min-h-[90vh] flex flex-col justify-center section-elysia-dark px-4 py-16 md:px-6 md:py-24 lg:px-8"
        >
          <Feature1
            title="Architecture is the new prompt."
            description="The product is not scaffolding. The product is architectural gravity for AI. We scaffold deterministic project structures, embedded patterns, dependency injection by default, and Effect-driven composition — so coding agents never guess. They follow the rails."
            imageSrc="https://placehold.co/800x500/64748b/94a3b8?text=scaffold+project+my-app"
            imageAlt="Scaffold project structure"
            buttonPrimary={{ text: "Read the Docs", href: "#docs" }}
            buttonSecondary={{ text: "View on GitHub", href: "#" }}
          />
        </section>
        <section className="min-h-[90vh] flex flex-col justify-center section-elysia-darker px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <PhilosophySection />
        </section>
        <section className="min-h-[90vh] flex flex-col justify-center section-elysia-dark px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <TechnologyOverview />
        </section>
        <section className="min-h-[90vh] flex flex-col justify-center section-elysia-darker px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <Stats1 />
        </section>
        <section
          id="cta"
          className="min-h-[90vh] flex flex-col justify-center section-elysia-dark px-4 py-16 md:px-6 md:py-24 lg:px-8"
        >
          <Cta1 />
        </section>
        <section
          className="relative bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url('${footerBg}')` }}
        >
          <div className={cn("px-4 sm:px-6 text-center", footerOverlay)}>
            <div className="py-24 md:py-36">
              <h2 className={cn("text-2xl mb-4", footerText)}>
                Built with{" "}
                <img src="/heart.gif" alt="love" className="inline-block w-8 h-8 align-middle" />{" "}
                for the AI coding community
              </h2>
              <a
                href="#cta"
                className={cn(
                  "inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium transition duration-500 ease-in-out transform border rounded-lg",
                  footerButton,
                )}
              >
                <span className="justify-center">Get Started</span>
              </a>
            </div>
          </div>
        </section>
        <Footer1
          logo={{
            url: "/",
            src: "/logo.png",
            alt: "Scaffold CLI",
            title: "Scaffold CLI",
          }}
        />
      </main>
    </div>
  );
}

export default App;
