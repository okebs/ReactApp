import React from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';

function QRCodeScanner() {
  return (
    <div>
      <h1>QR Code Scanner</h1>
      <QrScanner
        onDecode={(result) => console.log(result)}
        onError={(error) => console.log(error?.message)}
      />
    </div>
  );
}

export default QRCodeScanner;
