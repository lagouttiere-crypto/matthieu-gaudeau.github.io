import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Layout partagé - header minimaliste avec juste le titre
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(), // Juste le lien "Index" en haut
  ],
  afterBody: [
    Component.Graph(), // Graphe après le contenu de toutes les pages
    Component.Backlinks(), // Articles reliés après le graphe
    Component.GardenRecent({
      title: "Floraisons récentes",
      limit: 10,
      showTags: true,
    }),
  ],
  footer: Component.Footer({
    links: {
      // Tu peux garder ou vider tes liens
    },
  }),
}

// Layout pour les pages de contenu individuelles
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [], // Plus de sidebar gauche
  right: [], // Plus de sidebar droite
}

// Layout pour les pages de liste (tags, dossiers)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [],
  right: [],
}
