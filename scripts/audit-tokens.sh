#!/bin/bash

# Extract token names from tokens.css (lines starting with --)
tokens=$(grep -oP '(?<=--)[a-z0-9-]+(?=:)' src/styles/tokens.css | sort -u)

echo "=== TOKEN USAGE AUDIT ==="
echo ""
echo "Grepping src/ for: var(--token-name)"
echo ""

declare -A token_counts

for token in $tokens; do
  count=$(grep -r "var(--$token)" src/ 2>/dev/null | wc -l)
  token_counts["$token"]=$count
done

# Print results sorted by count (descending)
echo "Token | Count"
echo "------|------"
for token in "${!token_counts[@]}"; do
  echo "$token | ${token_counts[$token]}"
done | sort -t'|' -k2 -rn
