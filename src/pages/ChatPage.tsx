import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Lightbulb, Shield, Recycle } from 'lucide-react';
import { MascotCactus } from '@/components/MascotCactus';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  'eco tip': '🌱 Here\'s today\'s eco tip: Try using a reusable water bottle! Campus has 15 refill stations that provide filtered water. You\'ll save money and reduce plastic waste!',
  'safety': '⚠️ Safety reminder: With temperatures reaching 110°F today, make sure to stay hydrated, wear sunscreen, and take breaks in shaded areas. Heat exhaustion is serious!',
  'recycle': '♻️ Great question about recycling! You can recycle paper, plastic bottles, cans, and cardboard in the blue bins around campus. Pizza boxes go in compost if clean!',
  'bike': '🚲 Biking is awesome! Campus has secure bike racks near every building. Remember to wear a helmet and use the bike lanes. You can earn extra points for biking!',
  'energy': '💡 To save energy: unplug devices when not in use, use natural light during the day, and turn off lights when leaving rooms. Every little bit helps!',
  'water': '💧 Water conservation tips: Take shorter showers, report leaky faucets to maintenance, and use full loads when doing laundry. Our campus aims to reduce water usage by 20%!',
  'transport': '🚌 Sustainable transport options: bike, walk, use the campus shuttle, or carpool with friends. The shuttle runs every 15 minutes during peak hours!',
  'waste': '🗑️ Reduce waste by: using reusable containers, buying only what you need, and participating in the campus swap shop for textbooks and supplies!',
};

export const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I\'m your EcoSafe assistant! 🌵 Ask me about sustainability tips, safety reminders, or campus eco-initiatives. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in predefined responses
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Default responses based on common patterns
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return '👋 Hello! I\'m here to help with all things eco-friendly and safe on campus. What would you like to know?';
    }
    
    if (lowerMessage.includes('points') || lowerMessage.includes('earn')) {
      return '🎯 You can earn points by: scanning QR codes at eco-stations, reporting sustainable actions, biking to class, using reusable items, and attending workshops!';
    }
    
    if (lowerMessage.includes('help')) {
      return '🤝 I can help with eco tips, safety reminders, recycling info, sustainable transport, energy saving, and water conservation. Just ask!';
    }
    
    // Generic helpful response
    return '🌵 That\'s a great question! While I\'m still learning, I\'d suggest checking with campus sustainability office or visiting the eco-resource center for detailed info. Is there anything else I can help with?';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
  };

  return (
    <div className="min-h-screen p-4 space-y-4">
      {/* Header */}
      <div className="text-center pt-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MascotCactus size="sm" mood="happy" />
          <h1 className="text-3xl font-bold">EcoSafe Assistant</h1>
        </div>
        <p className="text-muted-foreground">
          Your friendly guide to sustainable campus living
        </p>
      </div>

      {/* Chat Messages */}
      <Card className="p-4 max-h-96 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'bot' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground'
            }`}>
              {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'text-right' : ''}`}>
              <div className={`p-3 rounded-lg ${
                message.sender === 'bot'
                  ? 'bg-muted text-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}>
                <p className="text-sm">{message.text}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Quick Questions</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { text: 'eco tip', icon: Lightbulb },
            { text: 'safety', icon: Shield },
            { text: 'recycle', icon: Recycle },
            { text: 'bike', icon: '🚲' },
          ].map((action) => (
            <Button
              key={action.text}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.text)}
              className="justify-start gap-2"
            >
              {typeof action.icon === 'string' ? (
                <span>{action.icon}</span>
              ) : (
                <action.icon size={16} />
              )}
              {action.text}
            </Button>
          ))}
        </div>
      </Card>

      {/* Input */}
      <Card className="p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about eco tips, safety, or campus sustainability..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-primary text-primary-foreground"
          >
            <Send size={18} />
          </Button>
        </div>
      </Card>

      {/* Status */}
      <div className="text-center">
        <Badge variant="outline" className="text-xs">
          💚 Powered by campus sustainability team
        </Badge>
      </div>
    </div>
  );
};