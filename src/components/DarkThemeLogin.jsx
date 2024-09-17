import {Button, Checkbox, ConfigProvider, FloatButton, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useTheme} from "../context/ThemeContext/ThemeContext2.jsx";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/Reducers/authSlice.js";
import {useNavigate} from "react-router-dom";
import AuthImage from '../assets/authIMG.png'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';



const DarkLoginPage = () => {
    const { currentTheme, isDarkTheme, toggleTheme } = useTheme();
    const navigate=useNavigate();
    const from=location.state?.from?.pathname || `/`
    const dispatch=useDispatch()
    const {loading}=useSelector((state)=>state.auth)
    const [messageApi, contextHolder] = message.useMessage();
    const onFormFinish = async (values) => {
        // todo handle form finish
        await dispatch(login(values)).then((action)=>{
            action.error?
                messageApi.error(z):
                messageApi.success(action.payload.message).then(()=>navigate(from))
        })
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: currentTheme.primary,
                    colorBgContainer: currentTheme.surface,
                    colorText: currentTheme.text,
                    colorTextSecondary: currentTheme.subtext,
                },
            }}
        >
            {contextHolder}
            <div className={`flex w-full h-screen transition-colors duration-300`} style={{ backgroundColor: currentTheme.background }}>
                <div className="w-1/2 flex items-center justify-center" style={{ backgroundColor: currentTheme.surface }}>
                    <img
                        src={AuthImage}
                        alt="Login illustration"
                        className="max-w-md"
                    />
                </div>
                <div className="w-1/2 flex items-center justify-center" style={{ backgroundColor: currentTheme.background }}>
                    <div className="p-8 rounded-lg shadow-md w-96" style={{ backgroundColor: currentTheme.surface }}>
                        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: currentTheme.primary }}>Welcome Back!</h2>
                        <p className="text-center mb-6" style={{ color: currentTheme.subtext }}>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Don't have an account yet? <a href="#" style={{ color: currentTheme.secondary }}>Sign Up</a>
                        </p>
                        <FloatButton onClick={toggleTheme} icon={isDarkTheme?<DarkModeIcon/>:<LightModeIcon/>}/>


                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFormFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input size={"large"} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    size={"large"}
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Keep me logged in</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot float-right" href="" style={{ color: currentTheme.secondary }}>
                                    Forgot password?
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    loading={loading}
                                    style={{background:currentTheme.primary}}
                                    className='hover:bg-blue-950 h-10 w-full rounded-xl text-xl font-sans text-white'
                                    htmlType='submit'
                                    type="primary">
                                    {loading?"Signing in...":"Sign in"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default DarkLoginPage;