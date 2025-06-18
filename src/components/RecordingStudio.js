import React from 'react';

export default function RecordingStudio() {
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [chunks, setChunks] = React.useState([]);
  const [url, setUrl] = React.useState('');

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => setChunks((prev) => [...prev, e.data]);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setUrl(URL.createObjectURL(blob));
      setChunks([]);
    };
    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <div>
      <h2>Recording Studio</h2>
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
      {url && <audio controls src={url} />}
    </div>
  );
}
