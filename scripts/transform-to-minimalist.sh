#!/bin/bash

# Transform website to qjl.kz minimalist style
# This script performs systematic replacements across component files

COMPONENTS_DIR="/Users/nuralisagyndykuly/llf_site/src/components"

echo "🎨 Starting minimalist transformation..."
echo ""

# Backup first
echo "📦 Creating backup..."
cp -r "$COMPONENTS_DIR" "$COMPONENTS_DIR.backup-$(date +%Y%m%d-%H%M%S)"

echo "✅ Backup created"
echo ""

# 1. SHADOW REDUCTION: Replace heavy shadows with lighter or border-based alternatives
echo "🌑 Step 1: Reducing shadow intensity..."

# Shadow replacements - most shadows become lighter or removed
find "$COMPONENTS_DIR" -name "*.tsx" -type f -exec sed -i '' \
  -e 's/shadow-2xl/shadow-lg/g' \
  -e 's/shadow-xl hover:shadow-2xl/shadow-md hover:shadow-lg/g' \
  -e 's/shadow-lg hover:shadow-xl/shadow-md hover:shadow-lg/g' \
  -e 's/shadow-md hover:shadow-xl/shadow-sm hover:shadow-md/g' \
  -e 's/shadow-md hover:shadow-lg/shadow-sm hover:shadow-md/g' \
  {} +

echo "   ✓ Heavy shadows reduced"

# 2. PADDING REDUCTION: Tighter spacing like qjl.kz
echo "📏 Step 2: Reducing padding for tighter spacing..."

find "$COMPONENTS_DIR" -name "*.tsx" -type f -exec sed -i '' \
  -e 's/px-8/px-5/g' \
  -e 's/py-8/py-5/g' \
  -e 's/p-8/p-5/g' \
  -e 's/px-6 py-6/px-4 py-4/g' \
  -e 's/p-6/p-4/g' \
  {} +

echo "   ✓ Padding reduced for tighter spacing"

# 3. BORDER RADIUS SIMPLIFICATION: Less rounded, flatter look
echo "⬜ Step 3: Simplifying border radius..."

find "$COMPONENTS_DIR" -name "*.tsx" -type f -exec sed -i '' \
  -e 's/rounded-2xl/rounded-lg/g' \
  -e 's/rounded-xl/rounded-lg/g' \
  {} +

echo "   ✓ Border radius simplified"

# 4. FONT WEIGHT SPECIFIC REPLACEMENTS: Strategic weight reductions
echo "📝 Step 4: Adjusting specific font weights..."

# Replace specific font-semibold patterns where we want font-medium instead
# This targets specific UI elements that should be even lighter
find "$COMPONENTS_DIR" -name "*.tsx" -type f -exec sed -i '' \
  -e 's/text-xs font-semibold/text-xs font-medium/g' \
  -e 's/text-sm font-semibold text-neutral/text-sm font-medium text-neutral/g' \
  -e 's/text-sm font-semibold text-white/text-sm font-medium text-white/g' \
  {} +

echo "   ✓ Font weights adjusted"

# 5. REMOVE UNNECESSARY GRADIENTS: Flatten visual effects
echo "🎨 Step 5: Simplifying gradients..."

# Replace complex gradients with simpler backgrounds in specific cases
find "$COMPONENTS_DIR" -name "*.tsx" -type f -exec sed -i '' \
  -e 's/bg-gradient-to-br from-primary-900\/40 to-primary-800\/20/bg-primary-900\/30/g' \
  -e 's/bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100/bg-yellow-50/g' \
  {} +

echo "   ✓ Gradients simplified"

echo ""
echo "✨ Transformation complete!"
echo ""
echo "📊 Summary of changes:"
echo "   - Shadows: Reduced from xl/2xl to lg/md"
echo "   - Padding: Reduced from 6/8 to 4/5"
echo "   - Border radius: Simplified from xl/2xl to lg"
echo "   - Font weights: Strategic reductions applied"
echo "   - Gradients: Flattened where appropriate"
echo ""
echo "🔍 Next steps:"
echo "   1. Review changes with git diff"
echo "   2. Test the site visually"
echo "   3. Manual adjustments for specific components"
echo ""
