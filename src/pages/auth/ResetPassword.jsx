import {useForm} from "antd/es/form/Form.js";
import {Card, Form, Input, message} from "antd";
import Heading from "../../components/heading/Heading.jsx";
import {ChangePassword, checkCode} from "./ResetPassword.js";
import {useState} from "react";
import {useTheme} from "../../context/ThemeContext/ThemeContext.jsx";

const ResetPassword = () => {
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onFormFinish = async (values) => {
        console.log(values);
        await ChangePassword(values.password).then((result)=>{
            if (result.success){
                messageApi.success(result.message);
            }else {
                messageApi.error(result.message);
            }
        })
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo);
    };


    const [active, setActive] = useState(false);
    const CheckCode = async (e) => {
        await checkCode(e).then((result)=>{
            if (result.success){
                setActive(true)
                console.log(result);
            }else {
                setActive(false)
            }
        })

    }

    const rules={
        password:[{required:true,message:"Required field"}],
        confirm:[{required:true,message:"Required field"},({ getFieldValue }) => ({
            validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject('Passwords do not match!');
            },
        })],
    }

    const {light,dark,lightTheme}=useTheme()
    const theme=!lightTheme?light:dark;


    return(

                <Card style={{background:theme.uiElements}} className='w-1/2 '>
                    {contextHolder}
                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        initialValues={{remember: true}}
                        onFinish={onFormFinish}
                        onFinishFailed={onFormFinishFailed}
                    >
                        <Heading title={'Account Recovery'} subtitle='Reset Password'/>

                        <Form.Item label="Enter Code" name="code">
                            <Input.OTP size={"large"} onChange={CheckCode}/>
                        </Form.Item>
                        <Form.Item rules={rules.password} label="Password" name="password">
                            <Input.Password disabled={!active} size='large'/>
                        </Form.Item>
                        <Form.Item rules={rules.confirm} label="Confirm Password" name="confirm">
                            <Input.Password disabled={!active} size={"large"}/>
                        </Form.Item>

                        <div className='py-10'>
                            <button style={{background: theme.button}}
                                    className='w-full h-10 rounded-xl text-xl font-sans text-white'>Get code
                            </button>

                        </div>
                    </Form>
                </Card>
    )
}

export default ResetPassword