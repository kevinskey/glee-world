import React, { useState } from 'react';

export default function UploadForm({ assignmentId, onUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Upload for Assignment {assignmentId}</h3>
      <input type="file" accept="application/pdf,audio/*" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}
