import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

function getMaturityEmoji(maturity?: string): string {
  switch (maturity?.toLowerCase()) {
    case "germe":
      return "🌱 "
    case "arbuste":
      return "🌿 "
    case "arbre":
      return "🌳 "
    default:
      return ""
  }
}

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  const maturity = fileData.frontmatter?.maturity as string

  if (title) {
    return (
      <h1 class={classNames(displayClass, "article-title")}>
        {getMaturityEmoji(maturity)}
        {title}
      </h1>
    )
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
