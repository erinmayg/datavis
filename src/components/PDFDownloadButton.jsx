import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ReactComponent as Download } from '../svg/download.svg';

const GenericPdfDownloader = ({ rootElementId }) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);

    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 4);
      const pdf = new jsPDF({
        orientation: 'l',
        unit: 'pt',
        format: [canvas.width, canvas.height + 120],
      });

      pdf.setFontSize(40);

      let txtWidth =
        (pdf.getStringUnitWidth('DFDR Analysis') * pdf.getFontSize()) /
        pdf.internal.scaleFactor;

      let xPosCenter = (canvas.width - txtWidth) / 2;

      pdf.text('DFDR Analysis', xPosCenter, 80);
      pdf.addImage(
        imgData,
        'PNG',
        0,
        120,
        canvas.width,
        canvas.height,
        'chart'
      );
      // pdf.html(input).then(() => pdf.save('download.pdf'));
      pdf.save('download.pdf');
    });
  };

  return (
    <div className='flex downloadButton' onClick={downloadPdfDocument}>
      <Download />
      Download PDF
    </div>
  );
};

export default GenericPdfDownloader;
