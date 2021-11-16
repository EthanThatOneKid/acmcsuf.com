#!/usr/bin/env bash

# Name: check_site_changes.sh
# Description: Checks for changes in the site and succeeds if there are none.
# Usage: bash scripts/check_site_changes.sh
# Tracker: https://etok.codes/acmcsuf.com/issues/198
# Requires: Git (https://git-scm.com/)

[[ "$(git status --porcelain -- src/ static/ package*.json svelte.config.js)" ]] && exit 1 || exit 0
