import type { GiscusProps } from "@giscus/react";
import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://cemkarakurt.com",
  author: "Cem Karakurt",
  profile: "https://cemkarakurt.com",
  desc: "Website of a senior software engineer, featuring insightful blog posts on web development, coding trends, and technical insights",
  title: "Cem Karakurt",
  titlePostfix: "| Software Engineer",
  ogImage: "social_img.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 6,
  notePerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/ickarakurt",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ickarakurt",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ickarakurt/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:ickarakurt@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://x.com/ickarakurt",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "Twitch",
    href: "https://twitch.tv/arananyazilimci",
    linkTitle: `${SITE.title} on Twitch`,
    active: true,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ickarakurt",
    linkTitle: `${SITE.title} on YouTube`,
    active: true,
  },
];

export const GISCUS: GiscusProps = {
  repo: "ickarakurt/cemkarakurt",
  repoId: "R_kgDOK0XMfw",
  category: "Announcements",
  categoryId: "DIC_kwDOK0XMf84CjiCs",
  mapping: "pathname",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  lang: "en",
  loading: "lazy",
};
