import Heading from "../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Button, Form, Input, message, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {createDepartment} from "../../../redux/Reducers/AdminSlice/departmentSlice.js";
import {useDispatch,useSelector} from "react-redux";
import {getFromLocalStorage} from "../../../utils/LocalStorage/localStorage.jsx";
import {useEffect} from "react";

const CreatDepartment = () => {

    const [form] = useForm();

    const initialRoles=[{role:""}]

    useEffect(() => {
        form.setFieldsValue({responsibility:initialRoles})
    }, [form]);


    const [messageApi, contextHolder] = message.useMessage();
    const {loading}=useSelector(state => state.department)
    const dispatch=useDispatch();
    const onFormFinish = async (values) => {
        const user=getFromLocalStorage('user')

        // todo handle form finish
        if (values.responsibility===undefined||values.responsibility.length===0){
            messageApi.warning("Roles Requires")
        }else {
            await dispatch(createDepartment({...values,createdBy:user.staffId})).then((action)=>{
                if (action.error){
                    messageApi.error(action.payload.message)
                }else {
                    messageApi.success(action.payload.message).then(()=>{
                        form.resetFields()
                    })
                }
            })
        }
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };

    const teachers=[
        {label:"Mr Eugene Ochieng",value:"Mr Eugene Ochieng"},
        {label:"Mr Kevin Ochieng",value:"Mr Kevin Ochieng"},
        {label:"Mr Brian Ochieng",value:"Mr Brian Ochieng"},
        {label:"Mr John Ochieng",value:"Mr John Ochieng"},
        {label:"Mr Tom Ochieng",value:"Mr Tom Ochieng"},
    ]


    return(
        <>
            {contextHolder}
            <Heading title='New Department' subtitle='Create Department'/>
            <Form
                form={form}
                name="basic"
                className='py-4'
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >

                <Form.Item label="Department Name" name="title">
                    <Input
                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        size={"large"}/>
                </Form.Item>
                <Form.Item label="Head Of Department" name='departmentHead'>
                    <Select
                        size={"large"}
                        options={teachers}
                        placeholder="Mr. John Tom"
                    />
                </Form.Item>

                <Form.List name={'responsibility'}>
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, restField}) => (
                                <div key={key}>
                                    <div>
                                        <Form.Item
                                            label={`Role ${key + 1}`}
                                            {...restField}
                                            name={[name, 'role']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing first name',
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                size={"large"}/>
                                        </Form.Item>
                                    </div>
                                    <div className='flex justify-center pb-8'>
                                        <button className='bg-red-800 h-8 w-1/2 rounded-2xl text-white'
                                                onClick={() => remove(name)}>Remove Role
                                        </button>

                                    </div>
                                </div>
                            ))}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Add Role
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <div>
                    <button className='bg-blue-900 hover:bg-blue-950 h-10 w-full rounded-2xl text-white text-xl'
                            type="submit">
                        {loading?"Adding...":"Add Department"}
                    </button>
                </div>

            </Form>


        </>
    )

}
export default CreatDepartment;
