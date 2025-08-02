import React, { useRef, useState } from 'react';
import './Radio.css';

// Simple header radio player with play/stop toggle
export default function RadioPlayer({ stream = '/sample.mp3', episodeImage }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="radio-header">
      <button onClick={toggle} aria-label={playing ? 'Stop radio' : 'Play radio'}>
        {playing ? '⏸' : '▶️'}
      </button>
      {playing && <span className="radio-icon">📻</span>}
      {playing && episodeImage && (
        <img src={episodeImage} alt="episode" className="radio-episode-thumb" />
      )}
      <audio ref={audioRef} src={stream} preload="none" />
    </div>
  );
}
