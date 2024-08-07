import  { useState, useEffect } from 'react';
import { Transfer, Button } from 'antd';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const FeeSetting = () => {
    const schoolFees = [
        { key: '1', category: 'Tuition Fee', fee: 5000 },
        { key: '2', category: 'Library Fee', fee: 300 },
        { key: '3', category: 'Laboratory Fee', fee: 500 },
        { key: '4', category: 'Sports Fee', fee: 200 },
        { key: '5', category: 'Transport Fee', fee: 1000 },
        { key: '6', category: 'Canteen Fee', fee: 1500 },
        { key: '7', category: 'Examination Fee', fee: 700 },
        { key: '8', category: 'Development Fee', fee: 800 },
        { key: '9', category: 'Hostel Fee', fee: 2500 },
        { key: '10', category: 'Miscellaneous Fee', fee: 400 },
    ];

    const [targetKeys, setTargetKeys] = useState(['1']); // Tuition Fee default selected
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [totalFee, setTotalFee] = useState(0);

    useEffect(() => {
        calculateTotalFee(targetKeys);
    }, [targetKeys]);

    const onChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const logSelectedItems = () => {
        const selectedItems = schoolFees.filter(item => selectedKeys.includes(item.key));
        console.log(selectedItems);
    };

    const calculateTotalFee = (keys) => {
        const total = schoolFees.filter(item => keys.includes(item.key)).reduce((sum, item) => sum + item.fee, 0);
        setTotalFee(total);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">Set Learner Fee</h2>
            <p className="text-gray-500 mb-6">Select the fees applicable for the learner</p>
            <div className="grid lg:grid-cols-2 gap-4">
                <div className="w-full mb-4 md:mb-0">
                    <Transfer
                        dataSource={schoolFees}
                        titles={['Fee Categories', 'Selected Categories']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        showSearch
                        listStyle={{
                            width: '100%',
                            height: 400,
                        }}
                        onChange={(nextTargetKeys) => {
                            onChange(nextTargetKeys);
                            calculateTotalFee(nextTargetKeys);
                        }}
                        onSelectChange={onSelectChange}
                        render={(item) => `${item.category} - $${item.fee}`}
                    />
                </div>
                <div className="w-full">
                    <div className="bg-white shadow-md rounded-md p-4">
                        <h3 className="text-xl font-semibold mb-4">Selected Fees Summary</h3>
                        <ul className="space-y-2">
                            {schoolFees.filter(item => targetKeys.includes(item.key)).map(item => (
                                <li key={item.key} className="flex justify-between">
                                    <span>{item.category}</span>
                                    <span>${item.fee}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 text-lg font-bold">
                            Total Fee: ${totalFee}
                        </div>
                    </div>
                </div>
            </div>
            <Button type="primary" onClick={logSelectedItems} className="mt-6">
                Confirm Selection
            </Button>
        </div>
    );
};

export default FeeSetting;
