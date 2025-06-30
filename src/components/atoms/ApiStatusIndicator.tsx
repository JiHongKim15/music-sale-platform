import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { ProductApiAdapter } from '@/domains/instrument/services/productApiAdapter';

interface ApiStatusIndicatorProps {
  className?: string;
}

export const ApiStatusIndicator: React.FC<ApiStatusIndicatorProps> = ({ className }) => {
  const [apiStatus, setApiStatus] = useState<{
    useMockApi: boolean;
    healthChecked: boolean;
  } | null>(null);

  useEffect(() => {
    // API 상태 확인
    const checkStatus = () => {
      const status = ProductApiAdapter.getApiStatus();
      setApiStatus(status);
    };

    checkStatus();
    
    // 5초마다 상태 체크
    const interval = setInterval(checkStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (!apiStatus) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge 
        variant={apiStatus.useMockApi ? "secondary" : "default"}
        className={`text-xs ${
          apiStatus.useMockApi 
            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
            : 'bg-green-100 text-green-800 hover:bg-green-200'
        }`}
      >
        {apiStatus.useMockApi ? '🎭 Mock API' : '🌐 실제 API'}
      </Badge>
      
      {!apiStatus.healthChecked && (
        <Badge variant="outline" className="text-xs text-gray-500">
          연결 확인 중...
        </Badge>
      )}
    </div>
  );
}; 