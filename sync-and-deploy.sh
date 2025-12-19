#!/bin/bash

echo "📦 Synchronisation du dossier Public..."
rsync -av --delete "/Users/matthieugaudeau/Library/Mobile Documents/iCloud~md~obsidian/Documents/Technique Alexander/noyau théorique/Public/" "content/"

echo "📝 Sauvegarde des modifications..."
npx prettier . --write
npx quartz sync

echo "🔨 Build du site..."
npx quartz build

echo "📄 Ajout du CNAME..."
cp static/CNAME public/CNAME

echo "🚀 Déploiement vers GitHub Pages..."
cd public
git init
git add -A
git commit -m "Deploy site $(date '+%Y-%m-%d %H:%M')"
git push --force https://github.com/lagouttiere-crypto/matthieu-gaudeau.github.io.git HEAD:gh-pages
cd ..

echo "✅ Déploiement terminé !"
