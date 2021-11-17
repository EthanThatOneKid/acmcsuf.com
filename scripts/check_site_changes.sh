#!/usr/bin/env bash

# Name: check_site_changes.sh
# Description: Exits with code 1 (new build needed) or code 0
# Usage: bash scripts/check_site_changes.sh
# Tracker: https://etok.codes/acmcsuf.com/issues/198
# Requires: Git (https://git-scm.com/)

[[ "$(git status --porcelain -- src/ static/ package*.json svelte.config.js)" ]] && exit 1
