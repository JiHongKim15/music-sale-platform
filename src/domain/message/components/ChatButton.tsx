import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { ChatModal } from './ChatModal';

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="채팅 열기"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}