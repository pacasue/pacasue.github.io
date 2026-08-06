# DOCX articles

Place Word `.docx` files directly in this folder. Nested folders are not scanned.

Each document must begin with these plain paragraphs:

```text
Title: The article title
Author: Contributor name
Date: 2026-08-06
Section: Trends
Category: Color
Excerpt: The summary shown on article cards and below the title.
Slug: optional-custom-slug
Tag: optional-label
Read Time: optional number of minutes
Meta Title: optional SEO title
Meta Description: optional SEO description
```

`Title`, `Author`, `Date`, `Section`, `Category`, and `Excerpt` are required.
`Section` must be `Trends`, `Inspiration`, or `Hair Care`.

Use Word's Heading 1, Heading 2, and Heading 3 styles for the article hierarchy.
The first embedded image is always used as the article hero and is not repeated
inside the article body. Every later embedded image remains inline. Add alt text
to images in Word to provide useful captions and accessible descriptions.

Run `npm run prepare:articles` to validate and convert the folder. Both
`npm run dev` and `npm run build` run the importer automatically.
