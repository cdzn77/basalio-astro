#!/bin/bash
set -e

echo "═══════════════════════════════════════════════════════════════════"
echo "PRE-DEPLOY VERIFICATION SEQUENCE"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

echo "1/4: Building production bundle..."
npm run build

echo ""
echo "2/4: Starting preview server..."
npm run preview > /tmp/pre-deploy-preview.log 2>&1 &
PREVIEW_PID=$!
sleep 4

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
echo "3/4: Running overflow verification (104 checks)..."
npm run verify:overflow

echo ""
echo "4/4: Running heading structure verification..."
npm run verify:headings

echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo "✅ PRE-DEPLOY VERIFICATION COMPLETE"
echo "═══════════════════════════════════════════════════════════════════"
