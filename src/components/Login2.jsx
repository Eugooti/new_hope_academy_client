import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import loginImg from '../assets/loginimg.jpg'

const LoginPage = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="flex h-screen bg-white">
            <div className="w-1/2 bg-blue-100 flex items-center justify-center">
                <img
                    src={loginImg}
                    alt="Login illustration"
                    className="max-w-md"
                />
            </div>
            <div className="w-1/2 bg-blue-500 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Welcome Back!</h2>
                    <p className="text-center mb-6 text-gray-600">
                        Don't have an account yet? <a href="#" className="text-blue-500">Sign Up</a>
                    </p>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
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
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} size={"large"} placeholder="Username" />
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
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                size={"large"}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Keep me logged in</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot float-right text-blue-500" href="">
                                Forgot password?
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;