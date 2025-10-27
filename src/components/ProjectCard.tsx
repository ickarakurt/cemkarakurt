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
    <li className="group relative mt-2">
      <article className="p-5 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-gray-900/50 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Title and Subtitle */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Address/Link */}
        {address && (
          <div className="mb-4">
            <a
              href={address}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              {address.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}

        {/* Content */}
        <div
          className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 prose prose-sm prose-gray dark:prose-invert max-w-none prose-p:my-2 prose-p:leading-relaxed prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-xs prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-ul:my-2 prose-li:my-1 prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech: string) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
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
