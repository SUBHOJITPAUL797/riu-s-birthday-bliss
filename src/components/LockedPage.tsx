
import React from 'react';
import { Card } from '@/components/ui/card';
import { Lock, Heart, Calendar } from 'lucide-react';

interface LockedPageProps {
  timeUntilBirthday: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const LockedPage: React.FC<LockedPageProps> = ({ timeUntilBirthday }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-rose-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 30 + 15}px`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      <Card className="max-w-lg mx-4 p-8 bg-white/10 backdrop-blur-md border-pink-300/30 text-center shadow-2xl">
        <div className="mb-6">
          <Lock className="mx-auto text-pink-300 mb-4 animate-pulse" size={64} />
          <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
            Website Locked 🔒
          </h1>
          <p className="text-xl text-pink-200 mb-6 font-semibold">
            I Love You Riu<br />
            Next Birthday Open Hobe Abr 💕
          </p>
        </div>

        <div className="bg-white/20 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="text-pink-300" size={24} />
            <h2 className="text-2xl font-bold text-white">
              Countdown to Next Birthday
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg p-3 animate-pulse">
              <div className="text-2xl font-bold text-white">
                {timeUntilBirthday.days}
              </div>
              <div className="text-pink-100 text-sm">Days</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-3 animate-pulse">
              <div className="text-2xl font-bold text-white">
                {timeUntilBirthday.hours}
              </div>
              <div className="text-purple-100 text-sm">Hours</div>
            </div>
            <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg p-3 animate-pulse">
              <div className="text-2xl font-bold text-white">
                {timeUntilBirthday.minutes}
              </div>
              <div className="text-rose-100 text-sm">Minutes</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg p-3 animate-pulse">
              <div className="text-2xl font-bold text-white">
                {timeUntilBirthday.seconds}
              </div>
              <div className="text-pink-100 text-sm">Seconds</div>
            </div>
          </div>
        </div>

        <p className="text-pink-200 text-lg">
          This special website will automatically open on <br />
          <span className="font-bold text-white">May 31st at midnight</span> ✨
        </p>
      </Card>
    </div>
  );
};

export default LockedPage;
