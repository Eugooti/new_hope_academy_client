import {useEffect, useState} from "react";
import {Button, Form, Input, message, Select} from "antd";
import {useNavigate} from "react-router-dom";
import {useForm} from "antd/es/form/Form.js";
import DatePickerWrapper from "../../../../components/DatePicker/DatePickerWrapper.jsx";
import Heading from "../../../../components/heading/Heading.jsx";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {admitLearner} from "../../../../redux/Reducers/AdminSlice/LearnerSlice.js";
import {Step, StepLabel, Stepper} from "@mui/material";
import {useTheme} from "../../../../context/ThemeContext/ThemeContext2.jsx";
import {BatchRequest} from "../../../../redux/Reducers/AdminSlice/batchRequestSlice.js";
import {
    getFromSessionStorage,
    removeSessionItem,
    setSessionStorage
} from "../../../../utils/LocalStorage/sessionStorage.jsx";


const medicalConditions = [
    "Non","Asthma", "Allergies", "Diabetes", "Epilepsy/Seizure Disorders",
    "Attention-Deficit/Hyperactivity Disorder (ADHD)", "Autism Spectrum Disorder (ASD)",
    "Heart Conditions", "Hearing Impairments", "Visual Impairments", "Cerebral Palsy",
    "Cystic Fibrosis", "Sickle Cell Anemia", "Mental Health Conditions",
];

const medicalConditionsObjects = medicalConditions.map(condition => ({
    label: condition,
    value: condition
}));

const grades = [{label:"Play Group",value:"PlayGroup"},{label:"Pri-Primary One",value:"PP1"},{label:"Pri-Primary Two",value:"PP2"},
    {label:"Grade One",value:"G1"},{label:"Grade Two",value:"G2"},{label:"Grade Three",value:"G3"},{label:"Grade Four",value:"G4"}
    ,{label:"Grade Five",value:"G5"},{label:"Grade Six",value:"G6"},{label:"Grade Seven",value:"G7"},{label:"Grade Eight",value:"G8"},{label:"Grade Nine",value:"G9"}]


const disability = ["Yes","No"].map(item =>({
    label:item,
    value:item
}))

