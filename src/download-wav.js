/* eslint-disable no-unused-vars */
function downloadWav(base64Data) {
  const data = base64Data.replace('data:audio/wav;base64,', '');

  const byteCharacters = atob(data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i += 1) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'audio/wav' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'morse-code-audio.wav';
  return [link, url];
}
