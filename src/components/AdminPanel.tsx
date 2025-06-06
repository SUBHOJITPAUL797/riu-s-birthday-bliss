import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { X, Plus, Trash2, Upload } from 'lucide-react';

interface Photo {
  id: string;
  year: number;
  url: string;
  caption?: string;
}

interface AdminPanelProps {
  photos: Photo[];
  onSavePhotos: (photos: Photo[]) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ photos, onSavePhotos, onClose }) => {
  const [newPhoto, setNewPhoto] = useState({
    year: new Date().getFullYear(),
    url: '',
    caption: ''
  });

  const handleAddPhoto = () => {
    if (!newPhoto.url.trim()) return;

    const photo: Photo = {
      id: Date.now().toString(),
      year: newPhoto.year,
      url: newPhoto.url.trim(),
      caption: newPhoto.caption.trim() || undefined
    };

    onSavePhotos([...photos, photo]);
    setNewPhoto({
      year: new Date().getFullYear(),
      url: '',
      caption: ''
    });
  };

  const handleDeletePhoto = (photoId: string) => {
    onSavePhotos(photos.filter(photo => photo.id !== photoId));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPhoto(prev => ({
          ...prev,
          url: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-h-[80vh] overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-rose-700">Manage Photos</h2>
        <Button onClick={onClose} variant="outline" size="icon">
          <X />
        </Button>
      </div>

      {/* Add New Photo Form */}
      <Card className="p-4 mb-6 border-pink-200">
        <h3 className="text-lg font-semibold mb-4 text-rose-600">Add New Photo</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={newPhoto.year}
              onChange={(e) => setNewPhoto(prev => ({ ...prev, year: parseInt(e.target.value) }))}
              min="2000"
              max="2050"
            />
          </div>

          <div>
            <Label htmlFor="photo-upload">Upload Photo</Label>
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
            <p className="text-sm text-gray-500">Or paste image URL below:</p>
          </div>

          <div>
            <Label htmlFor="url">Photo URL</Label>
            <Input
              id="url"
              type="url"
              value={newPhoto.url}
              onChange={(e) => setNewPhoto(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com/photo.jpg or upload above"
            />
          </div>

          <div>
            <Label htmlFor="caption">Caption (Optional)</Label>
            <Textarea
              id="caption"
              value={newPhoto.caption}
              onChange={(e) => setNewPhoto(prev => ({ ...prev, caption: e.target.value }))}
              placeholder="Add a sweet caption for this memory..."
              rows={2}
            />
          </div>

          <Button 
            onClick={handleAddPhoto}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white"
            disabled={!newPhoto.url.trim()}
          >
            <Plus className="mr-2" size={16} />
            Add Photo
          </Button>
        </div>
      </Card>

      {/* Existing Photos */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-rose-600">Existing Photos ({photos.length})</h3>
        {photos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No photos added yet</p>
        ) : (
          photos.map(photo => (
            <Card key={photo.id} className="p-3 border-pink-100">
              <div className="flex gap-3">
                <img
                  src={photo.url}
                  alt={photo.caption || 'Photo'}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Year: {photo.year}</p>
                  {photo.caption && (
                    <p className="text-sm text-gray-600 truncate">{photo.caption}</p>
                  )}
                </div>
                <Button
                  onClick={() => handleDeletePhoto(photo.id)}
                  variant="outline"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
