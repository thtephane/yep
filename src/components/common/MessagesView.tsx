import React, { useState } from 'react';
import { Search, Paperclip, Send, Smile, Phone, Video } from 'lucide-react';
import { Conversation, ChatMessage, User } from '../../types';

interface MessagesViewProps {
  currentUser: User;
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string) => void;
  onLaunchVirtualRoom?: (title: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  currentUser,
  conversations,
  onSendMessage,
  onLaunchVirtualRoom,
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const getSubheader = () => {
    switch (currentUser.role) {
      case 'student':
        return 'Stay connected with your mentor, team, and learning community.';
      case 'mentor':
        return 'Stay connected with your students.';
      case 'admin':
        return 'Coordinate with mentors, program teams, and support staff.';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">Messages</h1>
        <p className="text-sm text-slate-500 mt-1">{getSubheader()}</p>
      </div>

      {/* Main Chat Layout matching wireframe */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[580px] max-h-[680px]">
        {/* Left: Conversations list */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white">
          {/* Search bar */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConv?.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`w-full p-4 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-full bg-linear-to-tr from-blue-200 to-blue-300 text-blue-900 flex items-center justify-center font-bold text-xs shadow-xs">
                      {conv.avatarText}
                    </div>
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 truncate">{conv.name}</span>
                      <span className="text-[10px] text-slate-400">{conv.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Area */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-slate-50/30">
            {/* Header */}
            <div className="p-4 px-6 border-b border-slate-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-200 to-blue-300 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {activeConv.avatarText}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{activeConv.name}</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{activeConv.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>

              {onLaunchVirtualRoom && (
                <button
                  onClick={() => onLaunchVirtualRoom(`Virtual sync with ${activeConv.name}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Quick Video Sync</span>
                </button>
              )}
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {activeConv.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md sm:max-w-lg p-3.5 px-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.isSelf
                        ? 'bg-[#DCEBFE] text-slate-900 rounded-tr-xs'
                        : 'bg-[#F1F5F9] text-slate-800 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Input Bar matching screenshot */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
              <button
                type="button"
                onClick={() => alert('Select file to upload (Project artifact, image, survey docx).')}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-full bg-[#152B42] hover:bg-[#0E1F30] disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-xs"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};
