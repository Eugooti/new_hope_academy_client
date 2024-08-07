import {useEffect, useState} from "react";
import {getFromLocalStorage, removeItem, setLocalStorage} from "../../../../utils/LocalStorage/localStorage.jsx";
import {Button, Form, Input, message, Select} from "antd";
import {useNavigate} from "react-router-dom";
import {useForm} from "antd/es/form/Form.js";
import DatePickerWrapper from "../../../../components/DatePicker/DatePickerWrapper.jsx";
import Heading from "../../../../components/heading/Heading.jsx";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {admitLearner} from "../../../../redux/Reducers/AdminSlice/LearnerSlice.js";
import {createLearnerLibraryRecord} from "../../../../redux/Reducers/appSlice/booksBorrowingSlice.js";
import {createLearnerClinicRecord} from "../../../../redux/Reducers/AdminSlice/clinicSlice.js";
import {createLearnerAttendanceRecord} from "../../../../redux/Reducers/AdminSlice/attendanceSlice.js";
import {Step, StepLabel, Stepper} from "@mui/material";
import {addLearnerToClass} from "../../../../redux/Reducers/AdminSlice/classSlice.js";

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

const grades = [
    { label: "One", value: 1 }, { label: "Two", value: 2 }, { label: "Three", value: 3 },
    { label: "Four", value: 4 }, { label: "Five", value: 5 }, { label: "Six", value: 6 },
    { label: "Seven", value: 7 }, { label: "Eight", value: 8 }, { label: "Nine", value: 9 },
];

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

    const [current, setCurrent] = useState(getFromLocalStorage('step') || 0);
    const [form] = useForm();
    const [form1] = useForm();

    const [student, setStudent] = useState({});
    const [parents, setParents] = useState([]);

    const initialParents = [{ first_name: '', last_name: '', relationship: '', idNo: '', email: '', phone: '' }];


    useEffect(() => {
        const savedStudent = getFromLocalStorage('student');
        const savedParents = getFromLocalStorage('parent');

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
            setLocalStorage('step', current + 1);
        }
    };

    const prev = () => {
        if (current > 0) {
            setCurrent(current - 1);
            setLocalStorage('step', current - 1);
        }
    };

    const onFormFinish = (values) => {
        console.log('Student form values received:', values);
        setLocalStorage('student', values);
        setStudent(values);
        next();
    };

    const [messageApi, contextHolder] = message.useMessage();

    const onFormFinish1 = (values) => {
        if (values.parents === null || values.parents===undefined || values.parents.length===0){
            messageApi.warning("Parents Details Required")
        }else {
            setLocalStorage('parent', values.parents);
            setParents(values.parents);
            next();
        }


    };
    const dispatch=useDispatch();

    const user=getFromLocalStorage('user')
    const overallFinish = async () => {
        const newLearner={
            ...student,
            parents,
            admittedBy: user?.staffId
        }
        await dispatch(admitLearner(newLearner)).then((action) => {
            console.log(action)
            if (action.error) {
                messageApi.error(action.payload?.message);
            } else {
                messageApi.success(action.payload?.message).then(()=>{
                    form.resetFields()
                    removeItem("parent")
                    removeItem("student")
                    setLocalStorage("admitted",action.payload)
                    next()
                })
            }
        });
    };

    const admittedLearner=getFromLocalStorage("admitted")


    const navigate=useNavigate();
    const final = async () => {
      removeItem('step')
        navigate('/fee-setting')
    }


    const handleDateRangeChange = (value) => {
        form.setFieldsValue({ yob: value });
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));


    const library = async () => {
        const learnerData={
            studentsId: admittedLearner?.result?.studentId,
            studentNames:`${admittedLearner?.result?.first_name} ${admittedLearner?.result?.last_name}`,
            grade: admittedLearner?.result?.grade
        }
        await dispatch(createLearnerLibraryRecord(learnerData)).then((action)=>{
            console.log(action)
            if (action.error) {
                messageApi.error(action.payload?.message);
            } else {
                messageApi.success(action.payload?.message).then(()=>{
                    console.log(action)
                })
            }
        })
    }

    const clinic = async () => {
        const learnerData={
            studentsId: admittedLearner?.result?.studentId,
            studentNames:`${admittedLearner?.result?.first_name} ${admittedLearner?.result?.last_name}`,
            grade: admittedLearner?.result?.grade,
            gender: admittedLearner?.result?.gender,
            createdBy: user?.email
        }

        await dispatch(createLearnerClinicRecord(learnerData)).then((action)=>{
            console.log(action)
            if (action.error) {
                messageApi.error(action.payload?.message);
            } else {
                messageApi.success(action.payload?.message).then(()=>{
                    console.log(action)
                })
            }
        })

    }

    const attendance = async () => {
        const learnerData={
            studentId: admittedLearner?.result?.studentId,
            studentNames:`${admittedLearner?.result?.first_name} ${admittedLearner?.result?.last_name}`,
            grade: admittedLearner?.result?.grade,
            gender: admittedLearner?.result?.gender,

        }

        await dispatch(createLearnerAttendanceRecord(learnerData)).then((action)=>{
            console.log(action)
            if (action.error) {
                messageApi.error(action.payload?.message);
            } else {
                messageApi.success(action.payload?.message).then(()=>{
                    console.log(action)
                })
            }
        })

    }

    const addToClass = async () => {
        const learnerData={
            studentId: admittedLearner?.result?.studentId,
            firstName:admittedLearner?.result?.first_name ,
            lastName:admittedLearner?.result?.last_name,
            gender: admittedLearner?.result?.gender,
        }
      const grade = admittedLearner?.result?.grade

        await dispatch(addLearnerToClass({grade,learnerData})).then((action)=>{
            console.log(action)
            action.error?
                messageApi.error(action.payload.message):
                messageApi.success(action.payload.message)
        })

    }

    return (
        <>
            {contextHolder}
            <Stepper activeStep={current} alternativeLabel>
                {items.map((item)=>(
                    <Step key={item.content}>
                        <StepLabel>{item.title}</StepLabel>
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
                            <Select size="large">
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
                            />

                        </Form.Item>
                        <Form.Item
                            label={"Address"}
                            name='address'
                        >
                            <Input
                                size={"large"}
                                placeHolder={'Ukwala'}
                            />
                        </Form.Item>
                        <Form.Item
                            name='disability'
                            label="Disability Status"
                        >
                            <Select
                                size={"large"}
                                placeholder='Select status'
                                options={disability}

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
                                                    <Select size="large">
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
                                                {/*<Form.Item*/}
                                                {/*    label="Address"*/}
                                                {/*    {...restField}*/}
                                                {/*    name={[name, 'address']}*/}
                                                {/*    rules={[{ required: true, message: 'Missing address' }]}*/}
                                                {/*>*/}
                                                {/*    <Input size="large" />*/}
                                                {/*</Form.Item>*/}
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
                    <div className='flex align-middle justify-around pb-4'>
                        <Button type='dashed' onClick={clinic}>Clinic Record</Button>
                        <Button type='dashed' onClick={library}>Library Record</Button>
                        <Button type='dashed' onClick={attendance}>Attendance Record</Button>
                        <Button type='dashed' onClick={addToClass}>Add To Class</Button>
                    </div>
                    <div className="flex justify-end">
                        <Button type="primary" className='w-24' onClick={final}>Finish</Button>
                        <Button style={{ margin: '0 8px' }} onClick={prev}>
                            Previous
                        </Button>
                    </div>

                </div>
            )}

        </>
    );
};

export default StudentAdmission;
