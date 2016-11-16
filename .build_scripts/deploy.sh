#!/usr/bin/env bash
set -e # halt script on error

echo "Get ready, we're pushing to gh-pages!"
cd _site
git init
git config user.name "DevSeed Build Bot"
git config user.email "dsbb@developmentseed.org"
git add .
git commit -m "CI deploy to gh-pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master:gh-pages
