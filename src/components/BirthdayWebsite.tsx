
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PhotoGallery from './PhotoGallery';
import AdminPanel from './AdminPanel';
import { Heart, Star, Gift } from 'lucide-react';

interface PhotoData {
  id: string;
  year: number;
  url: string;
  caption?: string;
}

const BirthdayWebsite = () => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [showAdmin, setShowAdmin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load photos from localStorage
    const savedPhotos = localStorage.getItem('riuBirthdayPhotos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }

    // Trigger entrance animation
    setIsVisible(true);
  }, []);

  const savePhotos = (newPhotos: PhotoData[]) => {
    setPhotos(newPhotos);
    localStorage.setItem('riuBirthdayPhotos', JSON.stringify(newPhotos));
  };

  const getAvailableYears = () => {
    const years = [...new Set(photos.map(photo => photo.year))].sort((a, b) => b - a);
    return years.length > 0 ? years : [new Date().getFullYear()];
  };

  const filteredPhotos = photos.filter(photo => photo.year === selectedYear);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 relative overflow-hidden">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-pink-300 opacity-30 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          />
        ))}
      </div>

      <div className={`container mx-auto px-4 py-8 transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-4 animate-scale-in">
            Happy Birthday Riu! 🎉
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="text-yellow-400 animate-spin" />
            <p className="text-2xl text-rose-600 font-semibold">Our Beautiful Journey Together</p>
            <Star className="text-yellow-400 animate-spin" />
          </div>
          <div className="flex items-center justify-center gap-4">
            <Gift className="text-pink-500 animate-bounce" />
            <p className="text-lg text-gray-600">Today is your special day! 💕</p>
            <Gift className="text-pink-500 animate-bounce" />
          </div>
        </div>

        {/* Year Selection */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-4 text-rose-700">Select a Year</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {getAvailableYears().map(year => (
              <Button
                key={year}
                onClick={() => setSelectedYear(year)}
                variant={selectedYear === year ? "default" : "outline"}
                className={`transition-all duration-300 ${
                  selectedYear === year 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105' 
                    : 'border-pink-300 text-pink-600 hover:bg-pink-50'
                }`}
              >
                {year}
              </Button>
            ))}
          </div>
        </Card>

        {/* Photo Gallery */}
        <PhotoGallery photos={filteredPhotos} year={selectedYear} />

        {/* Admin Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setShowAdmin(!showAdmin)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
          >
            {showAdmin ? 'Close Admin' : 'Add Photos'}
          </Button>
        </div>

        {/* Admin Panel */}
        {showAdmin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-auto">
              <AdminPanel
                photos={photos}
                onSavePhotos={savePhotos}
                onClose={() => setShowAdmin(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayWebsite;
