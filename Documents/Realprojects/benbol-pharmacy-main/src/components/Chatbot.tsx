import { MessageCircle, X, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChatMessage } from '../types';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      message:
        "Hello! I'm the Benbol Pharmacy assistant. How can I help you today? You can ask about our services, hours, or any general questions.",
      sender: 'bot',
      session_id: '',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('time')) {
      return 'We are open Monday-Saturday from 8:00 AM to 8:00 PM, and Sunday from 9:00 AM to 5:00 PM.';
    }

    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where')) {
      return "You can find us at Vickie's Plaza, Lekki-Epe Expressway, Opposite Crown Estate, Sangotedo, Lagos State. Feel free to call us at 09167858304 for directions.";
    }

    if (lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('contact')) {
      return 'You can reach us at 09167858304 during business hours. We are always happy to help!';
    }

    if (lowerMessage.includes('service')) {
      return 'We offer Prescription Medications, OTC Products, Vitamins & Supplements, Walking Aids, Pharmaceutical Counselling, and Skin Care products. What would you like to know more about?';
    }

    if (
      lowerMessage.includes('prescription') ||
      lowerMessage.includes('refill') ||
      lowerMessage.includes('medication')
    ) {
      return 'We can help with prescription refills! You can submit a refill request online through our website, call us at 09167858304, or visit us in person. Most prescriptions are ready within 15-30 minutes.';
    }

    if (lowerMessage.includes('insurance')) {
      return 'Yes, we accept most major insurance plans. Please bring your insurance card with you, and we will verify your coverage and process your claims.';
    }

    if (lowerMessage.includes('delivery')) {
      return 'We offer home delivery services within our service area. Please contact us at 09167858304 to arrange delivery for your medications and health products.';
    }

    if (lowerMessage.includes('appointment') || lowerMessage.includes('consultation') || lowerMessage.includes('counselling')) {
      return 'You can book a consultation with our pharmacists through our online booking form or by calling 09167858304. We offer pharmaceutical counselling, medication reviews, and health consultations.';
    }

    if (lowerMessage.includes('vitamin') || lowerMessage.includes('supplement')) {
      return 'We carry a wide range of vitamins and supplements including multivitamins, specialty supplements, herbal remedies, and sports nutrition. Our pharmacists can help you choose the right supplements for your needs.';
    }

    if (lowerMessage.includes('skincare') || lowerMessage.includes('skin')) {
      return 'We offer medical-grade skincare products including anti-aging solutions, acne treatments, moisturizers, and sun protection. Our staff can provide personalized skincare recommendations.';
    }

    if (lowerMessage.includes('walking aid') || lowerMessage.includes('mobility') || lowerMessage.includes('wheelchair')) {
      return 'We stock various mobility aids including canes, crutches, walkers, rollators, and wheelchairs. We provide professional fitting and consultation to ensure you get the right equipment.';
    }

    if (
      lowerMessage.includes('thank') ||
      lowerMessage.includes('thanks') ||
      lowerMessage.includes('appreciate')
    ) {
      return "You're welcome! Is there anything else I can help you with today?";
    }

    if (
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hey') ||
      lowerMessage.includes('good morning') ||
      lowerMessage.includes('good afternoon')
    ) {
      return 'Hello! How can I assist you today?';
    }

    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return 'Thank you for contacting Benbol Pharmacy! Have a great day!';
    }

    return "I'm here to help! You can ask me about our services, operating hours, prescription refills, or any other questions. For specific inquiries, feel free to call us at 09167858304.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      message: inputMessage,
      sender: 'user',
      session_id: sessionId,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    try {
      await supabase.from('chat_messages').insert([userMessage]);
    } catch (error) {
      console.error('Error saving user message:', error);
    }

    setTimeout(async () => {
      const botResponse: ChatMessage = {
        message: getBotResponse(inputMessage),
        sender: 'bot',
        session_id: sessionId,
      };

      setMessages((prev) => [...prev, botResponse]);

      try {
        await supabase.from('chat_messages').insert([botResponse]);
      } catch (error) {
        console.error('Error saving bot message:', error);
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-2xl hover:bg-teal-700 transition-all hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-gray-200">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <MessageCircle className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold">Benbol Pharmacy</h3>
                <p className="text-xs text-teal-100">Here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
