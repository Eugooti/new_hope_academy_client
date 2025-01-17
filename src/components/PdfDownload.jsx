import jsPDF from "jspdf";
import "jspdf-autotable";

const mockPayrollData = [
    {
        employeeNo: 1001,
        fullName: "John Doe",
        bankDetails: {
            bankName: "First National Bank",
            accountType: "Checking",
            paymentMethod: "Bank Transfer",
        },
        basicSalary: 50000,
        allowances: [
            { type: "Housing", amount: 10000 },
            { type: "Transport", amount: 5000 },
        ],
        deductions: [
            { type: "Tax", amount: 5000 },
            { type: "Pension", amount: 2000 },
        ],
        grossPay: 65000,
        netPay: 58000,
    },
    {
        employeeNo: 1002,
        fullName: "Jane Smith",
        bankDetails: {
            bankName: "Central Bank",
            accountType: "Savings",
            paymentMethod: "Check",
        },
        basicSalary: 70000,
        allowances: [
            { type: "Medical", amount: 15000 },
            { type: "Transport", amount: 7000 },
        ],
        deductions: [
            { type: "Tax", amount: 8000 },
            { type: "Health Insurance", amount: 3000 },
        ],
        grossPay: 92000,
        netPay: 81000,
    },
];

const exportTableToPDF = (tableData) => {
    const doc = new jsPDF();

    doc.text("New Hope Academy.", 85, 10);
    doc.text("P.O BOX 62 - 40607 UKWALA.", 72, 16);
    doc.text("Employee Payrolls", 87, 22);

    // Create parent headers
    const parentColumns = [
        { header: "Full Name", dataKey: "fullName" },
        { header: "Bank Details", dataKey: "bankDetails" },
        { header: "Salary", dataKey: "salary" },
        { header: "Allowances", dataKey: "allowances" },
        { header: "Deductions", dataKey: "deductions" },
    ];

    // Add the table headers for the parent columns
    doc.autoTable({
        columns: parentColumns,
        body: tableData.map((item) => ({
            fullName: item.fullName,
            bankDetails: `${item.bankDetails.bankName}, ${item.bankDetails.accountType}, ${item.bankDetails.paymentMethod}`,
            salary: `Basic: ${item.basicSalary}, Gross: ${item.grossPay}, Net: ${item.netPay}`,
            allowances: item.allowances.map(allow => `${allow.type}: ${allow.amount}`).join(", "),
            deductions: item.deductions.map(deduct => `${deduct.type}: ${deduct.amount}`).join(", "),
        })),
        startY: 30,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("payroll_report.pdf");
};

const ExportButton = () => (
    <button className='bg-blue-900 h-10 w-auto rounded' onClick={() => exportTableToPDF(mockPayrollData)}>
        Download Payroll PDF
    </button>
);

export default ExportButton;
