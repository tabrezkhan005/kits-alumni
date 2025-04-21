import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../types/supabase';

/**
 * Custom hook that provides the Supabase client and connection status
 * @returns An object containing the Supabase client and connection state
 */
export function useSupabase() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  // Check connection status on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // A simple query to check if connection works
        const { data, error } = await supabase.from('health_check').select('*').limit(1);

        if (error) {
          console.error('Supabase connection error:', error);
          setIsConnected(false);
          return;
        }

        setIsConnected(true);
      } catch (err) {
        console.error('Supabase connection check failed:', err);
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  return {
    supabase: supabase as SupabaseClient<Database>,
    isConnected
  };
}
