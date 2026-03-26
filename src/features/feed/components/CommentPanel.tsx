import { useState } from 'react';
import { MessageCircle, X, ThumbsUp, CheckCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FeedItem } from '../types';

interface CommentPanelProps {
  item: FeedItem;
  onClose: () => void;
}

export function CommentPanel({ item, onClose }: CommentPanelProps) {
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    setSubmitted(true);
    setCommentText('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 340, damping: 36 }}
      className="fixed inset-x-0 bottom-0 z-[80] rounded-t-[32px] flex flex-col"
      style={{ background: 'rgba(18,49,41,0.98)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.07)', maxHeight: '75vh' }}
    >
      <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
        <div className="w-10 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
      </div>
      <div className="flex items-center justify-between px-5 pt-2 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageCircle size={14} style={{ color: '#B7FF1A' }} />
          <h3 className="text-[13px] font-black" style={{ color: '#F2EEDC' }}>
            {item.totalComments} commentaires
          </h3>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }} aria-label="Fermer">
          <X size={13} style={{ color: '#8A938C' }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {item.comments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <MessageCircle size={26} style={{ color: 'rgba(138,147,140,0.35)' }} />
            <p className="text-[12px] font-semibold text-center" style={{ color: '#8A938C' }}>Sois le premier à commenter</p>
          </div>
        )}
        {item.comments.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <img src={c.avatar} alt={`Avatar de ${c.author}`} className="w-7 h-7 rounded-full object-cover flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.08)' }} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black" style={{ color: '#F2EEDC' }}>{c.author}</span>
                <span className="text-[9px]" style={{ color: '#8A938C' }}>{c.time}</span>
              </div>
              <p className="text-[11px] leading-relaxed rounded-[12px] rounded-tl-none px-3 py-2" style={{ background: 'rgba(255,255,255,0.05)', color: '#D7DBC8' }}>{c.text}</p>
              <div className="flex items-center gap-1 mt-1.5 pl-1">
                <ThumbsUp size={9} style={{ color: '#8A938C' }} />
                <span className="text-[9px] font-bold" style={{ color: '#8A938C' }}>{c.likes}</span>
              </div>
            </div>
          </div>
        ))}
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-3 py-2 rounded-[12px]" style={{ background: 'rgba(183,255,26,0.08)', border: '1px solid rgba(183,255,26,0.15)' }}>
            <CheckCircle size={11} style={{ color: '#B7FF1A' }} />
            <span className="text-[11px] font-bold" style={{ color: '#B7FF1A' }}>Commentaire envoyé !</span>
          </motion.div>
        )}
      </div>

      <div className="px-4 pt-3 pb-5 flex items-center gap-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80" alt="Mon avatar" className="w-7 h-7 rounded-full object-cover flex-shrink-0" style={{ border: '1px solid rgba(183,255,26,0.25)' }} />
        <div className="flex-1 flex items-center gap-2 h-10 px-3 rounded-[18px]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <input type="text" placeholder="Ajouter un commentaire…" value={commentText} onChange={(e) => setCommentText(e.target.value)} className="flex-1 bg-transparent text-[11px] focus:outline-none" style={{ color: '#D7DBC8' }} />
          <motion.button onClick={handleSubmit} disabled={!commentText.trim()} aria-label="Envoyer" whileTap={{ scale: 0.9 }} style={{ opacity: commentText.trim() ? 1 : 0.3 }}>
            <Send size={13} style={{ color: '#B7FF1A' }} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
