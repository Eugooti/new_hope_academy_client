import Heading from "../../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Form, Input, message} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import {useTheme} from "../../../../context/ThemeContext/ThemeContext2.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createComplaint} from "../../../../redux/Reducers/hrmSlice/complaintsSlice.js";
import {getFromSessionStorage} from "../../../../utils/LocalStorage/sessionStorage.jsx";

function NewComplaint() {
    const [form] = useForm();

    const {currentTheme} = useTheme()
    const {loading} = useSelector((state) => state.complaints);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const onFormFinish = async (values) => {
        const user = getFromSessionStorage('user')
        // todo handle form finish
        const data={
            ...values,
            handler:user?.employeeNo
        }
        await dispatch(createComplaint(data)).then(action=>{
            action.error?
                messageApi.error(action.payload.message):
                messageApi.success(action.payload.message).then(()=>form.resetFields())
        })

    };

    const rules ={
        required:[{required:true,message:"Required field."}],
    }

    return (
        <>
            {contextHolder}
            <Heading title={"New Complaint."} subtitle={"Write up the complaint."} />
            <Form
                form={form}
                name="complaints"
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
            >
                <div className='grid md:grid-cols-2 gap-6 pt-5 sm:grid-cols-1'>
                    <Form.Item rules={rules.required} label="Acuser" name="complainant">
                        <Input
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                            size={"large"}/>
                    </Form.Item>

                    <Form.Item rules={rules.required} label="Accused" name="accused">
                        <Input
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                            size={"large"}/>
                    </Form.Item>
                </div>

                <Form.Item rules={rules.required} label="Complain" name="complain">
                    <TextArea
                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        size='large'
                        rows={4}/>
                </Form.Item>

                <Form.Item rules={rules.required} label="Report" name="report">
                    <TextArea
                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        size='large'
                        rows={4}/>
                </Form.Item>

                <div className='py-4'>
                    <button style={{background: currentTheme.secondary, color: currentTheme.text}}
                            className='w-full text-xl h-10 rounded-xl'
                            type="submit">
                        {loading?'Creating':'New Complaint'}
                    </button>
                </div>

            </Form>


        </>
    )
}

export default NewComplaint;