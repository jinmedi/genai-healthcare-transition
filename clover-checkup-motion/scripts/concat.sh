#!/usr/bin/env bash
# 검진 안내 영상 + 아내 자랑 영상을 재인코딩 없이 이어 붙인다.
# 사용: bash scripts/concat.sh [1x1|16x9]   (기본 1x1)
#   1x1  : out/clover-checkup-promo-1x1.mp4  + out/clover-wife-promo-1x1.mp4  → out/clover-promo-combined-1x1.mp4
#   16x9 : out/clover-checkup-promo-16x9.mp4 + out/clover-wife-promo-16x9.mp4 → out/clover-promo-combined-16x9.mp4
set -euo pipefail
cd "$(dirname "$0")/.."
SUFFIX="${1:-1x1}"
LIST=$(mktemp)
printf "file '%s'\nfile '%s'\n" "$PWD/out/clover-checkup-promo-$SUFFIX.mp4" "$PWD/out/clover-wife-promo-$SUFFIX.mp4" > "$LIST"
ffmpeg -y -loglevel error -f concat -safe 0 -i "$LIST" -c copy -movflags +faststart "out/clover-promo-combined-$SUFFIX.mp4"
rm -f "$LIST"
echo "→ out/clover-promo-combined-$SUFFIX.mp4"
