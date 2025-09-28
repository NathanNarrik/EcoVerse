import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Leaf } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'cleanup' | 'volunteer' | 'workshop' | 'challenge';
  participants: number;
  maxParticipants?: number;
  points: number;
}

interface EventCardProps {
  event: Event;
  onJoin: (eventId: string) => void;
}

const eventTypeColors = {
  cleanup: 'bg-success',
  volunteer: 'bg-primary',
  workshop: 'bg-accent',
  challenge: 'bg-warning'
};

const eventTypeIcons = {
  cleanup: '🧹',
  volunteer: '🤝',
  workshop: '🎓',
  challenge: '🏆'
};

export const EventCard = ({ event, onJoin }: EventCardProps) => {
  const isFullyBooked = event.maxParticipants && event.participants >= event.maxParticipants;
  
  return (
    <Card className="p-4 hover:shadow-achievement transition-all duration-300 border-l-4 border-l-accent">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{eventTypeIcons[event.type]}</span>
          <Badge 
            variant="secondary" 
            className={`${eventTypeColors[event.type]} text-white text-xs`}
          >
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </div>
        <Badge variant="outline" className="text-accent font-semibold">
          +{event.points} pts
        </Badge>
      </div>
      
      <h3 className="font-semibold text-lg mb-2 text-card-foreground">{event.title}</h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={16} className="text-accent" />
          <span>{event.date} at {event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} className="text-accent" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users size={16} className="text-accent" />
          <span>
            {event.participants} joined
            {event.maxParticipants && ` / ${event.maxParticipants}`}
          </span>
        </div>
      </div>
      
      <Button 
        onClick={() => onJoin(event.id)}
        disabled={isFullyBooked}
        className="w-full bg-gradient-sundevil text-primary-foreground shadow-achievement disabled:opacity-50 disabled:cursor-not-allowed"
        size="sm"
      >
        <Leaf size={16} className="mr-2" />
        {isFullyBooked ? 'Event Full' : 'Join Event'}
      </Button>
    </Card>
  );
};