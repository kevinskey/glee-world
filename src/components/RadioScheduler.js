import React, { useEffect, useState } from 'react';
import './Radio.css';

const SLOT_OPTIONS = [5, 10, 15, 30, 60, 90, 120]; // minutes

const defaultTracks = [
  { id: 't1', title: 'Sample Track 1', src: '/sample1.mp3', image: '/episode1.jpg' },
  { id: 't2', title: 'Sample Track 2', src: '/sample2.mp3', image: '/episode2.jpg' },
];

export default function RadioScheduler({ tracks }) {
  const [trackList, setTrackList] = useState(tracks || defaultTracks);
  const [schedule, setSchedule] = useState([]); // {hour, track, duration}
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    async function loadFromSupabase() {
      if (!tracks && window.supabase) {
        const { data, error } = await window.supabase.storage
          .from('radio')
          .list('');
        if (!error && data) {
          setTrackList(
            data.map((file) => ({
              id: file.name,
              title: file.name,
              src: `${window.supabase.storageUrl}/radio/${file.name}`,
            }))
          );
        }
      }
    }
    loadFromSupabase();
  }, [tracks]);

  const handleDrop = (e, hour) => {
    e.preventDefault();
    const trackId = e.dataTransfer.getData('track');
    const duration = parseInt(e.dataTransfer.getData('duration'), 10);
    const track = trackList.find((t) => t.id === trackId);
    if (!track) return;
    setSchedule((prev) => [...prev, { hour, track, duration }]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const startBroadcast = (item) => {
    setCurrent(item);
  };

  const stopBroadcast = () => {
    setCurrent(null);
  };

  const insertNext = (item) => {
    if (!current) {
      startBroadcast(item);
      return;
    }
    const index = schedule.findIndex((s) => s === current);
    const newSchedule = [...schedule];
    newSchedule.splice(index + 1, 0, item);
    setSchedule(newSchedule);
  };

  return (
    <div className="radio-scheduler">
      <h2>Radio Scheduler</h2>
      <div className="current-track">
        {current ? (
          <span className="playing">Now playing: {current.track.title}</span>
        ) : (
          <span>No broadcast</span>
        )}
      </div>
      <div className="scheduler-controls">
        <button onClick={stopBroadcast}>Stop Broadcast</button>
        <button
          onClick={() => {
            const next = schedule[0];
            if (next) insertNext(next);
          }}
        >
          Insert Broadcast
        </button>
      </div>
      <div className="timeline">
        {Array.from({ length: 24 }).map((_, hour) => (
          <div
            key={hour}
            className="timeline-hour"
            onDrop={(e) => handleDrop(e, hour)}
            onDragOver={handleDragOver}
          >
            <div className="hour-label">{hour}:00</div>
            {schedule
              .filter((s) => s.hour === hour)
              .map((item) => (
                <div
                  key={item.track.id}
                  className="scheduled-item"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('track', item.track.id);
                    e.dataTransfer.setData('duration', item.duration.toString());
                  }}
                  onDoubleClick={() => startBroadcast(item)}
                >
                  {item.track.title} ({item.duration}m)
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="track-pool">
        <h3>Tracks</h3>
        {trackList.map((track) => (
          <div key={track.id} className="track-item">
            <span>{track.title}</span>
            <select
              onChange={(e) => (track.duration = parseInt(e.target.value, 10))}
              defaultValue={SLOT_OPTIONS[0]}
            >
              {SLOT_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m < 60 ? `${m}m` : `${Math.floor(m / 60)}h${m % 60 ? `:${m % 60}` : ''}`}
                </option>
              ))}
            </select>
            <div
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('track', track.id);
                e.dataTransfer.setData(
                  'duration',
                  (track.duration || SLOT_OPTIONS[0]).toString()
                );
              }}
              className="drag-handle"
            >
              Drag
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
