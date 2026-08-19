#!/bin/bash
set -e

echo "═══════════════════════════════════════════════════════════════════"
echo "PRE-DEPLOY VERIFICATION SEQUENCE"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

echo "1/6: Building production bundle..."
npm run build

echo ""
echo "2/6: Starting static server for verification..."
npx -y serve dist -l 4321 > /tmp/pre-deploy-preview.log 2>&1 &
PREVIEW_PID=$!

# Wait for server to be ready (max 15s)
for i in {1..15}; do
  if curl -s http://localhost:4321/ > /dev/null 2>&1; then
    break
  fi
  sleep 1
done

# Function to cleanup on exit
cleanup() {
  if [ -n "$PREVIEW_PID" ]; then
    echo ""
    echo "Cleaning up preview server (PID $PREVIEW_PID)..."
    kill $PREVIEW_PID 2>/dev/null || true
  fi
}
trap cleanup EXIT

echo ""
echo "3/6: Running overflow verification (104 checks)..."
PORT=4321 npm run verify:overflow

echo ""
echo "4/6: Running heading structure verification..."
PORT=4321 npm run verify:headings

echo ""
echo "5/6: Running image/video loading verification..."
PORT=4321 node scripts/verify-images.mjs

echo ""
echo "6/6: Running touch-target verification..."
PORT=4321 node scripts/verify-touch-targets.mjs

echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo "✅ PRE-DEPLOY VERIFICATION COMPLETE (ALL 6 GATES PASSED)"
echo "═══════════════════════════════════════════════════════════════════"
