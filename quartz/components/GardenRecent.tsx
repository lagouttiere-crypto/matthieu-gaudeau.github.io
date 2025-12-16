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
  title: "Floraisons récentes",
  limit: 10,
  showTags: true,
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const GardenRecent: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    // Affiche seulement sur la page d'accueil
    if (fileData.slug !== "index") {
      return null
    }

    const pages = allFiles
      .filter((file) => file.slug !== "index" && !file.frontmatter?.draft)
      .sort((a, b) => {
        const dateA = getDate(cfg, a)
        const dateB = getDate(cfg, b)
        if (!dateA || !dateB) return 0
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, opts.limit)

    return (
      <div class={classNames(displayClass, "garden-recent")}>
        <h2>{opts.title}</h2>
        <div class="garden-grid">
          {pages.map((page) => {
            const title = page.frontmatter?.title ?? "Sans titre"
            const description = page.description?.slice(0, 150) || ""
            const tags = page.frontmatter?.tags || []
            const date = getDate(cfg, page)

            return (
              <a href={resolveRelative(fileData.slug!, page.slug!)} class="garden-card">
                <h3>{title}</h3>
                {description && <p class="excerpt">{description}...</p>}
                <div class="card-footer">
                  {date && <time>{formatDate(date, cfg.locale)}</time>}
                  {opts.showTags && tags.length > 0 && (
                    <div class="tags">
                      {tags.slice(0, 3).map((tag) => (
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

  GardenRecent.css = `
.garden-recent {
  margin: 3rem 0;
  padding: 0 2rem;  /* Réduis le padding */
  width: 100%;
  box-sizing: border-box;
}

.garden-recent h2 {
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.garden-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;  /* Espace entre les lignes */
  width: 100%;
}

.garden-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: none;
  border-bottom: 1px solid var(--lightgray);
  border-radius: 0;
  background: transparent;
  transition: all 0.2s ease;
}

.garden-card:hover {
  
  transform: none;
  box-shadow: none;
  border-color: var(--lightgray);
  background-image: none !important;
}

.garden-card h3 {
  margin: 0;
  font-size: 0.90rem;
  font-weight: 500;
  flex: 1;
}

.garden-card .excerpt {
  display: none;  /* Cache l'extrait */
}

.garden-card .card-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: nowrap;
}

.garden-card time {
  font-size: 0.85rem;
  color: var(--gray);
  white-space: nowrap;
}

.garden-card .tags {
  display: flex;
  gap: 0.4rem;
}

.garden-card .tag-pill {
font-size: 0.80rem;  /* Au lieu de 0.75rem */
padding: 0.2rem 0.6rem;
background: var(--highlight);
color: var(--secondary);
border-radius: 12px;
}
`

  return GardenRecent
}) satisfies QuartzComponentConstructor
