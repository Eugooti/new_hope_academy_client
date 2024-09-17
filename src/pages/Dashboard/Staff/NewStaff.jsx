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
import {useTheme} from "../../../context/ThemeContext/ThemeContext2.jsx";

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
            createdBy: user.employeeNo
        };
        await dispatch(addStaff(userData)).then((action) => {
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

    // const schoolSubjects = [
    //     'Mathematics', 'English', 'Science', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology',
    //     'Physical Education', 'Art', 'Music', 'Computer Science', 'Economics', 'Business Studies',
    //     'Political Science', 'Psychology', 'Sociology', 'Philosophy', 'Literature', 'Foreign Language',
    //     'Environmental Science', 'Health Education', 'Drama', 'Religious Studies', 'Technology',
    //     'Engineering', 'Accounting', 'Statistics', 'Home Economics', 'Astronomy'
    // ];
    // const Subjects = schoolSubjects.map((item)=>({
    //     label:item,
    //     value:item
    // }))

    const schoolRoles = [
        'admin', 'principal', 'vicePrincipal', 'administrativeStaff', 'classTeacher', 'teachingStaff',
        'departmentHead', 'teacher', 'teachingAssistant', 'guidanceCounselor', 'specialEducationTeacher', 'schoolNurse',
        'itDirector', 'itSupportStaff', 'librarian', 'facilitiesManager', 'custodialStaff',
        'athleticDirector', 'coach','clubAdvisor','financeDirector','accountant','hrDirector','hrStaff','cafeteriaManager'
        ,'cafeteriaStaff','publicRelationsOfficer','ptaMember','securityDirector','securityGuard','transportationDirector'
        ,'busDriver','transportationCoordinator','student','parent','guest'
    ];

    const schRoles = [
        {label:"Admin",value:"admin"},{label: 'Principal',value:"principal"},{label: 'vice Principal',value:"vicePrincipal"},
        {label:"Administrative Staff",value:"administrativeStaff"},{label: 'ClassTeacher',value:"classTeacher"},
        {label: 'Teaching Staff',value:"teachingStaff"}, {label:"Department Head",value:"departmentHead"},
        {label: 'Teacher',value:"teacher"},{label: 'Teaching Assistant',value:"teachingAssistant"},
        {label:"Guidance Counselor",value:"guidanceCounselor"},{label: 'Special Education Teacher',value:"specialEducationTeacher"},
        {label: 'School Nurse',value:"schoolNurse"}, {label:"IT Director",value:"itDirector"},{label: 'IT SupportStaff',value:"itSupportStaff"},
        {label: 'Librarian',value:"librarian"},{label:"Facilities Manager",value:"facilitiesManager"},{label:"Custodial Staff",value:"custodialStaff"},
        {label:"Athletic Director",value:"athleticDirector"},{label:"Coach",value:"coach"},{label:"Club Advisor",value:"clubAdvisor"},
        {label:"Finance Director",value:"financeDirector"},
        {label:"Accountant",value:"accountant"},{label:"HR Director",value:"hrDirector"},{label:"HR Staff",value:"hrStaff"},
        {label:"Cafeteria Manager",value:"cafeteriaManager"},
        {label:"Cafeteria Staff",value:"cafeteriaStaff"},{label:"Public Relations Officer",value:"publicRelationsOfficer"},
        {label:"PTA Member",value:"ptaMember"},{label:"Security Director",value:"securityDirector"},
        {label:"Security Guard",value:"securityGuard"},{label:"Transportation Director",value:"transportationDirector"},
        {label:"Bus Driver",value:"busDriver"},{label:"Transportation Coordinator",value:"transportationCoordinator"},
        {label:"Student",value:"student"},{label:"Parent",value:"parent"},{label:"Guest",value:"guest"}
    ]

    // const roles = schoolRoles.map((item)=>({
    //     value:item,
    //     label:item
    // }))

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

    const {currentTheme} = useTheme()

    const selectStyles = {
        backgroundColor: currentTheme.surface,
        color: currentTheme.text,
        borderColor: currentTheme.border,
    }

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
                    <Form.Item label="First Name" name="firstname" rules={[{ required: true, message: 'Required Field' }]}>
                        <Input prefix={<UserOutlined />} size='large' />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Required Field' }]}>
                        <Input prefix={<UserOutlined />} size='large' />
                    </Form.Item>
                    <Form.Item label="ID Number" name="idNumber" rules={[{ required: true, message: 'Required Field' }]}>
                        <Input prefix={<IdcardOutlined />} size='large' />
                    </Form.Item>
                    <Form.Item label="Gender" name='gender' rules={[{ required: true, message: 'Required Field' }]}>
                        <Select
                            style={selectStyles}
                            dropdownStyle={{
                                backgroundColor: currentTheme.surface,
                            }}
                            placeholder="Select Gender" size={"large"}>
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
                    <Form.Item label="Bank Account" name="bankAccount" rules={[{ required: true, message: 'Required Field' }]}>
                        <Input prefix={<BankOutlined />} size='large' />
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    rules={[{ required: true, message: 'Required Field' }]}*/}
                    {/*    label="Subjects" name="subjects">*/}
                    {/*    <Select*/}
                    {/*        options={Subjects}*/}
                    {/*        placeholder="Select Subjects"*/}
                    {/*        mode={"tags"}*/}
                    {/*        size={"large"}*/}
                    {/*        className='w-full'*/}
                    {/*        tokenSeparators={[',']}*/}
                    {/*    />*/}
                    {/*</Form.Item>*/}
                    <Form.Item label="Roles" name="roles">
                        <Select
                            style={{...selectStyles,width: '100%' }}
                            dropdownStyle={{
                                backgroundColor: currentTheme.surface,
                            }}
                            mode={"tags"}
                            placeholder="Select Roles"
                            size={"large"}
                            options={schRoles}
                            tokenSeparators={[',']}
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Required Field' }]}
                        label="Qualification" name="qualifications">
                        <Select
                            style={selectStyles}
                            dropdownStyle={{
                                backgroundColor: currentTheme.surface,
                            }}
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
