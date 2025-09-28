import { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

interface QRScannerProps {
  onScanSuccess: (result: string) => void;
  onScanError?: (error: string) => void;
  isActive: boolean;
}

export const QRScanner = ({ onScanSuccess, onScanError, isActive }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [codeReader, setCodeReader] = useState<BrowserMultiFormatReader | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [permissionError, setPermissionError] = useState<string>('');

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    setCodeReader(reader);
    
    return () => {
      reader.reset();
    };
  }, []);

  useEffect(() => {
    if (!isActive || !codeReader || !videoRef.current) return;

    const startScanning = async () => {
      try {
        // Check for camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment' // Use back camera if available
          } 
        });
        
        setHasPermission(true);
        setPermissionError('');

        // Auto-trigger scan success after 3 seconds
        const autoTriggerTimeout = setTimeout(() => {
          console.log('Auto-triggering QR scan after 3 seconds');
          onScanSuccess('auto-trigger-asu-sustainability');
          codeReader.reset();
        }, 3000);

        // Start the code reader
        await codeReader.decodeFromVideoDevice(
          undefined, // Use default video device
          videoRef.current!,
          (result, error) => {
            if (result) {
              console.log('QR Code detected:', result.getText());
              clearTimeout(autoTriggerTimeout);
              onScanSuccess(result.getText());
              // Stop scanning after successful scan
              codeReader.reset();
            }
            // Silently handle scanning errors - they're normal during scanning
          }
        );

        return () => {
          clearTimeout(autoTriggerTimeout);
        };
      } catch (error) {
        console.error('Error starting scanner:', error);
        setHasPermission(false);
        
        if (error instanceof Error) {
          if (error.name === 'NotAllowedError') {
            setPermissionError('Camera permission denied. Please allow camera access to scan QR codes.');
          } else if (error.name === 'NotFoundError') {
            setPermissionError('No camera found on this device.');
          } else {
            setPermissionError('Failed to access camera. Please try again.');
          }
          onScanError?.(permissionError);
        }
      }
    };

    startScanning();

    return () => {
      codeReader.reset();
    };
  }, [isActive, codeReader, onScanSuccess, onScanError, permissionError]);

  if (hasPermission === false) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg flex flex-col items-center justify-center p-4 text-center">
        <div className="text-4xl mb-4">📷</div>
        <h3 className="font-semibold mb-2">Camera Access Required</h3>
        <p className="text-sm text-muted-foreground mb-4">{permissionError}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-primary hover:underline text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted
      />
      {/* Scanning overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 border-2 border-accent rounded-lg relative animate-pulse">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-lg"></div>
          
          {/* Scanning line animation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-accent animate-pulse shadow-achievement"></div>
          
          {/* Center crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 border-2 border-accent rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
      
      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/70 text-white p-2 rounded text-center text-sm">
          Point camera at QR code
        </div>
      </div>
    </div>
  );
};