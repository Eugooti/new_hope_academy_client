import {useForm} from "antd/es/form/Form.js";
import {Card, Form, Input, message} from "antd";
import Heading from "../../components/heading/Heading.jsx";
import {UserOutlined} from "@ant-design/icons";
import Button from "antd/es/button/index.js";
import {CodeRecovery} from "./PasswordRecovery.js";
import {useNavigate} from "react-router-dom";
import {useTheme} from "../../context/ThemeContext/ThemeContext.jsx";

const PasswordRecovery = () => {

    const [form] = useForm();
    const navigate=useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const onFormFinish = async (values) => {
        // todo handle form finish
        // console.log("onFormFinish", values);
        await CodeRecovery(values.staffId).then((result)=>{
            if (result.success){
                messageApi.success(result.message);
            }else {
                messageApi.error(result.message);
            }
        })
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log("onFormFinishFailed", errorInfo);
    };

    const {light,dark,lightTheme}=useTheme()
    const theme=!lightTheme?light:dark;

    return(

                  <Card style={{background:theme.uiElements}} className='w-1/3 '>
                      {contextHolder}
                      <Form
                          form={form}
                          name="recovery"
                          layout="vertical"
                          initialValues={{remember: true}}
                          onFinish={onFormFinish}
                          onFinishFailed={onFormFinishFailed}
                          className='w-full px-3'
                      >
                          <Heading title={'Unable to sign'} subtitle='Account Recovery'/>

                          <Form.Item label="User ID" name="staffId">
                              <Input size='large' prefix={<UserOutlined/>}/>
                          </Form.Item>

                          <div className='py-10'>
                              <button style={{background:theme.button}} className='w-full h-10 rounded-xl text-xl font-sans text-white'>Get code</button>
                              <Button type="link"  onClick={()=>navigate('/login')}>
                                  Go to back to sign in
                              </Button>

                          </div>

                      </Form>
                  </Card>

    )

}

export default PasswordRecovery