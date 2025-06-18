import React from 'react';
import UploadForm from './UploadForm';

export default function StudentDashboard({ assignments, onUpload }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <div>
      <h2>Assignments</h2>
      <ul>
        {assignments.map(a => (
          <li key={a.id}>
            {a.title} - due {a.due}
            <button onClick={() => setSelected(a.id)}>Upload Recording</button>
          </li>
        ))}
      </ul>
      {selected && (
        <UploadForm assignmentId={selected} onUpload={(file) => {
          onUpload(selected, file);
          setSelected(null);
        }} />
      )}
    </div>
  );
}
