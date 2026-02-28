import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

import { cn } from "@/lib/utils";

import { Logo, LogoImage, LogoText } from "@/components/shadcnblocks/logo";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Docs", href: "#docs" },
      { name: "Quick Start", href: "#" },
      { name: "CLI Reference", href: "#" },
      { name: "App Types", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "GitHub", href: "#" },
      { name: "E2E Tests", href: "#" },
    ],
  },
];

interface Footer1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  className?: string;
}
const Footer1 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  className,
}: Footer1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Logo url="https://shadcnblocks.com">
              <LogoImage
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                className="h-10"
              />
              <LogoText className="text-xl">{logo.title}</LogoText>
            </Logo>
            <p className="text-lg font-medium text-muted-foreground">
              Command-orchestration for TypeScript monorepos.
            </p>
          </div>
          <Separator className="my-14" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 font-bold">Legal</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#">Term of Services</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
              <h3 className="mt-8 mb-4 font-bold">Social</h3>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#" aria-label="GitHub">
                    <FaGithub className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#" aria-label="Twitter">
                    <FaTwitter className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#" aria-label="Discord">
                    <FaDiscord className="size-6" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-14" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Scaffold CLI. Open source.
          </p>
        </footer>
      </div>
    </section>
  );
};

export { Footer1 };
