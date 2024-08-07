import {Button, Card, Form, Select} from "antd";
import {useState} from "react";
import {getFromLocalStorage, setLocalStorage} from "../../../utils/LocalStorage/localStorage.jsx";
import {useForm} from "antd/es/form/Form.js";
import {PlusOutlined} from "@ant-design/icons";
import Heading from "../../../components/heading/Heading.jsx";
import {Step, StepLabel, Stepper} from "@mui/material";
const FeeStructure=()=>{
    const steps=[
        {title:"Class Details",content:"first-content"},
        {title:"Term One",content:"second-content"},
        {title:"Term Two",content:"third-content"},
        {title:"Term Three",content:"fourth-content"},
        {title:"Review",content:"fifth-content"},
    ]


    const [currentStep, setCurrentStep] = useState(0);

    const next = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setLocalStorage('step', currentStep + 1);
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setLocalStorage('step', currentStep - 1);
        }
    };

    const grades=["One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
    const mappedGrade=grades.map((grade,index)=>({
        label:grade,
        value:index+1
    }))
    const levels=["ECD","Lower Primary","Upper Primary","Junior Secondary"]
    const mappedLevel=levels.map((level,index)=>({
        label:level,
        value:index+1
    }))
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
    const mappedFee=schoolFees.map((item)=>({
        label:item.category,
        value:item.fee
    }))
    const [form] = useForm();

    const onFormFinish = (values) => {
        // todo handle form finish
        setLocalStorage('classDetails',values)
        next()
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };

    const [form1] = useForm();

    const onFormFinish1 = (values) => {
        // todo handle form finish
        setLocalStorage('term1',values)
        next()
    };

    const onFormFinishFailed1 = (errorInfo) => {
        // todo handle form finish fail

        console.log(errorInfo)

    };

    const [form2] = useForm();

    const onFormFinish2 = (values) => {
        // todo handle form finish
        setLocalStorage('term2',values)
        console.log(values)
        next()
    };

    const onFormFinishFailed2 = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)

    };



    const [form3] = useForm();

    const onFormFinish3 = (values) => {
        // todo handle form finish
        console.log(values)
        setLocalStorage('term3',values)
        next()
    };

    const onFormFinishFailed3 = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };


    const classInformation=getFromLocalStorage('classDetails');


    return(
        <>
            <div className='px-4'>
                {/*<Steps current={currentStep} items={steps}/>*/}
                <Stepper activeStep={currentStep} alternativeLabel >
                    {steps.map((item)=>(
                        <Step key={item.content}>
                            <StepLabel>{item.title}</StepLabel>
                        </Step>
                    ))}
            </Stepper>

                {currentStep === 0 && (
                    <div>
                        <Form
                            form={form}
                            name="classInfo"
                            layout="vertical"
                            initialValues={{remember: true}}
                            onFinish={onFormFinish}
                            onFinishFailed={onFormFinishFailed}
                        >


                            <Form.Item label="Start Grade" name="start">
                                <Select
                                    size={"large"}
                                    placeholder="Start Grade"
                                    options={mappedGrade}
                                />
                            </Form.Item>

                            <Form.Item label="Last Grade" name="last">
                                <Select
                                    size={"large"}
                                    placeholder="Last Grade"
                                    options={mappedGrade}
                                />
                            </Form.Item>

                            <Form.Item label="Level" name="level">
                                <Select
                                    size={"large"}
                                    placeholder="Level"
                                    options={mappedLevel}
                                />
                            </Form.Item>

                            <div className='flex align-middle justify-end'>
                                <Button type="primary" className='w-24' htmlType={"submit"}>Next</Button>
                            </div>

                        </Form>
                    </div>
                )}
                {currentStep === 1 && (
                    <div>
                        <Heading subtitle={"Term One Fee Setting"}/>
                        <Form
                            form={form1}
                            className='pt-5'
                            name="term1"
                            layout="vertical"
                            initialValues={{remember: true}}
                            onFinish={onFormFinish1}
                            onFinishFailed={onFormFinishFailed1}
                        >
                            <Form.List name={'term1'}>
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, ...restField}) => (
                                            <div className='flex gap-3 sm:flex-col md:flex-row' key={key}>
                                                <Form.Item
                                                    className='w-full'
                                                    label={'Fee Vote'}
                                                    {...restField}
                                                    name={[name, 'feeItem']}
                                                >
                                                    <Select
                                                        size={"large"}
                                                        options={mappedFee}
                                                    />

                                                </Form.Item>
                                                <Form.Item style={{
                                                    display: "flex",
                                                    alignItems: "end",
                                                    justifyContent: "center"
                                                }}>
                                                    <Button type="dashed" size={"large"} onClick={() => remove(name)}
                                                            block icon={<PlusOutlined/>}>
                                                        Remove Fee Items
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                Add Fee Items
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>

                            <div className='flex align-middle justify-end gap-3'>

                                <Button ghost onClick={prev}>Back</Button>
                                <Button type="primary" className='w-24' htmlType={"submit"}>Next</Button>
                            </div>
                        </Form>
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <Heading subtitle={"Term Two Fee Setting"}/>

                        <Form
                            form={form2}
                            name="term2"
                            className='pt-5'
                            layout="vertical"
                            initialValues={{remember: true}}
                            onFinish={onFormFinish2}
                            onFinishFailed={onFormFinishFailed2}
                        >
                            <Form.List name={'term2'}>
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, ...restField}) => (
                                            <div className='flex gap-3 sm:flex-col md:flex-row' key={key}>
                                                <Form.Item
                                                    className='w-full'
                                                    label={'Fee Vote'}
                                                    {...restField}
                                                    name={[name, 'feeItem']}
                                                >
                                                    <Select
                                                        size={"large"}
                                                        options={mappedFee}
                                                    />

                                                </Form.Item>
                                                <Form.Item style={{
                                                    display: "flex",
                                                    alignItems: "end",
                                                    justifyContent: "center"
                                                }}>
                                                    <Button type="dashed" size={"large"} onClick={() => remove(name)}
                                                            block icon={<PlusOutlined/>}>
                                                        Remove Fee Items
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                Add Fee Items
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>

                            <div className='flex align-middle justify-end gap-3'>

                                <Button ghost onClick={prev}>Back</Button>
                                <Button type="primary" className='w-24' htmlType={"submit"}>Next</Button>
                            </div>
                        </Form>
                    </div>
                )}
                {currentStep === 3 && (
                    <div>
                        <Heading subtitle={"Term Three Fee Setting"}/>

                        <Form
                            form={form3}
                            name="term3"
                            className='pt-5'
                            layout="vertical"
                            initialValues={{remember: true}}
                            onFinish={onFormFinish3}
                            onFinishFailed={onFormFinishFailed3}
                        >
                            <Form.List name={'term3'}>
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, ...restField}) => (
                                            <div className='flex gap-3 sm:flex-col md:flex-row' key={key}>
                                                <Form.Item
                                                    className='w-full'
                                                    label={'Fee Vote'}
                                                    {...restField}
                                                    name={[name, 'feeItem']}
                                                >
                                                    <Select
                                                        size={"large"}
                                                        options={mappedFee}
                                                    />

                                                </Form.Item>
                                                <Form.Item style={{
                                                    display: "flex",
                                                    alignItems: "end",
                                                    justifyContent: "center"
                                                }}>
                                                    <Button type="dashed" size={"large"} onClick={() => remove(name)}
                                                            block icon={<PlusOutlined/>}>
                                                        Remove Fee Items
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                Add Fee Items
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>

                            <div className='flex align-middle justify-end gap-3'>

                                <Button ghost onClick={prev}>Back</Button>
                                <Button type="primary" className='w-24' htmlType={"submit"}>Next</Button>
                            </div>
                        </Form>
                    </div>
                )}
                {currentStep === 4 && (
                    <div className='py-8'>
                        <h2 className="text-xl font-semibold mb-2">Confirm Learner Information</h2>

                        <div>
                            <dl className="divide-y divide-gray-400">
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Grades</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {`${classInformation?.start} - ${classInformation?.last}`}
                                    </dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Level</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Upper
                                        Primary
                                    </dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                </div>

                            </dl>

                            <h2 className="text-xl font-semibold mb-2">Term One</h2>

                            <dl className="divide-y divide-gray-400">
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Vote</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Amount</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Birth Cert No.</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">student?.birth_certificate_no</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Grade</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">student?.grade</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Medical Condition</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">student?.medical</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                </div>
                            </dl>


                            <h2 className="text-xl font-semibold mb-2">Term Two</h2>

                            <dl className="divide-y divide-gray-400">
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Vote</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Amount</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Birth Cert No.</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">student?.birth_certificate_no</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Grade</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">student?.grade</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Medical Condition</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">student?.medical</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                </div>
                            </dl>


                            <h2 className="text-xl font-semibold mb-2">Term Three</h2>
                            <dl className="divide-y divide-gray-400">
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Vote</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Amount</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Birth Cert No.</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">student?.birth_certificate_no</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Grade</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">student?.grade</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Medical Condition</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">student?.medical</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Total</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">student?.medical</dd>
                                </div>
                                <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                </div>

                            </dl>

                        </div>


                        <div className='flex align-middle justify-end gap-3'>

                            <Button ghost onClick={prev}>Back</Button>
                            <Button type="primary" className='w-24' onClick={next}>Finish</Button>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}
export default FeeStructure
