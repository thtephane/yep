import React, { useState } from 'react';
import { X, Video, Mic, MicOff, VideoOff, MessageSquare, Users, Share2, Hand, PhoneOff, Wifi } from 'lucide-react';
import { LectureSession } from '../../types';

interface VirtualSessionModalProps {
  session: LectureSession | null;
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const VirtualSessionModal: React.FC<VirtualSessionModalProps> = ({
  session,
  isOpen,
  onClose,
  userName,
}) => {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState<Array<{ user: string; text: string; time: string }>>([
    { user: 'Daniel K. (Mentor)', text: 'Welcome everyone from Uganda, Kenya, and Tanzania to our Virtual Exchange!', time: '2:01 PM' },
    { user: 'Sarah M.', text: 'Great to be here! Greetings from Jinja.', time: '2:02 PM' },
    { user: 'John K.', text: 'Connection is fast and clear.', time: '2:03 PM' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  if (!isOpen || !session) return null;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([...messages, { user: userName, text: inputMsg.trim(), time: 'Just now' }]);
    setInputMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl border border-slate-800 overflow-hidden text-white">
        {/* Top bar */}
        <div className="p-4 px-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <div>
              <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider">LIVE VIRTUAL EXCHANGE</div>
              <h3 className="text-sm sm:text-base font-bold text-white">{session.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">
              <Wifi className="w-3.5 h-3.5" />
              Low-Bandwidth Optimized (EAT)
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Stage & Chat */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Stage */}
          <div className="flex-1 p-4 flex flex-col justify-between relative bg-radial from-slate-800 to-slate-950">
            {/* Speaker Window */}
            <div className="flex-1 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center">
              {/* Speaker Video Mock */}
              <div className="text-center p-6 space-y-3">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-3xl font-extrabold text-white ring-4 ring-blue-500/30">
                  {session.mentorName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-base font-bold text-white">{session.mentorName} (Session Host)</div>
                  <div className="text-xs text-slate-400">Topic: {session.courseTopic}</div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Presenting Slides · Interactive Discussion
                </div>
              </div>

              {/* Bottom self PIP */}
              <div className="absolute bottom-4 right-4 w-32 sm:w-44 h-24 sm:h-32 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shadow-lg flex flex-col justify-between p-2">
                <span className="text-[10px] bg-black/60 px-1.5 py-0.5 rounded text-slate-300 self-start">You ({userName})</span>
                <div className="text-center text-xs font-bold text-slate-400">
                  {videoOn ? 'Camera Active' : 'Camera Off'}
                </div>
                <span className="text-[9px] text-slate-400 self-end">{micOn ? 'Mic On' : 'Muted'}</span>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="pt-4 flex items-center justify-center gap-2 sm:gap-4">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-3 rounded-full text-white transition-all ${
                  micOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-rose-600 hover:bg-rose-700'
                }`}
                title={micOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-3 rounded-full text-white transition-all ${
                  videoOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-rose-600 hover:bg-rose-700'
                }`}
                title={videoOn ? 'Turn Video Off' : 'Turn Video On'}
              >
                {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setHandRaised(!handRaised)}
                className={`p-3 rounded-full text-white transition-all ${
                  handRaised ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-700 hover:bg-slate-600'
                }`}
                title="Raise Hand"
              >
                <Hand className="w-5 h-5" />
              </button>

              <button
                onClick={() => setChatOpen(!chatOpen)}
                className={`p-3 rounded-full text-white transition-all ${
                  chatOpen ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-600'
                }`}
                title="Toggle Cohort Chat"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                onClick={onClose}
                className="p-3 px-5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 ml-2 cursor-pointer"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Leave Session</span>
              </button>
            </div>
          </div>

          {/* Side Live Chat Panel */}
          {chatOpen && (
            <div className="w-80 bg-slate-950 border-l border-slate-800 flex flex-col justify-between">
              <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
                <div className="text-xs font-bold text-slate-300 uppercase">Cohort Discussion</div>
                <span className="text-[11px] text-blue-400 font-medium">{session.registeredCount} online</span>
              </div>

              {/* Chat Feed */}
              <div className="p-3 flex-1 overflow-y-auto space-y-3 text-xs">
                {messages.map((m, i) => (
                  <div key={i} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                      <span className="font-bold text-blue-300">{m.user}</span>
                      <span>{m.time}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
