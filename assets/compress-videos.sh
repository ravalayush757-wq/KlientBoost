#!/bin/bash
# Video compression script for portfolio
# Optimizes all videos for web: H.264, 720p, faststart, CRF 28

set -e

UGC_SRC="$(dirname "$0")/UGC"
INF_SRC="$(dirname "$0")/Influencer"
UGC_DST="$(dirname "$0")/portfolio/ugc"
INF_DST="$(dirname "$0")/portfolio/influencer"

mkdir -p "$UGC_DST" "$INF_DST"

echo "========================================="
echo "Compressing UGC videos..."
echo "========================================="
i=1
for f in "$UGC_SRC"/*.mp4; do
    out="$UGC_DST/ugc-${i}.mp4"
    echo "[$i/9] Compressing: $(basename "$f")"
    echo "  -> $out"
    ffmpeg -y -i "$f" \
        -c:v libx264 -preset medium -crf 28 \
        -vf "scale=720:-2" \
        -c:a aac -b:a 96k -ac 1 \
        -movflags +faststart \
        -pix_fmt yuv420p \
        "$out" 2>/dev/null
    echo "  Done: $(du -h "$out" | cut -f1)"
    i=$((i+1))
done

echo ""
echo "========================================="
echo "Compressing Influencer videos..."
echo "========================================="
i=1
for f in "$INF_SRC"/*.mp4 "$INF_SRC"/*.mov; do
    [ -f "$f" ] || continue
    out="$INF_DST/influencer-${i}.mp4"
    echo "[$i/8] Compressing: $(basename "$f")"
    echo "  -> $out"
    ffmpeg -y -i "$f" \
        -c:v libx264 -preset medium -crf 28 \
        -vf "scale=720:-2" \
        -c:a aac -b:a 96k -ac 1 \
        -movflags +faststart \
        -pix_fmt yuv420p \
        "$out" 2>/dev/null
    echo "  Done: $(du -h "$out" | cut -f1)"
    i=$((i+1))
done

echo ""
echo "========================================="
echo "Generating video poster thumbnails..."
echo "========================================="
for f in "$UGC_DST"/*.mp4; do
    poster="${f%.mp4}-poster.webp"
    ffmpeg -y -i "$f" -ss 00:00:01 -frames:v 1 -vf "scale=360:-2" -q:v 80 "$poster" 2>/dev/null
    echo "Poster: $(basename "$poster") ($(du -h "$poster" | cut -f1))"
done
for f in "$INF_DST"/*.mp4; do
    poster="${f%.mp4}-poster.webp"
    ffmpeg -y -i "$f" -ss 00:00:01 -frames:v 1 -vf "scale=360:-2" -q:v 80 "$poster" 2>/dev/null
    echo "Poster: $(basename "$poster") ($(du -h "$poster" | cut -f1))"
done

echo ""
echo "========================================="
echo "ALL DONE!"
echo "========================================="
ls -lhS "$UGC_DST"/*.mp4
echo "---"
ls -lhS "$INF_DST"/*.mp4
