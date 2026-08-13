# Images Needed for Articles

## Shedding vs Breakage Article

### Author Profile Image
- **Filename:** `kasia-nowak.jpg`
- **Location:** `public/image/kasia-nowak.jpg`
- **Description:** Profile photo of woman with long blonde hair in green shirt with peach scarf (provided by user)
- **Action needed:** Save the provided image to `public/image/kasia-nowak.jpg`
- **Compression:** Use sips or similar tool to compress to web-friendly size (recommended: 800x800px, quality 85%)

### Article Images

#### 1. Main Header Image
- **Current:** `/image/stylist-notices-thinning.webp` (already exists)
- **Status:** ✅ Already set

#### 2. Shedding vs Breakage Comparison
- **Filename:** `shedding-breakage-comparison.jpg`
- **Location:** `public/image/shedding-breakage-comparison.jpg`
- **Description:** Side-by-side comparison showing shed hair with visible bulb vs broken hair without bulb
- **Suggested content:** Close-up macro photography or diagram showing the key difference

#### 3. Hair Bulb Close-up
- **Filename:** `hair-bulb-closeup.jpg`
- **Location:** `public/image/hair-bulb-closeup.jpg`
- **Description:** Detailed close-up of hair strands clearly showing the white/translucent bulb on shed hair versus blunt/frayed ends on broken hair
- **Suggested content:** Macro photography with clear labeling

#### 4. Chairside Assessment
- **Filename:** `chairside-hair-test.jpg`
- **Location:** `public/image/chairside-hair-test.jpg`
- **Description:** Stylist performing hair assessment with client at the salon chair
- **Suggested content:** Professional salon setting, stylist examining client's hair

---

## Head Spa Article

### Article Images

#### 1. Main Header Image
- **Filename:** `head-spa.jpg`
- **Location:** `public/image/head-spa.jpg`
- **Description:** Luxurious head spa treatment in progress, showing scalp massage or treatment application
- **Suggested content:** Professional, relaxing spa-like atmosphere, warm tones, client receiving treatment

#### 2. Head Spa Setup
- **Filename:** `head-spa-setup.jpg`
- **Location:** `public/image/head-spa-setup.jpg`
- **Description:** Head spa treatment setup showing massage tools, products, steamer, and organized treatment station
- **Suggested content:** Flat lay or organized station shot with scalp brushes, serums, masks, tools

#### 3. Head Spa Equipment
- **Filename:** `head-spa-equipment.jpg`
- **Location:** `public/image/head-spa-equipment.jpg`
- **Description:** Essential head spa equipment laid out on salon counter (brushes, massagers, products, towels)
- **Suggested content:** Clean, professional product shot showing the starter equipment mentioned in the article

---

## 5 Thinning-Hair Treatments Review Article

### Main Header Image
- **Filename:** `thinning-treatments-cover.jpg`
- **Location:** `public/image/thinning-treatments-cover.jpg`
- **Description:** Hero image for "Yes, These 5 Thinning-Hair Treatments Can Work" — suggested: client checking a widening part in the salon mirror
- **Status:** Not yet added — article ships with this path referenced; add the file to make the hero image appear

### In-Body Product Images (auto-placeholders, no action required until ready)
These render as a styled "Image placeholder" box automatically (via `![caption]()` empty-src syntax in the article body) — no broken images, just a placeholder box. Replace each `![caption]()` line in `src/data/articles.ts` (slug: `best-thinning-hair-treatments-reviewed-by-pros`) with `![caption](/image/filename.jpg)` once a photo exists.

1. RE:YOU Dual-Path Hair Revival Serum — product bottle
2. Women's Rogaine (minoxidil) foam
3. CurrentBody Skin LED hair-regrowth device
4. In-office PRP treatment
5. Microneedling / dermaroller device
6. Ketoconazole (Nizoral) shampoo

---

## Quick Setup Commands

```bash
# Compress the author profile image (once you have it saved as source.jpg)
sips -Z 800 -s format jpeg -s formatOptions 85 source.jpg --out public/image/kasia-nowak.jpg

# Or if you have ImageMagick:
convert source.jpg -resize 800x800^ -gravity center -extent 800x800 -quality 85 public/image/kasia-nowak.jpg
```

## Notes
- All images should be optimized for web (compressed, appropriate dimensions)
- Consider using .webp or .avif format for better compression
- Ensure images are clear and professional quality
- Images should match the warm, professional aesthetic of the site
