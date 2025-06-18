document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('designForm');
  const input = document.getElementById('designText');
  const preview = document.getElementById('designPreview');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text) {
        preview.innerHTML = `<p>Your design idea: <strong>${text}</strong></p><p><em>AI design placeholder.</em></p>`;
      }
    });
  }
});
