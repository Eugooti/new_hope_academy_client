import {useEffect, useState} from 'react';
import {Avatar, Button, Card, Form, Input, List, message, Typography} from 'antd';
import 'tailwindcss/tailwind.css';
import dp from '../../../assets/team-2.jpg'
import {updatePassword} from "../../../redux/Reducers/authSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {getFromLocalStorage} from "../../../utils/LocalStorage/localStorage.jsx";
import {useNavigate} from "react-router-dom";
import {readUserSchedule} from "../../../redux/Reducers/AdminSlice/scheduleSlice.js";


const { Title, Text } = Typography;

const TeacherProfile = () => {
    const navigate = useNavigate()
    const teacher = {
        name: 'John Doe',
        designation: 'Mathematics Teacher',
        email: 'john.doe@example.com',
        phone: '+123456789',
        address: '123 School Lane, Education City',
        subjects: ['Mathematics', 'Physics'],
        experience: '10 years',
        qualifications: 'M.Sc in Mathematics, B.Ed',
        schedule: [
            { day: 'Monday', time: '09:00 - 10:00', subject: 'Mathematics' },
            { day: 'Tuesday', time: '11:00 - 12:00', subject: 'Physics' },
            { day: 'Wednesday', time: '09:00 - 10:00', subject: 'Mathematics' },
            { day: 'Thursday', time: '11:00 - 12:00', subject: 'Physics' },
            { day: 'Friday', time: '09:00 - 10:00', subject: 'Mathematics' },
        ]
    };

    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [isProfileFormVisible, setIsProfileFormVisible] = useState(false);
    const [isPasswordFormVisible, setIsPasswordFormVisible] = useState(false);

    const handleUpdateProfile = (values) => {
        // Handle profile update logic here
        setIsProfileFormVisible(false); // Hide form after submission
    };



    const dispatch=useDispatch();

    const user=getFromLocalStorage('user')
    const [messageApi, contextHolder] = message.useMessage();
    const {loading}=useSelector((state) => state.staff)
    const handleChangePassword = (values) => {
        // Handle password change logic here
        dispatch(updatePassword({id:user?.staffId,password:values.newPassword})).then((action)=>{
            if (action.error){
                messageApi.error(action.payload?.message)
            }else {
                messageApi.success(action.payload?.message).then(()=>setIsPasswordFormVisible(false))// Hide form after submission
            }

        })
    };

    const {userSchedules} = useSelector((state)=>state.schedule)

    useEffect( () => {
        const uID = user?.staffId
         dispatch(readUserSchedule(uID))
    }, [dispatch]);

    console.log(userSchedules && userSchedules.result.weekSchedule)


    const [schedule, setSchedule] = useState();
    useEffect(() => {
        const day = new Date()
        if (userSchedules && userSchedules.success){
            const daySchedule = userSchedules?.result.weekSchedule.some(item => item.day === day.getDay())
            setSchedule(daySchedule)
        }

    }, [userSchedules]);

    console.log(schedule)

    return (
        <div className="p-4">
            {contextHolder}
            <Card className="shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                    <Avatar size={100} src={dp} />
                    <div>
                        <Title level={3} className="mb-0">{`${user?.firstName} ${user?.lastName}`}</Title>
                        <Text type="secondary">{teacher.designation}</Text>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Title level={4}>Personal Information</Title>
                        <List>
                            <List.Item>
                                <Text strong>Email: </Text><Text>{user?.email}</Text>
                            </List.Item>
                            <List.Item>
                                <Text strong>Phone: </Text><Text>{user?.phone}</Text>
                            </List.Item>
                            <List.Item>
                                <Text strong>Address: </Text><Text>{teacher.address}</Text>
                            </List.Item>
                        </List>
                    </div>
                    <div>
                        <Title level={4}>Professional Information</Title>
                        <List>
                            <List.Item>
                                <Text strong>Subjects: </Text><Text>{user?.subjects.join(', ')}</Text>
                            </List.Item>
                            <List.Item>
                                <Text strong>Experience: </Text><Text>{teacher.experience}</Text>
                            </List.Item>
                            <List.Item>
                                <Text strong>Qualifications: </Text><Text>{user?.qualifications.join(', ')}</Text>
                            </List.Item>
                        </List>
                    </div>
                </div>
                <div className="mt-4">
                    <div className='flex align-middle justify-between px-2'>
                        <Title level={4}>Schedule</Title>
                        <Button onClick={()=>navigate('/schedule-setting')} type="link">Create Schedule</Button>
                    </div>


                    <List
                        bordered
                        dataSource={teacher.schedule}
                        renderItem={item => (
                            <List.Item>
                                <Text strong>{item.day}: </Text><Text>{item.time} - {item.subject}</Text>
                            </List.Item>
                        )}
                    />
                </div>
                <div className="mt-8">
                    <Title level={4}>Security</Title>
                    <div className="flex space-x-4">
                        <Button type="primary" onClick={() => setIsProfileFormVisible(!isProfileFormVisible)}>
                            {isProfileFormVisible ? 'Cancel Update Profile' : 'Update Profile'}
                        </Button>
                        <Button type="primary" onClick={() => setIsPasswordFormVisible(!isPasswordFormVisible)}>
                            {isPasswordFormVisible ? 'Cancel Change Password' : 'Change Password'}
                        </Button>
                    </div>
                    {isProfileFormVisible && (
                        <div className="mt-4">
                            <Title level={5}>Update Profile</Title>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleUpdateProfile}
                                initialValues={{
                                    email: teacher.email,
                                    phone: teacher.phone,
                                    address: teacher.address,
                                }}
                            >
                                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                    <Input size={"large"}/>
                                </Form.Item>
                                <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                                    <Input size={"large"}/>
                                </Form.Item>
                                <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                                    <Input size={"large"}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Update Profile</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                    {isPasswordFormVisible && (
                        <div className="mt-4">
                            <Title level={5}>Change Password</Title>
                            <Form
                                form={passwordForm}
                                layout="vertical"
                                onFinish={handleChangePassword}
                            >
                                {/*<Form.Item name="oldPassword" label="Old Password" rules={[{ required: true }]}>*/}
                                {/*    <Input.Password  size={"large"}/>*/}
                                {/*</Form.Item>*/}
                                <Form.Item name="newPassword" label="New Password" rules={[{ required: true, min: 6 }]}>
                                    <Input.Password  size={"large"}/>
                                </Form.Item>
                                <Form.Item name="confirmPassword" label="Confirm Password" dependencies={['newPassword']} rules={[
                                    { required: true, min: 6 },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}>
                                    <Input.Password  size={"large"}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">{loading?'Updating...':"Change Password"}</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default TeacherProfile;
