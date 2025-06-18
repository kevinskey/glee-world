import React, { useState } from 'react';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import RecordingStudio from './components/RecordingStudio';
import Library from './components/Library';

export default function App() {
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Sing a Song', due: '2025-07-01' },
    { id: 2, title: 'Practice Scales', due: '2025-07-10' },
  ]);
  const handleLogin = (username) => setUser({ username });
  const handleUpload = (assignmentId, file) => {
    console.log('Uploading', file, 'for assignment', assignmentId);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <StudentDashboard assignments={assignments} onUpload={handleUpload} />
      <RecordingStudio />
      <Library />
    </div>
  );
}
