import Heading from "../../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Form, Input, message, Select} from "antd";
import Button from "antd/es/button/index.js";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea.js";
import {useTheme} from "../../../../context/ThemeContext/ThemeContext2.jsx";
import {useDispatch} from "react-redux";
import {createVacancy} from "../../../../redux/Reducers/hrmSlice/vacancySlice.js";
import {useEffect} from "react";

const CreateVacancy = () => {
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const onFormFinish = async (values) => {
        // todo handle form finish
        await dispatch(createVacancy(values)).then(action=>{
            action.error?
                messageApi.error(action.payload.message):
                messageApi.success(action.payload.message).then(()=>form.resetFields())
        })

    };

    useEffect(() => {
        form.setFieldsValue({requirements:[{requirement:""}],qualifications:[{qualification:""}]})
    }, [form]);



    const departments = ["Human Resource","Procurement","Teaching Staff","Administration","Clinic","ICT Support"].
        map(item => ({
        label: item,
        value:item
    }))

    const {currentTheme} = useTheme()

    const selectStyles = {
        backgroundColor: currentTheme.surface,
        color: currentTheme.text,
        borderColor: currentTheme.border,
    }



    return (
        <>
            {contextHolder}
            <Heading title={"New Vacancy"} subtitle={'Post a job opening.'} />
            <Form
                form={form}
                name="vacancy"
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
            >
                <div className='grid md:grid-cols-2 gap-4'>
                    <Form.Item
                        rules={[{required:true,message:"Required field."}]}
                        label="Job Title" name="roleTitle">
                        <Input
                            size="large"
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[{required:true,message:"Required field."}]}
                        label="Select Department" name='Department'>
                        <Select
                            size='large'
                            options={departments}
                            style={selectStyles}
                            dropdownStyle={{
                                backgroundColor: currentTheme.surface,
                            }}
                        />

                    </Form.Item>
                </div>

                <Form.List name={"requirements"}>
                    {(fields,{add,remove}) => (
                        <>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                {fields.map(({key,name,...restField})=>(
                                    <div  key={key}>
                                        <div className='grid grid-cols-10'>
                                            <Form.Item
                                                rules={[{required:true,message:"Required field."}]}
                                                className='col-span-9'
                                                {...restField}
                                                label="Requirement" name={[name, "requirement"]}>
                                                <Input
                                                    size="large"
                                                    className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                />
                                            </Form.Item>

                                            <div className='flex justify-center align-middle' >

                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Requirement
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.List name={"qualifications"}>
                    {(fields,{add,remove}) => (
                        <>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                {fields.map(({key,name,...restField})=>(
                                    <div  key={key}>
                                        <div className='grid grid-cols-10'>
                                            <Form.Item
                                                rules={[{required:true,message:"Required field."}]}
                                                className='col-span-9'
                                                {...restField}
                                                label="Qualification" name={[name, "qualification"]}>
                                                <Input
                                                    size="large"
                                                    className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                />
                                            </Form.Item>

                                            <div className='flex justify-center align-middle' >

                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Qualification
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item
                    rules={[{required:true,message:"Required field."}]}
                    label="Job Description" name="jobDescription">
                    <TextArea
                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        rows={4}/>
                </Form.Item>
                <Form.Item
                    rules={[{required:true,message:"Required field."}]}
                    label="Salary" name="salaryRange">
                    <Input
                        size="large"
                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                    />
                </Form.Item>

                <div className='py-4'>
                    <button style={{background:currentTheme.secondary,color:currentTheme.text}}
                            className='w-full h-10 rounded-xl'
                            type="submit">Create Vacancy</button>
                </div>

            </Form>


        </>
    )
}

export default CreateVacancy