import React from 'react';

const resources = [
  { id: 1, title: 'Warm Up Tips', category: 'vocal' },
  { id: 2, title: 'Breathing Exercises', category: 'vocal' },
  { id: 3, title: 'Music Theory 101', category: 'theory' },
];

export default function Library() {
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? resources : resources.filter(r => r.category === filter);

  return (
    <div>
      <h2>Library</h2>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="vocal">Vocal</option>
        <option value="theory">Theory</option>
      </select>
      <ul>
        {filtered.map(r => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}
