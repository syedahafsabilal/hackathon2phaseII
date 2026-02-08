'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth-context';

export const UserGreeting = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = currentTime.getHours();
      if (hour < 12) {
        setGreeting('Good morning');
      } else if (hour < 17) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    };

    updateGreeting();

    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [currentTime]);

  if (!user) {
    return null; // Don't show greeting if user is not authenticated
  }

  return (
    <div className="text-right text-white">
      <p className="text-sm text-white">{greeting},</p>
      <p className="font-medium text-white">{user.name}</p>
    </div>
  );
};