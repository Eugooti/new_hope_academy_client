import {useForm} from "antd/es/form/Form.js";
import {Button, Card, Form, Input, message, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import DatePickerWrapper from "../../../../components/DatePicker/DatePickerWrapper.jsx";
import Heading from "../../../../components/heading/Heading.jsx";
import {admitLearner} from "../../../../redux/Reducers/AdminSlice/LearnerSlice.js";
import {useDispatch} from "react-redux";
import {getFromLocalStorage} from "../../../../utils/LocalStorage/localStorage.jsx";
import {useNavigate} from "react-router-dom";


const StudentAdmission = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [form] = useForm();

    const dispatch=useDispatch()

    const user=getFromLocalStorage('user')
    const navigate=useNavigate()

    const onFormFinish = async (values) => {
        const newLearner = { ...values, createdBy: user?.email };

        await dispatch(admitLearner(newLearner)).then((action) => {
            console.log(action)
            if (action.error) {
                messageApi.error(action.payload?.message);
            } else {
                messageApi.success(action.payload?.message).then(()=>{
                    form.resetFields()
                    navigate('/')
                })
            }
        });
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };



    const medicalConditions = [
        "Asthma",
        "Allergies",
        "Diabetes",
        "Epilepsy/Seizure Disorders",
        "Attention-Deficit/Hyperactivity Disorder (ADHD)",
        "Autism Spectrum Disorder (ASD)",
        "Heart Conditions",
        "Hearing Impairments",
        "Visual Impairments",
        "Cerebral Palsy",
        "Cystic Fibrosis",
        "Sickle Cell Anemia",
        "Mental Health Conditions",
    ];


    const handleDateRangeChange = (value) => {
        // Update the form field when the date range changes
        form.setFieldsValue({ date: value });
    };


    return(
        <Card >
            {contextHolder}
            <Heading title='New Student' subtitle={'Register student with the school'}/>

            <Form
                form={form}
                name="basic"
                layout="vertical"
                className='pt-5'
                initialValues={{remember: true}}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >
                <div className='pb-4'>
                    <label className='text-xl font-sans text-balance'>Learners Details</label>
                </div>

                <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4'>
                    <Form.Item label="First Name" name="first_name">
                        <Input size={"large"}/>
                    </Form.Item>
                    <Form.Item label="Last Name" name="last_name">
                        <Input size={"large"}/>
                    </Form.Item>
                    <Form.Item label="Gender" name='gender'>
                        <Select size={"large"}>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date of Birth" name="yob">
                        <DatePickerWrapper
                            size={'large'}
                            className={'w-full'}
                            value={form.getFieldValue('dateRange')}
                            onChange={handleDateRangeChange}
                        />
                    </Form.Item>
                    <Form.Item label="NEMIS Number" name="upi">
                        <Input size={"large"}/>
                    </Form.Item>
                    <Form.Item label="Birth Certificate No" name="birth_certificate_no">
                        <Input size={"large"}/>
                    </Form.Item>
                    <Form.Item label="Grade" name='grade'>
                        <Select size={"large"}>
                            <Select.Option value="Baby Class">Playgroup</Select.Option>
                            <Select.Option value="PP1">PP1</Select.Option>
                            <Select.Option value="PP2">PP2</Select.Option>
                            <Select.Option value={1}>One</Select.Option>
                            <Select.Option value={2}>Two</Select.Option>
                            <Select.Option value={3}>Tree</Select.Option>
                            <Select.Option value={4}>Four</Select.Option>
                            <Select.Option value={5}>Five</Select.Option>
                            <Select.Option value={6}>Six</Select.Option>
                            <Select.Option value={7}>Seven</Select.Option>
                            <Select.Option value={8}>Eight</Select.Option>
                            <Select.Option value={9}>Nine</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Special Medical Condition" name='medical'>
                        <Select size="large">
                            {medicalConditions.map((condition, index) => (
                                <Select.Option key={index} value={condition}>
                                    {condition}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <div className='py-4'>
                    <div className='pb-4'>
                        <label className='text-xl font-sans text-balance'>Parents Details</label>
                    </div>
                    <Form.List name="parents">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, ...restField}) => (
                                    <div
                                        key={key}

                                    >
                                        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4'>
                                            <Form.Item
                                                label='First Name'
                                                {...restField}
                                                name={[name, 'first_name']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing first name',
                                                    },
                                                ]}
                                            >
                                                <Input size='large'/>
                                            </Form.Item>
                                            <Form.Item
                                                label='last Name'
                                                {...restField}
                                                name={[name, 'last_name']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing last name',
                                                    },
                                                ]}
                                            >
                                                <Input size='large'/>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                label="Relationship" name={[name, 'relationship']}>
                                                <Select size='large'>
                                                    <Select.Option value="father">Father</Select.Option>
                                                    <Select.Option value="mother">Mother</Select.Option>
                                                    <Select.Option value="guardian">Guardian</Select.Option>
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                label='ID Number'
                                                {...restField}
                                                name={[name, 'id_number']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing last name',
                                                    },
                                                ]}
                                            >
                                                <Input size='large'/>
                                            </Form.Item>

                                            <Form.Item
                                                label='Email Address'
                                                {...restField}
                                                name={[name, 'email']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing last name',
                                                    },
                                                ]}
                                            >
                                                <Input size='large'/>
                                            </Form.Item>

                                            <Form.Item
                                                label='Phone Number'
                                                {...restField}
                                                name={[name, 'phone']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing last name',
                                                    },
                                                ]}
                                            >
                                                <Input size='large'/>
                                            </Form.Item>

                                            <Form.Item
                                                label='Address'
                                                {...restField}
                                                name={[name, 'address']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing last name',
                                                    },
                                                ]}
                                            >
                                                <Input size='large'/>
                                            </Form.Item>


                                        </div>
                                        <div className='flex justify-center pb-8'>
                                            <button className='bg-red-800 h-8 w-1/2 rounded-2xl text-white'
                                                    onClick={() => remove(name)}>Remove Parent
                                            </button>

                                        </div>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                        Add Parent
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </div>


                <div>
                    <button className='bg-blue-900 hover:bg-blue-950 h-10 w-full rounded-2xl text-white text-xl' type="submit">Admit Student</button>
                </div>

            </Form>
        </Card>
    )
}

export default StudentAdmission;
