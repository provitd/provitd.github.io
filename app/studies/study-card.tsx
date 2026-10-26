import React from "react";
import { Card, CardContent } from "@/app/components/card";
import { ExternalLink, Github } from "lucide-react";
import type { Study, Dataset } from "@shared/schema";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import StudyFilterLink from "./study-filter-link";

interface StudyCardProps {
  study: Study;
}

export default function StudyCard({ study }: StudyCardProps) {
  const getImageUrl = (study: Study) => {
    if (study.imageUrl) return study.imageUrl;
    return null;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {study.imageUrl && (
        <div className="w-full h-48 bg-transparent flex items-center justify-center">
          <img
            src={study.imageUrl}
            alt={study.title}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold">
          <Link
            href={`/studies/${encodeURIComponent(study.id)}`}
            className="hover:text-(--accent-foreground) transition-colors"
          >
            {study.title}
          </Link>
        </h3>
        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          {(() => {
            const categories = study.categories as { biologicalApplication?: string[] };
            return Array.isArray(categories.biologicalApplication) &&
              categories.biologicalApplication.map((app: string) => (
                <StudyFilterLink
                  key={app}
                  filter="biologicalApplication"
                  value={app}
                >
                  {app}
                </StudyFilterLink>
              ));
          })()}

            
          {(() => {
            const categories = study.categories as { sequencingPlatform?: { name: string; sub?: string }[] };
            return Array.isArray(categories.sequencingPlatform) &&
              categories.sequencingPlatform.map((platform: { name: string; sub?: string }, idx: number) => (
                <StudyFilterLink
                  key={platform.name + (platform.sub || "") + idx}
                  filter="sequencingPlatform"
                  value={platform.sub ? `${platform.name}/${platform.sub}` : platform.name}
                >
                  {platform.name}
                  {platform.sub ? ` - ${platform.sub}` : ""}
                </StudyFilterLink>
              ));
          })()}

        </div>

        <div className="text-(--foreground) text-m mb-4">
          <ReactMarkdown>{study.description}</ReactMarkdown>
        </div>

        <div className="mb-4">
          <h4 className="text-l font-semibold text-(--forground) mb-2">
            Explore Datasets:
          </h4>
          <div className="space-y-1">
            {Array.isArray(study.datasets) &&
              study.datasets.map((dataset: Dataset, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-m"
                >
                  <a
                    href={dataset.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-(--foreground) hover:text-(--accent-foreground)"
                  >
                    {dataset.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
          </div>
        </div>

        {Array.isArray(study.geoAccessions) && study.geoAccessions.length > 0 && (
          <div className="mb-4 text-m">
            <span className="font-semibold">GEO: </span>
            {study.geoAccessions.map((accession, index) => (
              <React.Fragment key={`${accession}-${index}`}>
                {index > 0 && ", "}
                <a
                  href={`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${encodeURIComponent(accession)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-(--foreground) hover:text-(--accent-foreground)"
                >
                  {accession}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="flex text-sm items-center justify-between pt-4 border-t border-(--forground)">
          <div className="flex items-center space-x-3">
            {Array.isArray(study.authors) ? study.authors[0] : study.authors} | 
            {study.year}
          </div>
          <div className="flex items-center gap-3">
            {study.doi?.trim() && (
              <a
                href={`https://doi.org/${study.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-(--foreground) hover:text-(--accent-foreground)"
              >
                {study.doi}
              </a>
            )}
            {Array.isArray(study.githubRepositories) &&
              study.githubRepositories.map((repository, index) => (
                <a
                  key={`${repository}-${index}`}
                  href={repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub repository ${repository.replace(/^https:\/\/github\.com\//, "")}`}
                  title={repository.replace(/^https:\/\/github\.com\//, "")}
                  className="inline-flex text-(--foreground) transition-opacity hover:opacity-70"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
