import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"
import { formatDate, getDate } from "./Date"

interface Options {
  title?: string
  limit: number
  showTags?: boolean
}

const defaultOptions: Options = {
  title: "Articles similaires",
  limit: 8,
  showTags: true,
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const RelatedArticles: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    // Ne pas afficher sur la page d'accueil
    if (fileData.slug === "index") {
      return null
    }

    // Récupérer les tags de l'article actuel
    const currentTags = fileData.frontmatter?.tags || []

    // Si pas de tags, ne rien afficher
    if (currentTags.length === 0) {
      return null
    }

    // Calculer la similarité et filtrer les articles
    const relatedPages = allFiles
      .filter(
        (file) =>
          file.slug !== fileData.slug && // Exclure l'article actuel
          file.slug !== "index" && // Exclure l'index
          !file.frontmatter?.draft, // Exclure les brouillons
      )
      .map((file) => {
        const fileTags = file.frontmatter?.tags || []
        // Compter le nombre de tags en commun
        const commonTags = fileTags.filter((tag) => currentTags.includes(tag))
        return {
          file,
          similarity: commonTags.length,
          commonTags,
        }
      })
      .filter((item) => item.similarity > 0) // Garder seulement ceux avec au moins 1 tag commun
      .sort((a, b) => {
        // Trier par nombre de tags communs (descendant)
        if (b.similarity !== a.similarity) {
          return b.similarity - a.similarity
        }
        // Si même nombre de tags, trier par date (plus récent d'abord)
        const dateA = getDate(cfg, a.file)
        const dateB = getDate(cfg, b.file)
        if (!dateA || !dateB) return 0
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, opts.limit)

    // Si aucun article similaire, ne rien afficher
    if (relatedPages.length === 0) {
      return null
    }

    return (
      <div class={classNames(displayClass, "related-articles")}>
        <h3>{opts.title}</h3>
        <div class="related-grid">
          {relatedPages.map(({ file, commonTags }) => {
            const title = file.frontmatter?.title ?? "Sans titre"
            const description = file.description?.slice(0, 150) || ""
            const tags = file.frontmatter?.tags || []
            const date = getDate(cfg, file)

            return (
              <a href={resolveRelative(fileData.slug!, file.slug!)} class="garden-card">
                <h3>{title}</h3>
                {description && <p class="excerpt">{description}...</p>}
                <div class="card-footer">
                  {date && <time>{formatDate(date, cfg.locale)}</time>}
                  {opts.showTags && tags.length > 0 && (
                    <div class="tags">
                      {commonTags.slice(0, 3).map((tag) => (
                        <span class="tag-pill tag-common">#{tag}</span>
                      ))}
                      {tags
                        .filter((t) => !commonTags.includes(t))
                        .slice(0, 3 - commonTags.length)
                        .map((tag) => (
                          <span class="tag-pill">#{tag}</span>
                        ))}
                    </div>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  RelatedArticles.css = `
.related-articles {
  margin: 3rem 0;
  padding: 2rem 0;
  border-top: 1px solid var(--lightgray);
}

.related-articles h3 {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--gray);
}

.related-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.related-articles .garden-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid var(--lightgray);
  border-radius: 0;
  background: transparent;
  transition: all 0.2s ease;
}

.related-articles .garden-card:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.related-articles .garden-card:hover {
  transform: none;
  box-shadow: none;
  border-color: var(--secondary);
  background-image: none !important;
}

.related-articles .garden-card h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  flex: 1;
}

.related-articles .garden-card .excerpt {
  display: none;
}

.related-articles .garden-card .card-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: nowrap;
}

.related-articles .garden-card time {
  font-size: 0.85rem;
  color: var(--gray);
  white-space: nowrap;
}

.related-articles .garden-card .tags {
  display: flex;
  gap: 0.4rem;
}

.related-articles .garden-card .tag-pill {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  background: var(--highlight);
  color: var(--secondary);
  border-radius: 12px;
}

/* Style spécial pour les tags en commun */
.related-articles .garden-card .tag-common {
  background: rgba(58, 90, 74, 0.15);
  color: #3a5a4a;
  font-weight: 500;
}
`

  return RelatedArticles
}) satisfies QuartzComponentConstructor
