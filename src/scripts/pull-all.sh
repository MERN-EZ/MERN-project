#!/bin/bash

for branch in $(git branch -r | grep -v '\->' | sed 's/origin\///'); do
  git checkout $branch
  git pull origin $branch
done