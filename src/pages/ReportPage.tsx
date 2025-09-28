import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Send, Award } from 'lucide-react';

const actionOptions = [
  { id: 'bike', label: 'Biked to Campus', points: 10, emoji: '🚲' },
  { id: 'walk', label: 'Walked Instead of Driving', points: 8, emoji: '🚶' },
  { id: 'recycle', label: 'Used Recycling Bin', points: 5, emoji: '♻️' },
  { id: 'water', label: 'Used Reusable Water Bottle', points: 3, emoji: '💧' },
  { id: 'lights', label: 'Turned Off Unused Lights', points: 4, emoji: '💡' },
  { id: 'stairs', label: 'Took Stairs Instead of Elevator', points: 6, emoji: '🏃' },
  { id: 'carpool', label: 'Shared a Ride/Carpool', points: 12, emoji: '🚗' },
  { id: 'compost', label: 'Used Compost Bin', points: 7, emoji: '🌱' },
  { id: 'workshop', label: 'Attended Sustainability Workshop', points: 15, emoji: '📚' },
  { id: 'volunteer', label: 'Campus Clean-up Volunteer', points: 20, emoji: '🧹' },
];

export const ReportPage = () => {
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const addPoints = useAppStore(state => state.addPoints);

  const handleSubmit = () => {
    if (!selectedAction) return;
    
    setIsSubmitting(true);
    const action = actionOptions.find(a => a.id === selectedAction);
    
    setTimeout(() => {
      if (action) {
        addPoints(action.points, `${action.emoji} ${action.label}`);
      }
      setIsSubmitting(false);
      setSubmitted(true);
      setSelectedAction('');
      setDescription('');
      
      // Reset after showing success
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const selectedActionData = actionOptions.find(a => a.id === selectedAction);

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center pt-8">
        <h1 className="text-3xl font-bold mb-2">Report Action</h1>
        <p className="text-muted-foreground">
          Share your sustainable and safe actions to earn points!
        </p>
      </div>

      {submitted ? (
        /* Success State */
        <Card className="p-6 text-center bg-gradient-primary">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-primary-foreground mb-2">
            Action Reported!
          </h2>
          <p className="text-primary-foreground/80 mb-4">
            Thanks for making our campus more sustainable!
          </p>
          <Badge className="bg-white/20 text-primary-foreground border-white/30 text-lg px-4 py-2">
            Points Added Successfully!
          </Badge>
        </Card>
      ) : (
        /* Report Form */
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-primary" size={24} />
            <h2 className="text-xl font-semibold">Select Your Action</h2>
          </div>

          <div className="space-y-4">
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an eco-friendly or safety action..." />
              </SelectTrigger>
              <SelectContent>
                {actionOptions.map((action) => (
                  <SelectItem key={action.id} value={action.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{action.emoji} {action.label}</span>
                      <Badge variant="outline" className="ml-2">
                        +{action.points} pts
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedActionData && (
              <Card className="p-4 bg-primary/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedActionData.emoji}</span>
                    <span className="font-medium">{selectedActionData.label}</span>
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    +{selectedActionData.points} Points
                  </Badge>
                </div>
              </Card>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Additional Details (Optional)
              </label>
              <Textarea
                placeholder="Tell us more about your action..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!selectedAction || isSubmitting}
              className="w-full bg-gradient-primary text-primary-foreground"
              size="lg"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="mr-2" size={18} />
                  Submit Action
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Award size={20} />
          Popular Actions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {actionOptions.slice(0, 4).map((action) => (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              onClick={() => setSelectedAction(action.id)}
              className="text-left justify-start h-auto py-2"
            >
              <div>
                <div className="flex items-center gap-1">
                  <span>{action.emoji}</span>
                  <span className="text-xs truncate">{action.label}</span>
                </div>
                <div className="text-xs text-muted-foreground">+{action.points} pts</div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Daily Goal */}
      <Card className="p-4 bg-gradient-earth">
        <h3 className="font-semibold mb-2">🎯 Daily Goal</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Complete 3 eco-actions today to unlock bonus points!
        </p>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">2 of 3 actions completed</p>
      </Card>
    </div>
  );
};