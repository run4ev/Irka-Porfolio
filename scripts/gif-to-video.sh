#!/usr/bin/env bash
# Converts every GIF in media/gifs/ to MP4 (H.264) + WebM (VP9) in public/video/,
# and saves the first frame as a PNG poster you can put in src/content/projects/<slug>/.
# Requires ffmpeg (macOS: brew install ffmpeg).
set -euo pipefail
IN="media/gifs"
OUT="public/video"
mkdir -p "$OUT" media/posters

for gif in "$IN"/*.gif; do
  name="$(basename "$gif" .gif)"
  echo "→ $name"
  # even dimensions are required by H.264; yuv420p because GIFs decode with alpha,
  # which VP9 rejects and most players can't show
  even="scale=trunc(iw/2)*2:trunc(ih/2)*2"
  ffmpeg -loglevel error -y -i "$gif" -movflags +faststart -pix_fmt yuv420p \
    -vf "$even" -c:v libx264 -crf 23 -an "$OUT/$name.mp4"
  ffmpeg -loglevel error -y -i "$gif" -pix_fmt yuv420p \
    -vf "$even" -c:v libvpx-vp9 -b:v 0 -crf 34 -an "$OUT/$name.webm"
  ffmpeg -loglevel error -y -i "$gif" -frames:v 1 "media/posters/$name.png"
done
echo "Done. Reference a video in frontmatter with:  video: '<name>'"
