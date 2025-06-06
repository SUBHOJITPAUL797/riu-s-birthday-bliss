
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';

interface Photo {
  id: string;
  year: number;
  url: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  year: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, year }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (photos.length === 0) {
    return (
      <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
        <Heart className="mx-auto text-pink-300 mb-4 animate-pulse" size={64} />
        <h3 className="text-2xl font-semibold text-rose-700 mb-2">
          No memories for {year} yet
        </h3>
        <p className="text-gray-600">
          Add some beautiful photos using the "Add Photos" button! 📸
        </p>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-rose-700">
          Our Memories from {year} 💕
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src={photo.url}
                  alt={photo.caption || `Memory from ${year}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">
                      {photo.caption || 'Click to view'}
                    </p>
                  </div>
                </div>
                <Heart className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal for selected photo */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] animate-scale-in">
            <Button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white border-none z-10"
              size="icon"
            >
              <X />
            </Button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption || 'Memory'}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            {selectedPhoto.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                <p className="text-center text-lg">{selectedPhoto.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
