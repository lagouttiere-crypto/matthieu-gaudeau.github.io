#!/bin/bash

echo "📝 Sauvegarde des modifications..."
npx quartz sync

echo "🔨 Build du site..."
npx quartz build

echo "🚀 Déploiement vers GitHub Pages..."
cd public
git init
git add -A
git commit -m "Deploy site $(date '+%Y-%m-%d %H:%M')"
git push --force origin HEAD:gh-pages
cd ..

echo "✅ Déploiement terminé !"
