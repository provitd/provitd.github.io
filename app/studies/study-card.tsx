import React from "react";
import { Card, CardContent } from "@/app/components/card";
import { Badge } from "@/app/components/badge";
import { ExternalLink } from "lucide-react";
import type { Study, Dataset } from "@shared/schema";
import ReactMarkdown from "react-markdown";

interface StudyCardProps {
  study: Study;
}

export default function StudyCard({ study }: StudyCardProps) {
  const getImageUrl = (study: Study) => {
    if (study.imageUrl) return study.imageUrl;
    return null;
  };

  const getBiologicalApplicationColor = (app: string) => {
    const colors: { [key: string]: string } = {
      /* Modify to color code the categories
      "Cancer Genomics": "bg-(--foreground) text-(--background)",
      "Developmental Biology": "bg-(--foreground) text-(--background)",
      Immunology: "bg-(--foreground) text-(--background)",
      Neuroscience: "bg-(--foreground) text-(--background)",
      */
    };
    return colors[app] || "bg-(--accent-background2) text-(--foreground)";
  };

  const getPlatformNameColor = (platform: string) => {
    /* Modify to color code the categories
    if (platform.includes("scRNA-seq")) return "bg-blue-100 text-blue-800";
    if (platform.includes("Bulk RNA-seq")) return "bg-orange-100 text-orange-800";
    if (platform.includes("ATAC-seq")) return "bg-green-100 text-green-800";
    if (platform.includes("ChIP-seq")) return "bg-yellow-100 text-yellow-800";
    */
    return "bg-(--accent-background2) text-(--foreground)";
  };

  const getPlatformSubColor = (platform: string) => {
    /* Modify to color code the categories
    if (platform.includes("scRNA-seq")) return "bg-blue-100 text-blue-800";
    if (platform.includes("Bulk RNA-seq")) return "bg-orange-100 text-orange-800";
    if (platform.includes("ATAC-seq")) return "bg-green-100 text-green-800";
    if (platform.includes("ChIP-seq")) return "bg-yellow-100 text-yellow-800";
    */
    return "bg-(--accent-background2) text-(--foreground)";
  };

  const handleAuthorClick = (authorName: string) => {
    // Navigate to members page - could be enhanced to scroll to specific member
    window.location.href = "/members";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {study.imageUrl && (
        <img
          src={study.imageUrl}
          alt={study.title}
          className="w-full h-48 object-cover"
        />
      )}
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold">
          <a
            href={`https://doi.org/${study.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-(--accent-foreground) transition-colors"
          >
            {study.title}
          </a>
        </h3>
        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          {(() => {
            const categories = study.categories as { biologicalApplication?: string[] };
            return Array.isArray(categories.biologicalApplication) &&
              categories.biologicalApplication.map((app: string) => (
                <Badge key={app} className={getBiologicalApplicationColor(app)}>
                  {app}
                </Badge>
              ));
          })()}

            
          {(() => {
            const categories = study.categories as { sequencingPlatform?: { name: string; sub?: string }[] };
            return Array.isArray(categories.sequencingPlatform) &&
              categories.sequencingPlatform.map((platform: { name: string; sub?: string }, idx: number) => (
                <React.Fragment key={platform.name + (platform.sub || "") + idx}>
                  <Badge className={getPlatformNameColor(platform.name)}>
                    {platform.name}
                    {platform.sub ? ` - ${platform.sub}` : ""}
                  </Badge>
                </React.Fragment>
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
                    className="text-(--foreground) hover:text-(--accent-foreground) flex items-center"
                  >
                    {dataset.name}
                    <ExternalLink className="h-5 w-5 ml-2" />
                  </a>
                </div>
              ))}
          </div>
        </div>

        <div className="flex text-sm items-center justify-between pt-4 border-t border-(--forground)">
          <div className="flex items-center space-x-3">
            {Array.isArray(study.authors) ? study.authors[0] : study.authors} | 
            {study.year}
          </div>
          <div className="flex items-center space-x-2">
            <a
              href={`https://doi.org/${study.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-(--foreground) hover:text-(--accent-foreground)"
            >
              {study.doi}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
