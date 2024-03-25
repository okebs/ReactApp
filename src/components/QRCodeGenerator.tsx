import React from "react";
import QRCode from "react-qr-code";

type QRCodeGeneratorProps = {
  link: string;
};

function QRCodeGenerator({ link }: QRCodeGeneratorProps) {
  return (
    <div style={{ background: 'white', padding: '16px' }}>
      <QRCode value={link} />
    </div>
  );
}

export default QRCodeGenerator;
