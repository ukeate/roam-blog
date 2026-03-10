import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      folderDefaultState: "collapsed",
      folderClickBehavior: "link",
      useSavedState: true,
      sortFn: (a, b) => {
        const pinned = ["arsenal", "para"]
        const ai = pinned.indexOf(a.displayName.toLowerCase())
        const bi = pinned.indexOf(b.displayName.toLowerCase())
        if (ai !== bi) {
          if (ai === -1) return 1
          if (bi === -1) return -1
          return ai - bi
        }
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        return a.isFolder ? -1 : 1
      },
    }),
  ],
  right: [
    Component.Graph({
      localGraph: {
        depth: 2,
        enableRadial: true,
        focusOnHover: true,
      },
      globalGraph: {
        depth: -1,
        scale: 0.8,
        enableRadial: true,
        focusOnHover: true,
      },
    }),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      folderDefaultState: "collapsed",
      folderClickBehavior: "link",
      useSavedState: true,
      sortFn: (a, b) => {
        const pinned = ["arsenal", "para"]
        const ai = pinned.indexOf(a.displayName.toLowerCase())
        const bi = pinned.indexOf(b.displayName.toLowerCase())
        if (ai !== bi) {
          if (ai === -1) return 1
          if (bi === -1) return -1
          return ai - bi
        }
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        return a.isFolder ? -1 : 1
      },
    }),
  ],
  right: [],
}
