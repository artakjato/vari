import { Button } from "@/components/ui/Button";
import { ArrowRight, Search, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMapStore } from "../stores/mapStore";
import { Github, Linkedin, Mail } from "lucide-react";

const popularTags = ["Frontend", "Data", "Cloud", "AI", "Security", "DevOps"];

export function HomePage() {
  const industries = useMapStore((state) => state.industries);
  const roles = useMapStore((state) => state.roles);
  const loadMapData = useMapStore((state) => state.loadMapData);
  const resetMap = useMapStore((state) => state.resetMap);
  const currentUser = useMapStore((state) => state.currentUser);
  const logout = useMapStore((state) => state.logout);

  useEffect(() => {
    if (industries.length > 0 && roles.length > 0) return;
    const fetchData = () => {
      void loadMapData();
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(fetchData, {
        timeout: 1800,
      });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = setTimeout(fetchData, 900);
    return () => clearTimeout(timeoutId);
  }, [industries.length, loadMapData, roles.length]);

  return (
    <div className="min-h-screen bg-transparent pb-12 sm:pb-16 md:pb-20">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between gap-2.5 px-4 sm:h-16 sm:gap-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#discover"
              className="hidden text-[13px] font-semibold text-foreground/90 transition-colors duration-150 hover:text-foreground md:inline-block lg:text-sm"
            >
              Discover
            </a>
            <Link
              to="/"
              onClick={resetMap}
              className="inline-flex items-center gap-1.5 text-[0.95rem] font-bold tracking-tight text-foreground sm:gap-2 sm:text-lg md:text-[1.12rem]"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground sm:h-8 sm:w-8 sm:text-sm">
                V
              </span>
              Vari
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {currentUser ? (
              <>
                <span className="hidden text-xs font-medium text-[#5f5144] sm:inline">
                  Hi, {currentUser.displayName}
                </span>

                <Link to="/pins">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full border-border/80 bg-white/75 px-3 text-[11px] sm:h-9 sm:px-3.5 sm:text-sm"
                  >
                    My Pins
                  </Button>
                </Link>

                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 rounded-full px-3 text-[11px] sm:h-9 sm:px-4 sm:text-sm"
                  onClick={logout}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full border-border/80 bg-white/75 px-3 text-[11px] sm:h-9 sm:px-3.5 sm:text-sm"
                  >
                    Log In
                  </Button>
                </Link>

                <Link to="/map" onClick={resetMap}>
                  <Button
                    size="sm"
                    className="h-8 rounded-full px-3 text-[11px] sm:h-9 sm:px-4 sm:text-sm"
                  >
                    Start Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 pt-5 sm:gap-10 sm:px-6 sm:pt-7 md:gap-14 md:px-8 md:pt-10 lg:px-10">
        <section
          id="discover"
          className="hero-sunburst warm-grid relative overflow-hidden rounded-xl border border-white/45 px-4 py-6 text-[#1a2740] shadow-[0_24px_56px_rgba(255,103,45,0.24)] sm:rounded-2xl sm:px-6 sm:py-8 md:rounded-[34px] md:px-9 md:py-11 lg:px-10 lg:py-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(8,17,34,0.08),transparent_35%,rgba(255,255,255,0.14))]" />
          <div className="pointer-events-none absolute -left-10 top-10 h-44 w-44 rounded-full bg-white/24 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 -top-10 h-52 w-52 rounded-full bg-[#ffa6d2]/50 blur-3xl" />
          <div
            aria-hidden="true"
            className="home-float-orb pointer-events-none absolute right-[20%] top-6 hidden h-24 w-24 rounded-full border border-white/40 bg-white/10 md:block"
          />

          <div className="relative grid gap-5 sm:gap-6 md:grid-cols-[1.25fr_0.75fr] md:items-end md:gap-10">
            <div className="space-y-3.5 sm:space-y-5 md:space-y-6">
              <h1
                style={{ animationDelay: "60ms" }}
                className="home-reveal max-w-3xl text-[clamp(1.9rem,8.1vw,4.35rem)] leading-[1.04] text-[#1a2740] md:leading-[1.02]"
              >
                Plan your next career move with a brighter map of real
                opportunities.
              </h1>

              <p
                style={{ animationDelay: "120ms" }}
                className="home-reveal max-w-2xl text-[0.95rem] text-[#2f3b52] sm:text-base md:text-lg"
              >
                Vari blends role roadmaps, salary signals, and curated courses
                in one high-clarity workspace so you can compare paths and take
                action fast.
              </p>

              <div
                style={{ animationDelay: "160ms" }}
                className="home-reveal space-y-2.5 sm:space-y-3"
              >
                <div className="flex flex-col gap-2.5 rounded-2xl border border-white/50 bg-white/92 p-1.5 shadow-[0_16px_32px_rgba(255,90,32,0.16)] sm:p-2 md:flex-row md:items-center">
                  <button className="rounded-xl border border-[#f1ddca] bg-[#fff6ec] px-3 py-1.5 text-left text-[13px] font-semibold text-[#66360f] sm:px-4 sm:py-2 sm:text-sm md:min-w-40">
                    All categories
                  </button>
                  <Link
                    to="/map"
                    onClick={resetMap}
                    className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-[#f1ddca] px-3 text-[13px] font-medium text-[#344660] transition-colors duration-150 hover:border-[#ffc79a] sm:h-11 sm:px-4 sm:text-sm"
                  >
                    <Search size={15} />
                    Search role, industry, or learning path
                  </Link>
                  <Link to="/map" onClick={resetMap}>
                    <Button className="h-10 rounded-xl px-4 text-[13px] sm:h-11 sm:px-6 sm:text-sm">
                      Explore
                      <ArrowRight size={15} />
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.11em] text-[#5f4a3a] sm:text-xs sm:tracking-[0.13em]">
                    Popular:
                  </span>
                  {popularTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#f4d8bf] bg-[#fff7edcc] px-2 py-0.5 text-[10px] font-semibold text-[#6d4a2f] sm:px-3 sm:py-1 sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{ animationDelay: "200ms" }}
              className="home-reveal rounded-2xl border border-white/50 bg-white/92 p-4 text-[#1a2740] shadow-[0_18px_36px_rgba(255,111,78,0.2)] sm:p-5 md:rounded-3xl md:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b4523]">
                Live catalog
              </p>
              <p className="mt-2 text-2xl font-bold sm:text-3xl">
                {roles.length}
              </p>
              <p className="text-xs text-[#5f5a54] sm:text-sm">
                active role blueprints
              </p>
              <div className="mt-4 h-px bg-[#f2ddc9]" />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xl font-bold sm:text-2xl">
                    {industries.length}
                  </p>
                  <p className="text-xs text-[#5f5a54] sm:text-sm">
                    industry clusters
                  </p>
                </div>
                <div className="rounded-xl border border-[#e3c39b] bg-[#fff0dd] px-2.5 py-1.5 text-right sm:rounded-2xl sm:px-3 sm:py-2">
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-[#2f5c1f]">
                    <TrendingUp size={12} />
                    Updated weekly
                  </p>
                  <p className="text-[10px] text-[#5f5144] sm:text-xs">
                    jobs + course signals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mt-10 sm:mt-12 md:mt-14 rounded-2xl border border-white/45 bg-white/80 backdrop-blur shadow-[0_18px_44px_rgba(255,111,78,0.16)]">
          <div className="flex flex-col gap-4 px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:items-center md:justify-between">
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b4523]">
                Contact
              </p>
              <p className="mt-1 text-sm text-[#2f3b52] sm:text-base">
                Have feedback or want to collaborate? Reach out.
              </p>
            </div>

            <nav
              aria-label="Contact links"
              className="flex flex-wrap items-center gap-2 sm:gap-3"
            >
              <a
                href="mailto:kjato.arta@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-[#f1ddca] bg-[#fff6ec] px-3 py-2 text-[13px] font-semibold text-[#66360f] transition-colors hover:border-[#ffc79a] hover:bg-[#fff1e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]/50"
              >
                <Mail className="h-4 w-4 text-[#FF6B00]" aria-hidden="true" />
                <span>Email</span>
                <span className="sr-only">kjato.arta@gmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/arta-kjato"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#f1ddca] bg-[#fff6ec] px-3 py-2 text-[13px] font-semibold text-[#66360f] transition-colors hover:border-[#ffc79a] hover:bg-[#fff1e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]/50"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <Linkedin
                  className="h-4 w-4 text-[#FF6B00]"
                  aria-hidden="true"
                />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/artakjato"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#f1ddca] bg-[#fff6ec] px-3 py-2 text-[13px] font-semibold text-[#66360f] transition-colors hover:border-[#ffc79a] hover:bg-[#fff1e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]/50"
                aria-label="GitHub profile (opens in a new tab)"
              >
                <Github className="h-4 w-4 text-[#FF6B00]" aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </nav>
          </div>

          <div className="px-4 pb-5 sm:px-6 sm:pb-6">
            <div className="rounded-2xl border border-[#f1ddca] bg-[#fff6ec] px-4 py-4 shadow-[0_10px_24px_rgba(255,111,78,0.08)] sm:px-5 sm:py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b4523]">
                Name origin
              </p>
              <p className="mt-2 text-sm text-[#2f3b52] sm:text-base">
                Vari is a name with two meanings. It is a tribute to the
                JavaScript keywords var, let, and const, which were central
                concepts during the web development bootcamp where the project
                began.
              </p>
              <p className="mt-2 text-sm text-[#2f3b52] sm:text-base">
                At the same time, vari relates to the Greek idea of change or
                variation, reflecting the many people exploring new paths or
                pivoting their careers into tech.
              </p>
            </div>
          </div>

          <div className="h-px bg-[#f2ddc9]" />

          <div className="px-4 py-4 sm:px-6">
            <p className="text-xs text-[#5f5144]">
              (c) {new Date().getFullYear()} Vari by Arta. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
