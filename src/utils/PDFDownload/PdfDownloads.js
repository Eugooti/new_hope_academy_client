import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const downloadPayroll = ()=>{
    const doc = new jsPDF()
    doc.text("New Hope Academy.", 85, 10);
    doc.text("P.O BOX 62 - 40607 UKWALA.", 72, 16);
    doc.text("Employee Payrolls.", 87, 22);

    const columns = [
        {header: "Full Name", field: "fullName" },
        {header: "Bank Name", field: "bankName" },
        {header: "Account Type", field: "accountType" },
        {header: "Account Number", field: "accountNumber" },
        {header: "Basic Salary", field: "basicSalary" },
        { header: "Allowances", dataKey: "allowances" },
        { header: "Gross Salary", dataKey: "grossSalary" },
        { header: "Deductions", dataKey: "deductions" },
        { header: "Net Salary", dataKey: "netSalary" },
    ]

    doc.autoTable({

    })

}

export const ClassroomPDF = async (classroomData) => {
    console.log(classroomData);

    const doc = new jsPDF();
    doc.text("New Hope Academy.", 85, 10);
    doc.text("P.O BOX 62 - 40607 UKWALA.", 72, 16);
    doc.text("Classroom details.", 87, 22);

    // Updated columns format: array of header strings
    const columns = ["No", "Classroom", "Class Teacher", "Boys", "Girls", "Total"];

    // Updated body format: array of arrays, mapping the values directly
    const body = classroomData.map((item, index) => [
        index + 1,              // No (incremented index)
        item.name,              // Classroom name
        item.classTeacher,      // Class teacher name
        item.male,              // Boys count
        item.female,            // Girls count
        item.total              // Total count
    ]);

    // Pass the columns and body to autoTable
    doc.autoTable({
        head: [columns],  // Corrected to use 'head'
        body: body,       // Body containing the mapped data
        startY: 30,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
    });

    await doc.save("Classrooms Details.pdf");
};
