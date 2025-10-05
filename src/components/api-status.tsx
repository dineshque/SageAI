"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { digitalOceanAPI } from "@/lib/digitalocean-api";
import { Wifi, WifiOff } from "lucide-react";

export function APIStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    async function checkAPIHealth() {
      try {
        await digitalOceanAPI.healthCheck();
        setStatus('online');
      } catch (error) {
        console.warn("DigitalOcean API health check failed:", error);
        setStatus('offline');
      }
    }

    checkAPIHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkAPIHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  if (status === 'checking') {
    return (
      <Badge variant="outline" className="text-xs">
        <Wifi className="h-3 w-3 mr-1 animate-pulse" />
        Checking...
      </Badge>
    );
  }

  return (
    <Badge 
      variant={status === 'online' ? 'default' : 'destructive'} 
      className="text-xs"
    >
      {status === 'online' ? (
        <>
          <Wifi className="h-3 w-3 mr-1" />
          AI Online
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3 mr-1" />
          AI Offline
        </>
      )}
    </Badge>
  );
}