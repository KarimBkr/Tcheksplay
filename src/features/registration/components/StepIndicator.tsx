import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { Step } from '../types';
import { STEPS } from '../types';
import { THEME } from '@/shared/lib/constants';

interface StepIndicatorProps {
  current: Step;
}

export function StepIndicator({ current }: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);

  return (
    <div className="flex items-center justify-center gap-0 px-5 mb-6">
      {STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={
                  done
                    ? { background: THEME.accent }
                    : active
                      ? { background: `${THEME.accent}15`, border: `2px solid ${THEME.accent}` }
                      : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }
                }
              >
                {done ? (
                  <CheckCircle size={14} style={{ color: THEME.bg }} />
                ) : (
                  <span className="text-[10px] font-black" style={{ color: active ? THEME.accent : THEME.muted }}>
                    {step.short}
                  </span>
                )}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-[2px] mx-1"
                style={{ background: i < currentIndex ? THEME.accent : 'rgba(255,255,255,0.07)', maxWidth: 24 }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
