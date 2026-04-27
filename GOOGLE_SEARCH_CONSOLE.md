# Google Search Console Setup for puzzle-engine.com

## Prerequisites
- Google account
- Access to puzzle-engine.com domain

## Step 1: Add Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click the dropdown in top-left (or "Add property")
3. Select "URL prefix" and enter: `https://puzzle-engine.com`
4. Click "Continue"

## Step 2: Verify Ownership

### Option A: DNS Verification (Recommended)
1. Select "DNS record" verification method
2. Copy the TXT record value provided
3. Go to Cloudflare DNS settings for puzzle-engine.com
4. Add a new TXT record:
   - Type: TXT
   - Name: `@`
   - Content: (paste the value from Google)
5. Click "Verify" in Search Console (may take a few minutes)

### Option B: HTML File Verification
1. Select "HTML file" verification method
2. Download the verification file (e.g., `google1234.html`)
3. Upload to `/var/www/puzzle-engine.com/` on your VPS:
   ```bash
   # Copy the file to the web root
   scp google1234.html user@187.124.114.133:/var/www/puzzle-engine.com/
   ```
4. Click "Verify" in Search Console

## Step 3: Submit Sitemap

1. In Search Console, select your property (puzzle-engine.com)
2. Go to **Sitemaps** in the left sidebar
3. Enter sitemap URL: `sitemap.xml`
4. Click "Submit"

The sitemap is located at: `https://puzzle-engine.com/sitemap.xml`

## Step 4: Request Indexing (Homepage)

1. In Search Console, use the **URL Inspection** tool (top search bar)
2. Enter: `https://puzzle-engine.com/`
3. Click "Test live URL" to verify it's accessible
4. Click "Request indexing"

## Step 5: Monitor Indexing

1. Go to **Pages** in the left sidebar
2. Wait 1-7 days for pages to be indexed
3. Check for any errors or crawl issues

## Current Sitemap URLs

The sitemap includes these URLs:
- https://puzzle-engine.com/ (homepage)
- https://puzzle-engine.com/sudoku/
- https://puzzle-engine.com/word-search/
- https://puzzle-engine.com/mazes/
- https://puzzle-engine.com/number-search/
- https://puzzle-engine.com/word-scramble/
- https://puzzle-engine.com/kenken/
- https://puzzle-engine.com/killer-sudoku/
- https://puzzle-engine.com/privacy.html
- https://puzzle-engine.com/terms.html

## Troubleshooting

### If pages aren't indexed:
1. Check robots.txt isn't blocking: `https://puzzle-engine.com/robots.txt`
2. Verify SSL certificate is valid
3. Use URL Inspection to test individual pages
4. Check for crawl errors in Search Console

### If you see redirect issues:
- V1 had redirect loops from Cloudflare Pages
- V2 on VPS should not have this issue
- Verify all pages return 200 OK status

## Git Link

This document is committed to the repository:
`https://github.com/turnedfromtrees/puzzle-engine/blob/main/GOOGLE_SEARCH_CONSOLE.md`