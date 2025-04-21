'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '../lib/hooks/useSupabase';
import { getCurrentUser } from '../lib/auth';
import type { User } from '@supabase/supabase-js';

/**
 * Component that displays the status of the Supabase connection
 * and the current user if authenticated
 */
export default function SupabaseStatus() {
  const { isConnected } = useSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch the current user when the component mounts
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  /**
   * Handle the click event on connection status indicator
   */
  const handleClick = () => {
    console.log('Connection status clicked');
  };

  /**
   * Handle keydown event for accessibility
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  // Show loading state while checking connection
  if (isConnected === null || isLoading) {
    return (
      <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-md">
        <div className="animate-pulse h-3 w-3 rounded-full bg-gray-400"></div>
        <span className="text-sm font-medium text-gray-600">Checking connection...</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <div
        className="flex items-center gap-2 mb-4 cursor-pointer"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Supabase connection status"
      >
        <div
          className={`h-3 w-3 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></div>
        <span className="text-sm font-medium">
          {isConnected ? 'Connected to Supabase' : 'Disconnected from Supabase'}
        </span>
      </div>

      {user ? (
        <div className="mt-2">
          <p className="text-sm font-medium">Logged in as:</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-600">Not authenticated</p>
      )}
    </div>
  );
}
