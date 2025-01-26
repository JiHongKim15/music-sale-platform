import React from 'react';
import { InstrumentCard } from '@/domain/instrument/components/InstrumentCard';
import { Instrument } from '@/types';

interface InstrumentGridProps {
  instruments: Instrument[];
  onInstrumentClick: (instrument: Instrument) => void;
  onFavoriteClick: (id: string) => void;
  favoriteInstruments: string[];
}

export function InstrumentGrid({ 
  instruments, 
  onInstrumentClick, 
  onFavoriteClick,
  favoriteInstruments 
}: InstrumentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {instruments.map((instrument) => (
        <InstrumentCard
          key={instrument.id}
          instrument={instrument}
          onClick={() => onInstrumentClick(instrument)}
          onFavoriteClick={onFavoriteClick}
          isFavorite={favoriteInstruments.includes(instrument.id)}
        />
      ))}
    </div>
  );
}