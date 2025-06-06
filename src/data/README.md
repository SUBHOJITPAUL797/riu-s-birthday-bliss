
# Adding Photos to Riu's Birthday Website

## Folder Structure
Create folders in `public/photos/` organized by year:

```
public/photos/
├── 2023/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
├── 2024/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
├── 2025/
│   └── photo1.jpg
└── ...
```

## Adding Photos

1. **Upload photos** to the appropriate year folder in `public/photos/YEAR/`
2. **Edit** `src/data/photos.ts` to register each photo:

```typescript
{
  id: "2024-3",           // Unique ID
  year: 2024,             // Year folder
  url: "/photos/2024/photo3.jpg",  // Path to your photo
  caption: "Beautiful memory 💕"   // Optional caption
}
```

3. **Redeploy** to Cloudflare Pages

## Supported Formats
- JPG, JPEG, PNG, WebP
- Recommended: Compress images before uploading for faster loading

## File Naming
- Use simple names like: `photo1.jpg`, `vacation.jpg`, `birthday.png`
- Avoid spaces and special characters
