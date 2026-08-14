#!/usr/bin/env bash
# 一键打包离线发布包（本地与 CI 共用）
# 用法：bash scripts/build-release.sh [版本号]   （版本号默认 v1.0.0）
# 产物：dist/deepseek-harness-tutorial-<版本号>.zip
set -euo pipefail

cd "$(dirname "$0")/.."

VERSION="${1:-v1.0.0}"
OUT="dist/deepseek-harness-tutorial-${VERSION}.zip"

echo "==> 打包离线发布包：${OUT}"
rm -rf dist
mkdir -p dist

# 只打包发布必需的文件（排除 .git / .github / docs / scripts / dist）
zip -r "${OUT}" \
  index.html \
  chapters \
  assets \
  README.md \
  LICENSE \
  -x "*.DS_Store" >/dev/null

echo "==> 完成：$(ls -lh "${OUT}" | awk '{print $5, $9}')"
