import jsPDF from "jspdf";

export const CreateAssessmentReport = (info,data) => {
    const doc = new jsPDF({
        orientation:'portrait',
        unit:'mm',
        format:'A4',
    });


    doc.text("NEW HOPE ACADEMY.", 80, 10);
    doc.text("P.O BOX 62 - 40607 UKWALA.", 72, 16);
    doc.text(`${info.name}.`, 92, 22);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.save(`${info.name} Report.pdf`);
}