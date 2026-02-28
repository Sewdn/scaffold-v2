import { Hero7 } from "@/components/hero7";
import { Navbar1 } from "@/components/navbar1";
import { Shader3 } from "@/components/shader3";
import { Feature1 } from "@/components/feature1";
import { Stats1 } from "@/components/stats1";
import { Cta1 } from "@/components/cta1";
import { Footer1 } from "@/components/footer1";
import { ThemeToggle } from "@/components/theme-toggle";

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar1
        logo={{
          url: "/",
          src: "/logo.svg",
          alt: "Scaffold CLI",
          title: "Scaffold CLI",
        }}
        menu={[
          { title: "Home", url: "#" },
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
        <div className="absolute right-4 top-20 z-50 lg:top-6">
          <ThemeToggle />
        </div>
        <main>
          <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
            <Shader3
              className="opacity-60 dark:opacity-50"
              color="#6366f1"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            <div className="relative z-10">
              <Hero7
            heading="Command-orchestration CLI for TypeScript monorepos"
            description="Scaffold v2 orchestrates underlying commands in the right sequence. Template files are copied and rendered; dependency management is consolidated and centralized. Build projects faster with Turborepo and Bun."
            button={{
              text: "Get Started",
              url: "#cta",
            }}
          />
            </div>
          </section>
          <Feature1
            title="Layered approach: stubs + commands"
            description="Mustache stub files for apps and packages. Extra commands extend the generated code. One source of truth for TypeScript dependencies."
            imageSrc="https://placehold.co/800x500/f5f5f5/171717?text=scaffold+init"
            imageAlt="Scaffold project structure"
            buttonPrimary={{ text: "Read the Docs", href: "#docs" }}
            buttonSecondary={{ text: "View on GitHub", href: "#" }}
          />
          <Stats1 />
          <section id="cta">
            <Cta1 />
          </section>
          <Footer1
            logo={{
              url: "/",
              src: "/logo.svg",
              alt: "Scaffold CLI",
              title: "Scaffold CLI",
            }}
          />
        </main>
      </div>
  );
}

export default App;
