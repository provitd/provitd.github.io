import { cn } from "@/app/lib/utils";

interface StudyFilterLinkProps {
  filter: "biologicalApplication" | "sequencingPlatform";
  value: string;
  children: React.ReactNode;
  className?: string;
}

export default function StudyFilterLink({
  filter,
  value,
  children,
  className,
}: StudyFilterLinkProps) {
  const query = new URLSearchParams({ [filter]: value });

  return (
    <a
      href={`/studies?${query.toString()}`}
      className={cn(
        "inline-flex items-center rounded-full border border-transparent bg-(--accent-background2) px-2.5 py-0.5 text-xs font-semibold text-(--foreground) transition-colors hover:bg-(--accent-background)",
        className
      )}
    >
      {children}
    </a>
  );
}