const StudentAdmission = () => {
    const steps = [
        { title: 'Student Details', content: 'First-content' },
        { title: 'Parent Details', content: 'Second-content' },
        { title: 'Confirmation', content: 'Last-content' },
        { title: 'Create learner records', content: 'Last-content' },
    ];

    const [current, setCurrent] = useState(getFromSessionStorage('step') || 0);
    const [form] = useForm();
    const [form1] = useForm();

    const [student, setStudent] = useState({});
    const [parents, setParents] = useState([]);

    const initialParents = [{ first_name: '', last_name: '', relationship: '', idNo: '', email: '', phone: '' }];


    useEffect(() => {
        const savedStudent = getFromSessionStorage('student');
        const savedParents = getFromSessionStorage('parent');

        if (savedStudent) {
            setStudent(savedStudent);
            form.setFieldsValue(savedStudent);
        }

        if (savedParents) {
            setParents(savedParents);
            form1.setFieldsValue({ parents: savedParents });
        }else {
            form1.setFieldsValue({ parents: initialParents });

        }
    }, [form, form1]);

    const next = () => {
        if (current < steps.length - 1) {
            setCurrent(current + 1);
            setSessionStorage('step', current + 1);
        }
    };

    const prev = () => {
        if (current > 0) {
            setCurrent(current - 1);
            setSessionStorage('step', current - 1);
        }
    };

    const onFormFinish = (values) => {
        setSessionStorage('student', values);
        setStudent(values);
        next();
    };

    const [messageApi, contextHolder] = message.useMessage();

    const onFormFinish1 = (values) => {
        if (values.parents === null || values.parents===undefined || values.parents.length===0){
            messageApi.warning("Parents Details Required")
        }else {
            setSessionStorage('parent', values.parents);
            setParents(values.parents);
            next();
        }


    };
    const dispatch=useDispatch();

    const user=getFromSessionStorage('user')
    const overallFinish = async () => {
        const newLearner={
            ...student,
            parents,
            admittedBy: user?.employeeNo
        }
        await dispatch(admitLearner(newLearner)).then((action) => {
            if (action.error) {
                messageApi.error(action.payload?.message);
            } else {
                messageApi.success(action.payload?.message).then(()=>{
                    form.resetFields()
                    removeSessionItem("parent")
                    removeSessionItem("student")
                    setSessionStorage("admitted",action.payload)
                    next()
                })
            }
        });
    };

    const admittedLearner=getFromSessionStorage("admitted")


    const navigate=useNavigate();



    const handleDateRangeChange = (value) => {
        form.setFieldsValue({ yob: value });
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));



    const {currentTheme} = useTheme()

    const selectStyles = {
        backgroundColor: currentTheme.surface,
        color: currentTheme.text,
        borderColor: currentTheme.border,
    }


    const addLearnerData = async ()=>{
        const classroom = admittedLearner?.result?.classroom
        const classroomData={
            admNo: admittedLearner?.result?.admNo,
            name:`${admittedLearner?.result?.firstName} ${admittedLearner?.result?.lastName}` ,
            gender: admittedLearner?.result?.gender,
        }
        const classroomAttendance={
            admNo: admittedLearner?.result?.admNo,
            fullName:`${admittedLearner?.result?.firstName} ${admittedLearner?.result?.lastName}`,
            gender: admittedLearner?.result?.gender,
            attendanceRecord:[
                {present:true,markedBy:user?.employeeNo},
            ]

        }
        const clinicRecord = {
            fullName:`${admittedLearner?.result?.firstName} ${admittedLearner?.result?.lastName}`,
            admNo:admittedLearner?.result?.admNo,
            classroom: admittedLearner?.result?.classroom,
            gender: admittedLearner?.result?.gender,
        }
        const requests = [
            { method: "PUT", url: `/classroom/addLearner/${classroom}`, data: classroomData },
            { method: "POST", url: `/classroom/attendance/addLearner/${classroom}`, data: classroomAttendance },
            { method: "POST", url: `/learnerService/clinic/create`, data: clinicRecord },
        ];

        await dispatch(BatchRequest(requests)).then((result)=>{
            if (result.error){
                messageApi.error(result.payload.message)

            }else {
                if (result.payload?.responses[2].status === 400|| result.payload?.responses[2].status === 200){
                    if (result.payload?.responses[0].status===200 && result.payload?.responses[1].status===200  ){
                        messageApi.success("Records added successfully").then(()=>{
                            navigate("/succ")
                            removeSessionItem("admitted")
                            removeSessionItem("step")
                        });
                    }
                }



            }

        })
    }


    return (
        <>
            {contextHolder}
            <Stepper activeStep={current} alternativeLabel>
                {items.map((item)=>(
                    <Step key={item.content}>
                        <StepLabel ><label style={{color:currentTheme.text}}>{item.title}</label></StepLabel>
                    </Step>
                ))}
            </Stepper>

            {current === 0 && (
                <Form
                    form={form}
                    name="students"
                    layout="vertical"
                    initialValues={student}
                    onFinish={onFormFinish}
                    className="py-4"
                >
                    <Heading title="New Student" subtitle="Register student with the school" />

                    <div className="grid py-4 sm:grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please input the first name!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please input the last name!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[{ required: true, message: 'Please select the gender!' }]}
                        >
                            <Select
                                style={selectStyles}
                                dropdownStyle={{
                                    backgroundColor: currentTheme.surface,
                                }}
                                size="large">
                                <Select.Option value="Male">Male</Select.Option>
                                <Select.Option value="Female">Female</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Date of Birth"
                            name="yob"
                            rules={[{ required: true, message: 'Please select the date of birth!' }]}
                        >
                            <DatePickerWrapper
                                size="large"
                                className="w-full"
                                onChange={handleDateRangeChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="NEMIS Number"
                            name="UPINo"
                            rules={[{ required: true, message: 'Please input the NEMIS number!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Birth Certificate No"
                            name="birthCertificateNo"
                            rules={[{ required: true, message: 'Please input the birth certificate number!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Grade"
                            name="classroom"
                            rules={[{ required: true, message: 'Please select the grade!' }]}
                        >

                            <Select
                                showSearch={true}
                                size={"large"}
                                placeholder="Select grade"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={grades}
                                style={selectStyles}
                                dropdownStyle={{
                                    backgroundColor: currentTheme.surface,
                                }}
                            />

                        </Form.Item>
                        <Form.Item
                            label={"Address"}
                            name='address'
                            rules={[{ required: true, message: 'Address is Required.' }]}
                        >
                            <Input
                                size={"large"}
                                placeHolder={'Ukwala'}
                            />
                        </Form.Item>
                        <Form.Item
                            name='disability'
                            label="Disability Status"
                            rules={[{ required: true, message: 'Required field' }]}
                        >
                            <Select
                                size={"large"}
                                placeholder='Select status'
                                options={disability}
                                style={selectStyles}
                                dropdownStyle={{
                                    backgroundColor: currentTheme.surface,
                                }}

                            />
                        </Form.Item>
                        <Form.Item
                            label="Special Medical Condition"
                            name="medicalCondition"
                            rules={[{ required: true, message: 'Please select the medical condition!' }]}
                        >
                            <Select
                                showSearch={true}
                                size={"large"}
                                placeholder="Select Condition"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={medicalConditionsObjects}
                                style={selectStyles}
                                dropdownStyle={{
                                    backgroundColor: currentTheme.surface,
                                }}
                            />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end">
                        <Button type="primary" className="w-24" htmlType="submit">
                            Next
                        </Button>
                    </div>
                </Form>
            )}

            {current === 1 && (
                <Form
                    form={form1}
                    name="parents"
                    layout="vertical"
                    initialValues={{ parents }}
                    onFinish={onFormFinish1}
                >
                    <div className="py-4">
                        <div className="pb-4">
                            <label className="text-xl font-sans text-balance">Parent Details</label>
                        </div>

                        <Form.List name="parents">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div key={key}>
                                            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                                                <Form.Item
                                                    label="First Name"
                                                    {...restField}
                                                    name={[name, 'first_name']}
                                                    rules={[{ required: true, message: 'Missing first name' }]}
                                                >
                                                    <Input size="large" />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Last Name"
                                                    {...restField}
                                                    name={[name, 'last_name']}
                                                    rules={[{ required: true, message: 'Missing last name' }]}
                                                >
                                                    <Input size="large" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Relationship"
                                                    name={[name, 'relationship']}
                                                    rules={[{ required: true, message: 'Please select the relationship!' }]}
                                                >
                                                    <Select
                                                        style={selectStyles}
                                                        dropdownStyle={{
                                                            backgroundColor: currentTheme.surface,
                                                        }}
                                                        size="large">
                                                        <Select.Option value="father">Father</Select.Option>
                                                        <Select.Option value="mother">Mother</Select.Option>
                                                        <Select.Option value="guardian">Guardian</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    label="ID Number"
                                                    {...restField}
                                                    name={[name, 'idNo']}
                                                    rules={[{ required: true, message: 'Missing ID number' }]}
                                                >
                                                    <Input size="large" />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Email Address"
                                                    {...restField}
                                                    name={[name, 'email']}
                                                    rules={[{ required: true, message: 'Missing email address' }]}
                                                >
                                                    <Input size="large" />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Phone Number"
                                                    {...restField}
                                                    name={[name, 'phone']}
                                                    rules={[{ required: true, message: 'Missing phone number' }]}
                                                >
                                                    <Input size="large" />
                                                </Form.Item>
                                            </div>
                                            <div className="flex justify-center pb-8">
                                                <button
                                                    className="bg-red-800 h-8 w-1/2 rounded-2xl text-white"
                                                    onClick={() => remove(name)}
                                                >
                                                    Remove Parent
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Parent
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <div className="flex justify-end gap-3">
                            <Button type="primary" className="w-24" htmlType="submit">
                                Next
                            </Button>
                            <Button style={{ margin: '0 8px' }} onClick={prev}>
                                Previous
                            </Button>
                        </div>
                    </div>
                </Form>
            )}

            {current === 2 && (
                <div className="py-4">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Confirm Learner Information</h2>
                        <dl className="divide-y divide-gray-400">
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {`${student?.firstName} ${student?.lastName}`}
                                </dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student?.gender}</dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Year Of Birth</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student?.yob}</dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">UPI No.</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student?.UPINo}</dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Birth Cert No.</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student?.birthCertificateNo}</dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Grade</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student?.classroom}</dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Disability Status</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student?.disability}</dd>
                            </div>

                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Medical Condition</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student?.medicalCondition}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="flex justify-end">
                        <Button type="primary" onClick={overallFinish}>Admit Learner</Button>
                        <Button style={{ margin: '0 8px' }} onClick={prev}>
                            Previous
                        </Button>
                    </div>
                </div>
            )}

            {current === 3 && (
                <div className='py-4'>
                    <Heading subtitle="Create Learner Library, Clinic and Attendance record"/>
                    <dl className="divide-y divide-gray-400">
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Admission Number</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{admittedLearner?.result?.admNo}</dd>
                        </div>

                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {`${admittedLearner?.result?.firstName} ${admittedLearner?.result?.lastName}`}
                            </dd>
                        </div>
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{admittedLearner?.result?.gender}</dd>
                        </div>

                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Grade</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{admittedLearner?.result?.classroom}</dd>
                        </div>
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        </div>

                    </dl>
                    <div className="flex justify-end">
                        <Button type="primary" className='w-24' onClick={addLearnerData}>Finish</Button>
                    </div>

                </div>
            )}

        </>
    );
};

export default StudentAdmission;
