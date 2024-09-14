import {Card, Form, Input, message} from "antd";
import {useForm} from "antd/es/form/Form.js";
import Heading from "../../components/heading/Heading.jsx";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Link from "antd/es/typography/Link.js";
import {login} from "../../redux/Reducers/authSlice.js";
import {useState} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import RecoverModal from "../../components/modals/modal.jsx";
import {useTheme} from "../../context/ThemeContext/ThemeContext.jsx";
import {useDispatch, useSelector} from "react-redux";
import Button from "antd/es/button/index.js";

const Login = () => {
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate=useNavigate();
    const location=useLocation()

    const from=location.state?.from?.pathname || `/`


    const [open, setOpen] = useState(false);

    const handleYes = () => {
        navigate('/getCode')
    }
    const dispatch=useDispatch()
    const {loading}=useSelector((state)=>state.auth)

    const onFormFinish = async (values) => {
        // todo handle form finish
        await dispatch(login(values)).then((action)=>{
            action.error?
                messageApi.error(action.payload.message):
                messageApi.success(action.payload.message).then(()=>navigate(from))
        })
    };

    const rules={
        username:[{required:true,message:'Username is required!'},{type:'email',message:'Enter valid email'}],
        password:[{required:true,message:'Password is required!'}],
    }

    const {light,dark,lightTheme}=useTheme()
    const theme=!lightTheme?light:dark;


    return (

                <>
                    {contextHolder}
                    <div style={{background:theme.bg,color:theme.text, minHeight:'100vh'}} className=' grid grid-cols-1 lg:gap-5 md:grid-cols-2 items-center justify-items-center '>
                        <Heading title={'New Hope Academy'} subtitle={'School Portal'}/>
                        <div className='w-full'>
                            <Card style={{background:theme.uiElements}} className='w-full'>

                                <div >
                                    <Heading title={'Welcome Back!'} subtitle={'Login'}/>
                                    <Form
                                        className='grid grid-cols-1 gap-2'
                                        form={form}
                                        name="basic"
                                        layout="vertical"
                                        initialValues={{remember: true}}
                                        onFinish={onFormFinish}
                                    >

                                        <Form.Item rules={rules.username} label="Username" name="username">
                                            <Input
                                                className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                prefix={<UserOutlined/>}
                                                placeholder={"test@example.com"}
                                                size='large'>
                                            </Input>
                                        </Form.Item>
                                        <Form.Item rules={rules.password} label="Password" name="password">
                                            <Input.Password
                                                className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                prefix={<LockOutlined/>}
                                                size='large'/>

                                        </Form.Item>

                                        <div className='py-10'>
                                            <Button
                                                loading={loading}
                                                style={{background:theme.button}}
                                                className='hover:bg-blue-950 h-10 w-full rounded-xl text-xl font-sans text-white'
                                                htmlType='submit'
                                                type="primary">
                                                {loading?"Signing in...":"Sign in"}
                                            </Button>

                                            <Link onClick={()=>navigate('/getCode')} >
                                                Forgot password?
                                            </Link>

                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <RecoverModal handleYes={handleYes} setOpen={setOpen} open={open}/>
                </>
    )
}

export default Login
