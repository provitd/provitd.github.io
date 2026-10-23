import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Study } from "@shared/schema";
import StudyCard from "../study-card";
import StudyFilterLink from "../study-filter-link";

const studiesDirectory = path.join(process.cwd(), "public", "data", "studies");

async function loadStudies(): Promise<Study[]> {
  const manifest = await readFile(path.join(studiesDirectory, "index.json"), "utf8");
  const fileNames: string[] = JSON.parse(manifest);

  return Promise.all(
    fileNames.map(async (fileName) => {
      const content = await readFile(path.join(studiesDirectory, fileName), "utf8");
      return JSON.parse(content) as Study;
    })
  );
}

export async function generateStaticParams() {
  const studies = await loadStudies();
  return studies.map((study) => ({ id: study.id }));
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studies = await loadStudies();
  const study = studies.find((item) => item.id === id);

  if (!study) notFound();

  const studyIndex = studies.findIndex((item) => item.id === id);
  const previousStudy = studies[studyIndex - 1];
  const nextStudy = studies[studyIndex + 1];
  const otherStudies = studies
    .filter((item) => item.id !== id)
    .slice(0, 2);

  return (
    <section className="py-10 sm:py-14 bg-(--background)">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-(--foreground) hover:text-(--accent-foreground)"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All studies & datasets
          </Link>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-(--foreground)">
                Study details
              </p>
              <p className="mt-1 text-sm text-(--foreground)">
                Study {studyIndex + 1} of {studies.length}
              </p>
              <Link
                href="/studies"
                className="mt-2 inline-block text-sm font-semibold text-(--foreground) underline underline-offset-4 hover:text-(--accent-foreground)"
              >
                View all studies
              </Link>
            </div>
            <nav aria-label="Study navigation" className="flex items-center gap-3">
              {previousStudy ? (
                <Link
                  href={`/studies/${encodeURIComponent(previousStudy.id)}`}
                  rel="prev"
                  className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium text-(--foreground) transition-colors hover:bg-(--accent-background2)"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Previous</span>
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-2 text-sm text-(--foreground)/40"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Previous</span>
                </span>
              )}
              {nextStudy ? (
                <Link
                  href={`/studies/${encodeURIComponent(nextStudy.id)}`}
                  rel="next"
                  className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium text-(--foreground) transition-colors hover:bg-(--accent-background2)"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-2 text-sm text-(--foreground)/40"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              )}
            </nav>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start">
          <div className="mx-auto w-full max-w-3xl">
            <StudyCard study={study} />
          </div>

          <section
            className="lg:sticky lg:top-24"
            aria-labelledby="more-studies-heading"
          >
            <div className="mb-5">
              <h2 id="more-studies-heading" className="text-xl font-bold text-(--foreground)">
                Explore more studies
              </h2>
              <p className="mt-1 text-sm text-(--foreground)/70">
                There’s more research and data to discover.
              </p>
            </div>

            {otherStudies.length > 0 ? (
              <div className="grid gap-4">
              {otherStudies.map((otherStudy) => (
                <article
                  key={otherStudy.id}
                  className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-(--accent-background) hover:shadow-md"
                >
                  <div>
                    <Link
                      href={`/studies/${encodeURIComponent(otherStudy.id)}`}
                      className="font-semibold leading-snug text-(--foreground) hover:text-(--accent-foreground)"
                    >
                      {otherStudy.title}
                    </Link>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(() => {
                        const categories = otherStudy.categories as {
                          biologicalApplication?: string[];
                          sequencingPlatform?: { name: string; sub?: string }[];
                        };

                        return (
                          <>
                            {categories.biologicalApplication?.map((app) => (
                              <StudyFilterLink
                                key={app}
                                filter="biologicalApplication"
                                value={app}
                              >
                                {app}
                              </StudyFilterLink>
                            ))}
                            {categories.sequencingPlatform?.map((platform, index) => (
                              <StudyFilterLink
                                key={`${platform.name}-${platform.sub || ""}-${index}`}
                                filter="sequencingPlatform"
                                value={platform.sub ? `${platform.name}/${platform.sub}` : platform.name}
                              >
                                {platform.name}
                                {platform.sub ? ` - ${platform.sub}` : ""}
                              </StudyFilterLink>
                            ))}
                          </>
                        );
                      })()}
                    </div>
                    {otherStudy.doi && (
                      <p className="mt-3 break-all text-sm text-(--foreground)/80">
                        DOI:{" "}
                        <a
                          href={`https://doi.org/${otherStudy.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-(--accent-foreground)"
                        >
                          {otherStudy.doi}
                        </a>
                      </p>
                    )}
                  </div>
                  <div className="mt-4 border-t border-gray-200 pt-3 text-sm text-(--foreground)/70">
                    <span>
                      {Array.isArray(otherStudy.authors)
                        ? otherStudy.authors.join(", ")
                        : String(otherStudy.authors ?? "")}
                    </span>
                    <span className="float-right">{otherStudy.year}</span>
                  </div>
                </article>
              ))}
              </div>
            ) : (
              <p className="rounded-lg border border-gray-200 bg-white p-5 text-(--foreground)/70">
                Browse the studies page to see the latest research and datasets.
              </p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
