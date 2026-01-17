// Roboto font embedding for jsPDF
// This module provides functions to register Roboto font with jsPDF

export async function registerRobotoFont(doc: import('jspdf').jsPDF): Promise<void> {
  // Fetch fonts from public directory
  const [regularResponse, boldResponse] = await Promise.all([
    fetch('/fonts/Roboto-Regular.ttf'),
    fetch('/fonts/Roboto-Bold.ttf')
  ]);

  const [regularBuffer, boldBuffer] = await Promise.all([
    regularResponse.arrayBuffer(),
    boldResponse.arrayBuffer()
  ]);

  // Convert to base64
  const regularBase64 = arrayBufferToBase64(regularBuffer);
  const boldBase64 = arrayBufferToBase64(boldBuffer);

  // Register fonts with jsPDF
  doc.addFileToVFS('Roboto-Regular.ttf', regularBase64);
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  
  doc.addFileToVFS('Roboto-Bold.ttf', boldBase64);
  doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
