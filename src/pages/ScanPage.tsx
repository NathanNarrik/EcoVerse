import { useState, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { QRScanner } from '@/components/QRScanner';
import { EventCard } from '@/components/EventCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, QrCode, CheckCircle, RotateCcw, X, Calendar, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ScanPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<Array<{id: string, text: string, points: number, timestamp: Date}>>([]);
  const addPoints = useAppStore(state => state.addPoints);
  const { toast } = useToast();

  // Upcoming ASU sustainability events
  const upcomingEvents = [
    {
      id: '1',
      title: 'Campus Clean-Up Day',
      date: 'Oct 15, 2024',
      time: '9:00 AM',
      location: 'ASU Tempe Campus Quad',
      description: 'Join fellow Sun Devils in keeping our campus beautiful and sustainable. Gloves and supplies provided!',
      type: 'cleanup' as const,
      participants: 47,
      maxParticipants: 100,
      points: 25
    },
    {
      id: '2', 
      title: 'Solar Panel Workshop',
      date: 'Oct 18, 2024',
      time: '2:00 PM',
      location: 'Sustainability Office',
      description: 'Learn about ASU\'s renewable energy initiatives and how you can get involved in solar projects.',
      type: 'workshop' as const,
      participants: 23,
      maxParticipants: 30,
      points: 15
    },
    {
      id: '3',
      title: 'Zero Waste Challenge',
      date: 'Oct 20, 2024',
      time: 'All Day',
      location: 'Campus Wide',
      description: '24-hour campus-wide challenge to reduce waste. Track your progress and compete with other dorms!',
      type: 'challenge' as const,
      participants: 156,
      points: 30
    },
    {
      id: '4',
      title: 'Community Garden Volunteer',
      date: 'Oct 22, 2024',
      time: '4:00 PM',
      location: 'ASU Polytechnic Campus',
      description: 'Help maintain our sustainable food gardens and learn about urban agriculture.',
      type: 'volunteer' as const,
      participants: 18,
      maxParticipants: 25,
      points: 20
    }
  ];

  // ASU eco-stations around campus
  const asuEcoStations = {
    'water-station': { type: 'Hydration Station', points: 5, message: 'ASU Hydration Station scanned! Stay hydrated, Sun Devil! 💧' },
    'recycling-bin': { type: 'Recycling Station', points: 3, message: 'ASU Recycling found! Zero Waste initiative! ♻️' },
    'bike-rack': { type: 'Sun Devil Bike Rack', points: 8, message: 'ASU bike parking scanned! Go green, Sun Devils! 🚲' },
    'solar-panel': { type: 'ASU Solar Panel', points: 10, message: 'ASU solar power! Leading in sustainability! ☀️' },
    'compost-bin': { type: 'Compost Station', points: 7, message: 'ASU compost bin! Reducing food waste! 🌱' },
    'light-rail': { type: 'Light Rail Stop', points: 12, message: 'Valley Metro at ASU! Public transit rocks! 🚊' },
    'electric-bus': { type: 'Electric Shuttle', points: 10, message: 'ASU electric shuttle! Clean campus transport! ⚡' },
    'sustainability': { type: 'Sustainability Office', points: 15, message: 'ASU Sustainability Office! Leading by example! 🏢' },
  };

  const handleScanSuccess = useCallback((qrData: string) => {
    console.log('QR Code scanned:', qrData);
    
    // Try to match QR code data to ASU eco stations
    let stationFound = null;
    
    // Check if QR data contains any ASU eco station identifiers
    for (const [key, station] of Object.entries(asuEcoStations)) {
      if (qrData.toLowerCase().includes(key) || qrData.toLowerCase().includes(station.type.toLowerCase())) {
        stationFound = station;
        break;
      }
    }
    
    // Give points for ANY QR code scan (demo purposes)
    if (!stationFound) {
      const randomPoints = Math.floor(Math.random() * 8) + 3; // 3-10 points
      stationFound = { 
        type: 'ASU Campus Discovery', 
        points: randomPoints, 
        message: `QR code scanned at ASU! Keep exploring, Sun Devil! 🔥 +${randomPoints} pts` 
      };
    }
    
    // Add to history
    const historyItem = {
      id: Date.now().toString(),
      text: `${stationFound.type} - ${new Date().toLocaleTimeString()}`,
      points: stationFound.points,
      timestamp: new Date()
    };
    
    setScanHistory(prev => [historyItem, ...prev.slice(0, 4)]); // Keep last 5 scans
    setScanResult(stationFound.message);
    addPoints(stationFound.points, stationFound.message);
    setIsScanning(false);
  }, [addPoints]);

  const handleScanError = useCallback((error: string) => {
    console.error('Scan error:', error);
    setIsScanning(false);
  }, []);

  const startScanning = () => {
    setIsScanning(true);
    setScanResult(null);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const resetScan = () => {
    setScanResult(null);
  };

  const handleJoinEvent = (eventId: string) => {
    const event = upcomingEvents.find(e => e.id === eventId);
    if (event) {
      addPoints(event.points, `Joined ${event.title}!`);
      toast({
        title: "Event Joined! 🎉",
        description: `You've successfully joined "${event.title}" and earned ${event.points} points!`,
      });
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6 bg-gradient-to-b from-background to-muted/20">
      {/* Enhanced Header */}
      <div className="text-center pt-8 pb-4">
        <div className="inline-flex items-center gap-3 mb-4 p-3 bg-gradient-sundevil rounded-full shadow-achievement">
          <span className="text-3xl animate-float">🔥</span>
          <h1 className="text-2xl font-bold text-primary-foreground">ASU EcoScan</h1>
          <span className="text-3xl animate-float">🔱</span>
        </div>
        <p className="text-lg text-muted-foreground mb-2">
          Scan QR codes around ASU campus to earn sustainability points!
        </p>
        <div className="flex items-center justify-center gap-2">
          <Sparkles size={20} className="text-accent animate-pulse" />
          <span className="text-sm font-medium text-accent">Innovation • Innovation • Innovation</span>
          <Sparkles size={20} className="text-accent animate-pulse" />
        </div>
      </div>

      {/* Scanner Card */}
      <Card className="p-6 shadow-achievement border-accent/20 bg-gradient-to-br from-card to-muted/10">
        {!scanResult ? (
          <>
            {!isScanning ? (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-gradient-accent rounded-2xl flex items-center justify-center shadow-achievement animate-float">
                  <QrCode size={56} className="text-primary animate-pulse" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-2 bg-gradient-sundevil bg-clip-text text-transparent">Ready to Scan ASU</h2>
                  <p className="text-muted-foreground mb-4 text-base">
                    Point your camera at ANY QR code around ASU to earn sustainability points!
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-success font-medium">Auto-scan in 3 seconds!</span>
                  </div>
                </div>

                <Button 
                  onClick={startScanning} 
                  className="w-full bg-gradient-sundevil text-primary-foreground shadow-achievement hover:shadow-alert transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  <Camera className="mr-2" size={20} />
                  Start ASU Scanner
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-primary">Scanning for QR Codes</h2>
                    <p className="text-sm text-muted-foreground">Auto-scan activates in 3 seconds</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={stopScanning} className="border-destructive/20 text-destructive hover:bg-destructive/10">
                    <X size={16} className="mr-1" />
                    Stop
                  </Button>
                </div>
                
                <QRScanner 
                  onScanSuccess={handleScanSuccess}
                  onScanError={handleScanError}
                  isActive={isScanning}
                />
                
                <div className="text-center bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm text-primary font-medium">
                    🎯 Hold your device steady and point at a QR code
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Or wait 3 seconds for automatic Sun Devil points!
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-success/20 rounded-full animate-cheer">
              <div className="text-4xl animate-bounce">🎉</div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-success mb-2">Sun Devil Success!</h2>
              <p className="text-muted-foreground text-base">{scanResult}</p>
            </div>
            <div className="bg-gradient-accent p-4 rounded-lg shadow-achievement">
              <Badge variant="default" className="bg-success text-success-foreground text-lg px-6 py-3 shadow-lg">
                <Sparkles size={18} className="mr-2" />
                Points Earned! 🔥
              </Badge>
            </div>
            <div className="flex gap-3">
              <Button onClick={resetScan} variant="outline" className="flex-1 border-primary/30 text-primary hover:bg-primary/10">
                <RotateCcw size={16} className="mr-2" />
                Scan Another
              </Button>
              <Button onClick={startScanning} className="flex-1 bg-gradient-sundevil text-primary-foreground shadow-achievement hover:shadow-alert transition-all duration-300">
                <Camera size={16} className="mr-2" />
                New Scan
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Sustainability Events */}
      <Card className="p-6 shadow-achievement bg-gradient-to-br from-card to-accent/5 border-accent/30">
        <div className="flex items-center gap-3 mb-6">
          <Calendar size={24} className="text-accent" />
          <h2 className="text-2xl font-bold text-primary">Upcoming Events</h2>
          <Badge variant="secondary" className="bg-success text-success-foreground">
            Earn More Points!
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} onJoin={handleJoinEvent} />
          ))}
        </div>
      </Card>

      {/* Scan History */}
      <Card className="p-4 shadow-soft">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <CheckCircle size={20} className="text-success" />
          Recent Scans
        </h3>
        <div className="space-y-2">
          {scanHistory.length > 0 ? (
            scanHistory.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-3 px-4 bg-muted/50 rounded-lg border border-border/50">
                <span className="text-sm font-medium">{item.text}</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">+{item.points} pts</Badge>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
              <QrCode size={32} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No scans yet. Start scanning to see your history!
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Instructions & Tips */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <Card className="p-6 bg-gradient-earth shadow-soft border-accent/20">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
            <span className="text-2xl">🔥</span>
            ASU Scanning Tips
          </h3>
          <ul className="text-sm space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-accent">💧</span>
              <span>Find QR codes on ASU hydration stations around campus</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">♻️</span>
              <span>Scan recycling bins to support ASU's Zero Waste goals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">🚲</span>
              <span>Check Sun Devil bike racks for sustainable transport</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">☀️</span>
              <span>Discover solar panels powering ASU facilities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">🚊</span>
              <span>Scan Light Rail stops and electric shuttles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">✨</span>
              <span className="font-medium text-primary">ANY QR code earns you points for exploring ASU sustainably!</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/10 border-primary/30 shadow-achievement">
          <h3 className="font-bold mb-3 text-primary flex items-center gap-2 text-lg">
            <span className="text-2xl">🔱</span>
            Demo the Scanner
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            No QR code handy? The scanner auto-awards points after 3 seconds, or generate one online to test instantly!
          </p>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open('https://www.qr-code-generator.com/', '_blank')}
              className="w-full border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
            >
              Generate Demo QR Code
            </Button>
            <div className="text-center">
              <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                ⏱️ Auto-scan feature enabled!
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};