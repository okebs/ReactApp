// import React from "react";
// import QRCode from "react-qr-code";

// function QRCodeGenerator() {
//   const qrCodeValue = "https://www.linkedin.com/in/samuel-okebiorunkosi/";

//   return (
//     <div>
//       <h1>QR Code Scanner</h1>

//       {/* QR Code with a light-colored container */}
//       <div style={{ background: 'white', padding: '16px' }}>
//         <QRCode value={qrCodeValue} />
//       </div>
//       {/* Responsive QR Code */}
//       <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
//         <QRCode
//           size={256}
//           style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//           value={qrCodeValue}
//           viewBox={`0 0 256 256`}
//         />
//       </div>
//     </div>
//   );
// }

// export default QRCodeGenerator;
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
