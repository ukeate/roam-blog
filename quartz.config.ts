import { QuartzConfig } from "./quartz/cfg"
import site from "./site.config.json"
import { RemoveDrafts } from "./quartz/plugins/filters/draft"
import { AliasRedirects } from "./quartz/plugins/emitters/aliases"
import { Assets } from "./quartz/plugins/emitters/assets"
import { ComponentResources } from "./quartz/plugins/emitters/componentResources"
import { ContentIndex } from "./quartz/plugins/emitters/contentIndex"
import { ContentPage } from "./quartz/plugins/emitters/contentPage"
import { Favicon } from "./quartz/plugins/emitters/favicon"
import { FolderPage } from "./quartz/plugins/emitters/folderPage"
import { NotFoundPage } from "./quartz/plugins/emitters/404"
import { Static } from "./quartz/plugins/emitters/static"
import { TagPage } from "./quartz/plugins/emitters/tagPage"
import { CrawlLinks } from "./quartz/plugins/transformers/links"
import { CreatedModifiedDate } from "./quartz/plugins/transformers/lastmod"
import { Latex } from "./quartz/plugins/transformers/latex"
import { Description } from "./quartz/plugins/transformers/description"
import { FrontMatter } from "./quartz/plugins/transformers/frontmatter"
import { GitHubFlavoredMarkdown } from "./quartz/plugins/transformers/gfm"
import { ObsidianFlavoredMarkdown } from "./quartz/plugins/transformers/ofm"
import { RoamFlavoredMarkdown } from "./quartz/plugins/transformers/roam"
import { SyntaxHighlighting } from "./quartz/plugins/transformers/syntax"
import { TableOfContents } from "./quartz/plugins/transformers/toc"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: site.siteTitle,
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    baseUrl: "ukeate.me",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "IBM Plex Sans",
        body: "IBM Plex Sans",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fbfbfa",
          lightgray: "#ebe8e3",
          gray: "#bab3aa",
          darkgray: "#625c55",
          dark: "#2d2926",
          secondary: "#2f6fdd",
          tertiary: "#6b96d9",
          highlight: "rgba(47, 111, 221, 0.12)",
          textHighlight: "#fff2a8aa",
        },
        darkMode: {
          light: "#171614",
          lightgray: "#34312d",
          gray: "#6f6a63",
          darkgray: "#d9d4cd",
          dark: "#f4f1eb",
          secondary: "#8cb5ff",
          tertiary: "#7fb0ff",
          highlight: "rgba(140, 181, 255, 0.16)",
          textHighlight: "#a88f0d88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      FrontMatter(),
      CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Latex(),
      SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      RoamFlavoredMarkdown(),
      ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      GitHubFlavoredMarkdown(),
      TableOfContents(),
      CrawlLinks({ markdownLinkResolution: "shortest" }),
      Description(),
    ],
    filters: [RemoveDrafts()],
    emitters: [
      AliasRedirects(),
      ComponentResources(),
      ContentPage(),
      FolderPage(),
      TagPage(),
      ContentIndex({
        enableSiteMap: false,
        enableRSS: false,
      }),
      Assets(),
      Static(),
      Favicon(),
      NotFoundPage(),
    ],
  },
}

export default config
