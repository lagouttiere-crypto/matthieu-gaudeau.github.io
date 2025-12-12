#!/bin/bash

echo "🌿 Publication du Garden Gester..."

# 1. Copie du contenu depuis Obsidian
echo "📋 Copie du contenu Obsidian..."
rm -rf content
cp -R "/Users/matthieugaudeau/Library/Mobile Documents/iCloud~md~obsidian/Documents/Technique Alexander/noyau théorique/Public" content

# 2. Build Quartz
echo "🔨 Compilation du site..."
npx quartz build

# 3. Déploiement GitHub
echo "🚀 Déploiement sur GitHub Pages..."
cd public
rm -rf .git
git init
git add -A
git commit -m "Update $(date '+%Y-%m-%d %H:%M')"
git push -f https://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@github.com/lagouttiere-crypto/matthieu-gaudeau.github.io.git HEAD:gh-pages

echo "✅ Publication terminée ! Attends 2-3 minutes pour voir les changements."
