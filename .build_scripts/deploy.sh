#!/usr/bin/env bash
set -e # halt script on error

# If this is the publish branch, push it up to gh-pages
if [ $TRAVIS_PULL_REQUEST = "false" ] && [ $TRAVIS_BRANCH = "master" ]; then
  echo "Get ready, we're publishing!"
  cd _site
  git init
  git config user.name "DevSeed Build Bot"
  git config user.email "dsbb@developmentseed.org"
  rm ./CNAME
  git add .
  git commit -m "CI deploy to gh-pages"
  git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages
else
  echo "Not a publishable branch so we're all done here"
fi
