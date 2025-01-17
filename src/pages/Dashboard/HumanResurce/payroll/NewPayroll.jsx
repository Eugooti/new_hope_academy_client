import Heading from "../../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Button, Form, Input, InputNumber, message, Select} from "antd";
import {useTheme} from "../../../../context/ThemeContext/ThemeContext2.jsx";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getUserById} from "../../../../redux/Reducers/AdminSlice/staffSlice.js";
import {useEffect} from "react";
import {getFromSessionStorage} from "../../../../utils/LocalStorage/sessionStorage.jsx";
import {createPayroll} from "../../../../redux/Reducers/hrmSlice/payrollSlice.js";
import {salaryComponents} from "./SalaryComponents.js";

function NewPayroll() {
    const [form] = useForm();

    const {currentTheme} = useTheme()

    const selectStyles = {
        backgroundColor: currentTheme.surface,
        color: currentTheme.text,
        borderColor: currentTheme.border,
    }

    const handleSearchChange = async (value) => {
        await dispatch(getUserById(value)).then(action=>{
            action.error?
                messageApi.error(action.payload.message):
                messageApi.success(action.payload.message).then(()=>{
                    form.setFieldsValue({fullName:`${action.payload?.result.firstname} ${action.payload?.result.lastName}`});
                })
        })
    }

    const {staff_data} = useSelector((state)=>state.staff);
    const user = getFromSessionStorage('user')

    useEffect(() => {
        form.setFieldsValue({allowances:[{allowanceItem:"",allowanceAmount:''}],deductions:[{deductionItem:'',deductionAmount:''}]})
    }, [form]);
    const onFormFinish = async (values) => {
        // todo handle form finish
        const deductionSum = values.deductions.reduce((total,item)=>total+item.deductionAmount,0);
        const allowanceSum = values.allowances.reduce((total,item)=>total+item.allowanceAmount,0);
        const grossPay = values.basicSalary+allowanceSum
        const netPay = grossPay-deductionSum;
        const data ={
            fullName:`${staff_data.result.firstname} ${staff_data.result.lastName}`,
            employeeNo:staff_data.result.employeeNo,
            bankDetails:{
                bankName:values.bankName,
                paymentMethod:values.paymentMethod,
                accountNumber:values.accountNumber,
                accountType:values.accountType
            },
            basicSalary:values.basicSalary,
            allowances:values.allowances,
            deductions:values.deductions,
            grossPay,
            netPay,
            createdBy:user.employeeNo,
            updatedBy:user.employeeNo,
        }

        await dispatch(createPayroll(data)).then(action=>{
            action.error?
                messageApi.error(action.payload.message):
                messageApi.success(action.payload.message).then(()=>{
                    form.resetFields();
                })
        })

    };

    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();



    const paymentMethod = ['Bank Transfer', 'Check', 'Cash'].map(item=>({
        label: item,
        value: item
    }))

    const allowances = salaryComponents.allowances.map(item=>({
        label:item.name,
        value:item.name
    }))

    const deductions = salaryComponents.deductions.map(item=>({
        label:item.name,
        value:item.name,
    }))

    const accountType = ['Savings','Debit'].map(item=>({
        label: item,
        value: item
    }))

    const rules = {
        required:[{required: true,message:"Required field."}]
    }

    return (
        <>
            {contextHolder}
            <Heading title={"New Payroll."} subtitle={'New Employee.'}/>
            <div className='flex justify-center align-middle flex-col pb-4'>
                <label className='text-lg font-semibold'>Find Employee</label>
                <Input.Search size={"large"}
                              className="mt-2 w-1/2"
                              placeholder='Enter Employee Number'
                              onPressEnter={(e) => handleSearchChange(e.target.value)}
                              onSearch={handleSearchChange}/>
            </div>


            <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
            >

                <Form.Item label="Full name" name="fullName">
                    <Input disabled
                           className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                           style={{color: currentTheme.text}}
                           variant='outlined' size='large'/>
                </Form.Item>

                <label className='text-lg font-semibold'>Banking Details</label>
                <div className='py-4 grid md:grid-cols-2 gap-6 sm:grid-cols-1'>
                    <Form.Item rules={rules.required} label="Payment Method" name='paymentMethod'>
                        <Select
                            size={"large"}
                            options={paymentMethod}
                            style={selectStyles}
                            dropdownStyle={{
                                backgroundColor: currentTheme.surface,
                            }}
                        />
                    </Form.Item>
                    <Form.Item rules={rules.required} label="Bank Name" name="bankName">
                        <Input
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                            size='large'/>
                    </Form.Item>
                    <Form.Item rules={rules.required} label="Account Number" name="accountNumber">
                        <Input
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                            size='large'/>
                    </Form.Item>
                    <Form.Item rules={rules.required} label="Account Type" name="accountType">
                        <Select
                            size={"large"}
                            options={accountType}
                            style={selectStyles}
                            dropdownStyle={{
                                backgroundColor: currentTheme.surface,
                            }}
                        />
                    </Form.Item>
                </div>

                <label className='text-lg font-semibold'>Payment Details</label>

                <div className='py-4 grid md:grid-cols-2 gap-6 sm:grid-cols-1'>
                    <Form.Item rules={rules.required} label="Basic Salary" name="basicSalary">
                        <InputNumber
                            className="w-full border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                            size={"large"}/>
                    </Form.Item>
                </div>

                <Form.List name={"allowances"}>
                    {(fields, {add, remove}) => (
                        <>
                            <div className="grid md:grid-cols-2 gap-6">
                                {fields.map(({key, name, ...restField}) => (
                                    <div key={key}>
                                        <div className='grid gap-2 grid-cols-12'>

                                            <Form.Item
                                                rules={rules.required}
                                                className='col-span-8'
                                                {...restField}
                                                label="Allowance." name={[name, "allowanceItem"]}>
                                                <Select
                                                    placeholder='Select Allowance.'
                                                    size={"large"}
                                                    options={allowances}
                                                    style={selectStyles}
                                                    dropdownStyle={{
                                                        backgroundColor: currentTheme.surface,
                                                    }}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                rules={rules.required}
                                                className='col-span-3'
                                                {...restField}
                                                label="Amount." name={[name, "allowanceAmount"]}>
                                                <InputNumber
                                                    size="large"
                                                    className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                />
                                            </Form.Item>


                                            <div className='flex justify-start pl-2 align-middle'>
                                                <MinusCircleOutlined onClick={() => remove(name)}/>
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Add Allowance
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.List name={"deductions"}>
                    {(fields, {add, remove}) => (
                        <>
                            <div className="grid md:grid-cols-2 gap-6">
                                {fields.map(({key, name, ...restField}) => (
                                    <div key={key}>
                                        <div className='grid gap-2 grid-cols-12'>

                                            <Form.Item
                                                rules={rules.required}
                                                className='col-span-8'
                                                {...restField}
                                                label="Deduction." name={[name, "deductionItem"]}>
                                                <Select
                                                    size={"large"}
                                                    placeholder='Select deduction.'
                                                    options={deductions}
                                                    style={selectStyles}
                                                    dropdownStyle={{
                                                        backgroundColor: currentTheme.surface,
                                                    }}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                rules={rules.required}
                                                className='col-span-3'
                                                {...restField}
                                                label="Amount." name={[name, "deductionAmount"]}>
                                                <InputNumber
                                                    size="large"
                                                    className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                />
                                            </Form.Item>
                                            <div className='flex justify-start pl-2 align-middle'>
                                                <MinusCircleOutlined onClick={() => remove(name)}/>
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Add Deduction
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <div className='py-4'>
                    <button style={{background: currentTheme.secondary, color: currentTheme.text}}
                            className='w-full text-xl h-10 rounded-xl'
                            type="submit">
                        Create Payroll
                    </button>
                </div>
            </Form>


        </>
    )
}

export default NewPayroll;