import { useState } from "react";

interface Post {
  id: string;
  data: {
    title: string;
    pubDatetime: Date;
    tags: string[];
  };
  body?: string;
}

interface TagSection {
  id: string;
  data: {
    title: string;
  };
  posts: Post[];
}

function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const numberOfWords = content.split(/\s/g).length;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  return `${minutes} min read`;
}

interface ExploreTabsProps {
  sections: TagSection[];
}

export default function ExploreTabs({ sections }: ExploreTabsProps) {
  const [activeTab, setActiveTab] = useState(sections[0]?.id ?? "");

  return (
    <div className="space-y-4">
      <nav className="flex gap-1 p-1 bg-skin-card-muted/30 rounded-xl border border-skin-border/40 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mx-4 mt-3 sm:mx-0">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[10px] sm:text-xs font-mono uppercase tracking-wider border border-transparent transition-all duration-200 ${
              activeTab === section.id
                ? "bg-skin-card text-skin-accent shadow-sm border-skin-border/50"
                : "text-skin-base/50 hover:text-skin-base hover:bg-skin-card-muted/50"
            }`}
          >
            {section.data.title}
          </button>
        ))}
      </nav>

      <div className="relative min-h-[200px]">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`space-y-4 absolute inset-0 transition-opacity duration-200 ${
              activeTab === section.id
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ul className="space-y-1">
              {section.posts.slice(0, 4).map((post, index) => (
                <li
                  key={post.id}
                  className="stagger-in"
                  style={{ animationDelay: `${index * 0.04}s` }}
                >
                  <a
                    href={`/blog/${post.id}/`}
                    className="group flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-lg hover:bg-skin-card-muted/50 transition-all duration-200"
                  >
                    <span className="font-mono text-[10px] text-skin-base/20 shrink-0 tabular-nums w-5 text-right">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-skin-base group-hover:text-skin-accent transition-colors truncate">
                      {post.data.title}
                    </span>
                    <span className="flex items-center gap-2 ml-auto shrink-0 text-[11px] font-mono text-skin-base/30 tabular-nums">
                      <span className="hidden sm:inline">{getReadingTime(post.body ?? "")}</span>
                      <span className="hidden sm:inline w-px h-3 bg-skin-border/30" />
                      <span>
                        {post.data.pubDatetime.toLocaleDateString("en-US", {
                          month: "short",
                          year: "2-digit",
                        })}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
