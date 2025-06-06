
// Photo configuration - Add your photos here organized by year
export interface PhotoData {
  id: string;
  year: number;
  url: string;
  caption?: string;
}

// Add your photos here - organize them by year
export const photosByYear: PhotoData[] = [
  // Example photos for 2023
  {
    id: "2023-1",
    year: 2023,
    url: "/photos/2023/photo1.jpg",
    caption: "Our first date 💕"
  },
  {
    id: "2023-2", 
    year: 2023,
    url: "/photos/2023/photo2.jpg",
    caption: "Beach vacation together"
  },
  
  // Example photos for 2024
  {
    id: "2024-1",
    year: 2024,
    url: "/photos/2024/photo1.jpg",
    caption: "New Year celebration 🎉"
  },
  {
    id: "2024-2",
    year: 2024,
    url: "/photos/2024/photo2.jpg",
    caption: "Your birthday last year"
  },
  
  // Add more photos here as needed
  // {
  //   id: "2025-1",
  //   year: 2025,
  //   url: "/photos/2025/photo1.jpg",
  //   caption: "Caption here"
  // },
];
