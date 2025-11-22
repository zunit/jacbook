import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current screen size is mobile/phone
 * @param breakpoint - The width breakpoint in pixels (default: 768px)
 * @returns boolean indicating if the screen is mobile size
 */
export function useMobileDetection(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

