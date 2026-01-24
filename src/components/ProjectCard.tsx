import type { CollectionEntry } from "astro:content";
import { marked } from "marked";

export interface Props {
  frontmatter: CollectionEntry<"projects">["data"];
  rawContent: string;
}

export default function ProjectCard({ frontmatter, rawContent }: Props) {
  const { title, subtitle, address, technologies } = frontmatter;

  // Parse markdown content to HTML
  const htmlContent = marked.parse(rawContent) as string;

  return (
    <li className="group relative">
      <article className="h-full flex flex-col p-6 rounded-2xl bg-skin-card border border-skin-border hover:border-skin-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-skin-accent/5">
        {/* Title and Subtitle */}
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold tracking-tight text-skin-base mb-2 group-hover:text-skin-accent transition-colors">
            {title}
          </h2>
          {subtitle && (
            <p className="text-skin-base/60 text-sm font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Address/Link */}
        {address && (
          <div className="mb-6">
            <a
              href={address}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-skin-accent hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-4 h-4 stroke-[2.5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>
                {address.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
            </a>
          </div>
        )}

        {/* Content */}
        <div
          className="text-skin-base/80 text-sm leading-relaxed mb-8 prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-skin-border/50">
            {technologies.map((tech: string) => (
              <span
                key={tech}
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-skin-card-muted text-skin-base/70 border border-skin-border/50"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </article>
    </li>
  );
}
