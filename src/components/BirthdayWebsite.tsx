
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PhotoGallery from './PhotoGallery';
import { Heart, Star, Gift, Info } from 'lucide-react';
import { photosByYear, PhotoData } from '@/data/photos';

const BirthdayWebsite = () => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
  }, []);

  const getAvailableYears = () => {
    const years = [...new Set(photosByYear.map(photo => photo.year))].sort((a, b) => b - a);
    return years.length > 0 ? years : [new Date().getFullYear()];
  };

  const filteredPhotos = photosByYear.filter(photo => photo.year === selectedYear);

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

        {/* Info Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setShowInfo(!showInfo)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
          >
            <Info className="mr-2" size={20} />
            How to Add Photos
          </Button>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-rose-700">How to Add Photos</h2>
                <Button onClick={() => setShowInfo(false)} variant="outline" size="icon">
                  <Heart />
                </Button>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-rose-600 mb-2">📁 Folder Structure:</h3>
                  <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                    public/photos/<br/>
                    ├── 2023/<br/>
                    │   ├── photo1.jpg<br/>
                    │   └── photo2.jpg<br/>
                    ├── 2024/<br/>
                    │   ├── photo1.jpg<br/>
                    │   └── photo2.jpg<br/>
                    └── 2025/<br/>
                        └── photo1.jpg
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-rose-600 mb-2">⚙️ How to Add:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Create year folders in <code>public/photos/</code></li>
                    <li>Add your photos to the year folders</li>
                    <li>Edit <code>src/data/photos.ts</code> to register the photos</li>
                    <li>Redeploy to Cloudflare Pages</li>
                  </ol>
                </div>
                
                <div className="bg-pink-50 p-3 rounded">
                  <p className="text-sm text-rose-700">
                    💡 <strong>Tip:</strong> Photos will be visible to everyone who visits the site once deployed!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayWebsite;
