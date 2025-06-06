
import React, { useState, useEffect } from 'react';
import BirthdayWebsite from './BirthdayWebsite';
import LockedPage from './LockedPage';

const BirthdayCheck = () => {
  const [isBirthdayActive, setIsBirthdayActive] = useState(false);
  const [timeUntilNextBirthday, setTimeUntilNextBirthday] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const checkBirthdayStatus = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // May 31st of current year
      const birthdayStart = new Date(currentYear, 4, 31, 0, 0, 0); // May is month 4 (0-indexed)
      const birthdayEnd = new Date(currentYear, 4, 31, 23, 59, 59);
      
      // If we're past this year's birthday, check next year
      const nextBirthday = now > birthdayEnd 
        ? new Date(currentYear + 1, 4, 31, 0, 0, 0)
        : birthdayStart;

      const isActive = now >= birthdayStart && now <= birthdayEnd;
      setIsBirthdayActive(isActive);

      // Calculate time until next birthday
      if (!isActive) {
        const timeDiff = nextBirthday.getTime() - now.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeUntilNextBirthday({ days, hours, minutes, seconds });
      }
    };

    checkBirthdayStatus();
    const interval = setInterval(checkBirthdayStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {isBirthdayActive ? (
        <BirthdayWebsite />
      ) : (
        <LockedPage timeUntilBirthday={timeUntilNextBirthday} />
      )}
    </div>
  );
};

export default BirthdayCheck;
