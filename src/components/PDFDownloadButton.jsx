import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ReactComponent as Download } from '../svg/download.svg';

const GenericPdfDownloader = ({ rootElementId }) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'l',
        unit: 'pt',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('download.pdf');
    });
  };

  return (
    <div className='flex downloadButton'>
      <Download onClick={downloadPdfDocument} />
      Download PDF
    </div>
  );
};

export default GenericPdfDownloader;
