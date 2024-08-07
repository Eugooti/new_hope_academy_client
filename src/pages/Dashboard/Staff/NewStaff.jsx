import { useForm } from 'antd/es/form/Form';
import { addStaff } from '../../../redux/Reducers/AdminSlice/staffSlice';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Form, Input, message, Select} from 'antd';
import {
    BankOutlined,
    IdcardOutlined,
    MailOutlined,
    MoneyCollectOutlined,
    PhoneOutlined,
    UserOutlined
} from '@ant-design/icons';
import {LocationOn} from "@mui/icons-material";
import Heading from '../../../components/heading/Heading';
import {getFromLocalStorage} from "../../../utils/LocalStorage/localStorage.jsx";

const { Option } = Select;

const NewStaff = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const { loading } = useSelector((state) => state.staff);


    const user = getFromLocalStorage('user')
    const onFormFinish = async (values) => {
        const userData = {
            ...values,
            createdBy: user?.email
        };


        console.log(userData);
        await dispatch(addStaff(userData)).then((action) => {
          console.log(action);
          if (action.error) {
            messageApi.error(action.payload?.message);
          } else {
            messageApi.success(action.payload?.message).then(() => form.resetFields());
          }
        });
    };

    const onFormFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const schoolSubjects = [
        'Mathematics', 'English', 'Science', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology',
        'Physical Education', 'Art', 'Music', 'Computer Science', 'Economics', 'Business Studies',
        'Political Science', 'Psychology', 'Sociology', 'Philosophy', 'Literature', 'Foreign Language',
        'Environmental Science', 'Health Education', 'Drama', 'Religious Studies', 'Technology',
        'Engineering', 'Accounting', 'Statistics', 'Home Economics', 'Astronomy'
    ];
    const Subjects = schoolSubjects.map((item)=>({
        label:item,
        value:item
    }))

    const schoolRoles = [
        'Principal', 'Vice Principal', 'Teacher', 'Student', 'Parent', 'Administrator',
        'Counselor', 'Librarian', 'Coach', 'Janitor', 'Secretary', 'IT Support',
        'Nurse', 'Cafeteria Staff', 'Security Guard', 'Board Member', 'Volunteer',
        'Bus Driver', 'Teacher Assistant'
    ];

    const roles = schoolRoles.map((item)=>({
        value:item,
        label:item
    }))

    const teacherQualifications = [
        'Bachelor of Education (B.Ed)', 'Master of Education (M.Ed)', 'Doctor of Education (Ed.D)',
        'Bachelor of Arts in Education (B.A.Ed)', 'Bachelor of Science in Education (B.Sc.Ed)',
        'Master of Arts in Education (M.A.Ed)', 'Master of Science in Education (M.Sc.Ed)',
        'Postgraduate Certificate in Education (PGCE)', 'Graduate Diploma in Education', 'Teaching Certification', 'National Board Certification',
        'TESOL Certification', 'Special Education Certification', 'Early Childhood Education Certification',
        'Educational Leadership Certification', 'Advanced Diploma in Education', 'Diploma in Elementary Education',
        'Certificate in Teaching', 'Associate Degree in Education', 'Professional Development Courses'
    ];

    const Qualifications = teacherQualifications.map(item=>({
        value:item,
        label:item
    }))

    return (
        <>
            {contextHolder}
            <Heading title='New Staff' subtitle='Create a New User Account.' />
            <Form
                form={form}
                name="createUser"
                className='py-4'
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >
                <div className='grid md:grid-cols-2 gap-x-8'>
                    <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Required Field' }]}>
                        <Input prefix={<UserOutlined />} size='large' />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Required Field' }]}>
                        <Input prefix={<UserOutlined />} size='large' />
                    </Form.Item>
                    <Form.Item label="ID Number" name="idNumber" rules={[{ required: true, message: 'Required Field' }]}>
                        <Input prefix={<IdcardOutlined />} size='large' />
                    </Form.Item>
                    <Form.Item label="Gender" name='gender' rules={[{ required: true, message: 'Required Field' }]}>
                        <Select placeholder="Select Gender" size={"large"}>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Gmail Account" name="email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
                        <Input prefix={<MailOutlined />} size='large' />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Required Field' }]}>
                        <Input prefix={<PhoneOutlined />} size='large' />
                    </Form.Item>
                    <Form.Item label='Address' name='address' rules={[{required:true,message:"Required Field"}]}>
                        <Input prefix={<LocationOn/>} size={"large"}/>
                    </Form.Item>
                    <Form.Item label="Salary" name="salary" rules={[{ required: true, message: 'Required Field' }]}>
                        <Input prefix={<MoneyCollectOutlined />} size='large' />
                    </Form.Item>
                    <Form.Item label="Bank Account" name="accountNumber" rules={[{ required: true, message: 'Required Field' }]}>
                        <Input prefix={<BankOutlined />} size='large' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Required Field' }]}
                        label="Subjects" name="subjects">
                        <Select
                            options={Subjects}
                            placeholder="Select Subjects"
                            mode={"tags"}
                            size={"large"}
                            className='w-full'
                            tokenSeparators={[',']}
                        />
                    </Form.Item>
                    <Form.Item label="Roles" name="roles">
                        <Select
                            mode={"tags"}
                            placeholder="Select Roles"
                            size={"large"}
                            options={roles}
                            tokenSeparators={[',']}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Required Field' }]}
                        label="Qualification" name="qualifications">
                        <Select
                            mode={"tags"}
                            placeholder="Select Qualifications"
                            size={"large"}
                            tokenSeparators={[',']}
                            className='w-full'
                            options={Qualifications}
                        />

                    </Form.Item>

                </div>
                <div className='flex align-middle justify-center pt-6'>
                    <Button type={"primary"} loading={loading} className='h-10 w-full md:w-1/2 bg-blue-900 rounded-xl text-lg text-white font-bold hover:bg-blue-950' htmlType="submit">
                        {loading ? "Creating..." : "Create User"}
                    </Button>

                </div>
            </Form>
        </>
    );
};

export default NewStaff;
