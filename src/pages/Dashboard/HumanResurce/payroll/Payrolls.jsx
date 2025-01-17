import Heading from "../../../../components/heading/Heading.jsx";
import { Table } from "antd";
import { createStyles } from 'antd-style';
import ExportButton from "../../../../components/PdfDownload.jsx";

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
        customTable: css`
            ${antCls}-table {
                ${antCls}-table-container {
                    ${antCls}-table-body,
                    ${antCls}-table-content {
                        scrollbar-width: thin;
                        scrollbar-color: unset;
                    }
                }
            }
        `,
    };
});

const mockPayrollData = [
    {
        employeeNo: 1001,
        fullName: "John Doe",
        bankDetails: {
            bankName: "First National Bank",
            accountNumber: "1234567890",
            accountType: "Checking",
            paymentMethod: "Bank Transfer",
        },
        basicSalary: 50000,
        allowances: [
            { type: "Housing", amount: 10000 },
            { type: "Transport", amount: 5000 }
        ],
        deductions: [
            { type: "Tax", amount: 5000 },
            { type: "Pension", amount: 2000 }
        ],
        grossPay: 65000,
        netPay: 58000,
        createdAt: new Date("2023-09-01"),
        createdBy: 101,
        updatedBy: 102
    },
    {
        employeeNo: 1002,
        fullName: "Jane Smith",
        bankDetails: {
            bankName: "Central Bank",
            accountNumber: "9876543210",
            accountType: "Savings",
            paymentMethod: "Check",
        },
        basicSalary: 70000,
        allowances: [
            { type: "Medical", amount: 15000 },
            { type: "Transport", amount: 7000 }
        ],
        deductions: [
            { type: "Tax", amount: 8000 },
            { type: "Health Insurance", amount: 3000 }
        ],
        grossPay: 92000,
        netPay: 81000,
        createdAt: new Date("2023-09-10"),
        createdBy: 103,
        updatedBy: 104
    },
    {
        employeeNo: 1003,
        fullName: "Michael Johnson",
        bankDetails: {
            bankName: "City Bank",
            accountNumber: "5555666777",
            accountType: "Checking",
            paymentMethod: "Cash",
        },
        basicSalary: 45000,
        allowances: [
            { type: "Transport", amount: 3000 },
            { type: "Meal", amount: 2000 }
        ],
        deductions: [
            { type: "Tax", amount: 3000 },
            { type: "Pension", amount: 1500 }
        ],
        grossPay: 50000,
        netPay: 45500,
        createdAt: new Date("2023-09-15"),
        createdBy: 105,
        updatedBy: 106
    }
];

function Payrolls() {

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            width: 150,
            fixed: 'left',
        },
        {
            title: 'Bank Details',
            children: [
                {
                    title: 'Bank Name',
                    dataIndex: 'bankDetails',
                    render: (_, record) => record.bankDetails.bankName,
                    width: 150,
                },
                {
                    title: 'Account Type',
                    dataIndex: 'bankDetails',
                    render: (_, record) => record.bankDetails.accountType,
                    width: 120,
                },
                {
                    title: 'Payment Method',
                    dataIndex: 'bankDetails',
                    render: (_, record) => record.bankDetails.paymentMethod,
                    width: 150,
                },
            ]
        },
        {
            title: 'Basic Salary',
            dataIndex: 'basicSalary',
            width: 120,
        },
        {
            title: "Allowance",
            dataIndex: 'allowances',
            render: (_, record) => record.allowances.reduce((add, item) => add + item.amount, 0),
            width: 120,
        },
        {
            title: 'Gross Salary',
            dataIndex: 'grossPay',
            width: 120,
        },
        {
            title: "Deduction Total",
            dataIndex: 'deductions',
            render: (_, record) => record.deductions.reduce((add, item) => add + item.amount, 0),
            width: 150,
        },
        {
            title: 'Net Salary',
            dataIndex: 'netPay',
            width: 120,
            fixed: 'right',
        },
    ];

    const { styles } = useStyle();

    return (
        <>
            <Heading title="Employee Payrolls" />
            <ExportButton/>
            <Table
                bordered
                className={styles.customTable}
                columns={columns}
                dataSource={mockPayrollData}
                rowKey="employeeNo"  // Use unique key like employeeNo for rows
                scroll={{
                    x: 'max-content',  // Enables horizontal scrolling
                }}
            />
        </>
    );
}

export default Payrolls;
