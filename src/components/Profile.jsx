import  { useState } from 'react';
import {Input, Spin,  Descriptions, Card, List, Tag, Progress, Space, Typography} from 'antd';
import {
    BookOutlined, CalendarOutlined,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
    SearchOutlined,
    TeamOutlined,
    TrophyOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Mock search function to simulate fetching data
const fetchLearnerData = (admissionNo, setLoading, setLearner) => {
    setLoading(true);
    setTimeout(() => {
        const mockLearner = {
            name: 'John Doe',
            admissionNo: 'ABC123',
            class: '10A',
            age: 16,
            email: 'john.doe@example.com',
            phone: '+123456789',
            address: '123 Elm Street, Springfield',
            guardian: {
                name: 'Jane Doe',
                phone: '+987654321',
                email: 'jane.doe@example.com'
            },
            performance: {
                math: 'A',
                english: 'B+',
                science: 'A-'
            },
            profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
            subjects: [
                { name: "Mathematics", progress: 90 },
                { name: "English", progress: 85 },
                { name: "Science", progress: 88 },
                { name: "History", progress: 82 }
            ],
            achievements: [
                { date: "2024-05-15", title: "First Place in Math Olympiad" },
                { date: "2024-03-10", title: "Best Science Project Award" },
                { date: "2024-02-20", title: "Student of the Month" }
            ],
            upcomingEvents: [
                { date: "2024-06-01", title: "Final Exams", description: "All subjects" },
                { date: "2024-06-15", title: "Science Fair", description: "Present your project" },
                { date: "2024-06-30", title: "Summer Camp", description: "Leadership skills workshop" }
            ]
        };
        setLearner(mockLearner);
        setLoading(false);
    }, 2000);
};

const LearnerProfile = () => {
    const [admissionNo, setAdmissionNo] = useState('');
    const [loading, setLoading] = useState(false);
    const [learner, setLearner] = useState(null);

    const handleSearch = () => {
        fetchLearnerData(admissionNo, setLoading, setLearner);
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            {/* Search Section */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-blue-500 mb-4">Search Learner Profile</h1>
                <Input
                    size="large"
                    placeholder="Enter Admission Number"
                    prefix={<SearchOutlined />}
                    onChange={(e) => setAdmissionNo(e.target.value)}
                    onPressEnter={handleSearch}
                    className="max-w-md mx-auto mb-6"
                />
            </div>

            {/* Loader */}
            {loading && (
                <div className="flex justify-center items-center h-40">
                    <Spin size="large" />
                </div>
            )}

            {/* Learner Profile Section */}
            {learner && (
                <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg">
                    <div className="flex items-center space-x-6 mb-8">
                        {/* Profile Picture */}
                        <img
                            className="h-24 w-24 rounded-full object-cover border-4 border-blue-500"
                            src={learner.profilePic}
                            alt={learner.name}
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{learner.name}</h2>
                            <p className="text-sm text-blue-400">Admission No: {learner.admissionNo}</p>
                            <p className="text-sm text-gray-400">{learner.email}</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <Descriptions className="bg-gray-700 p-4 rounded-md mb-6"
                                      title={<h3 className="text-xl font-semibold text-blue-500 mb-3">Personal Information</h3>}
                                      bordered column={1}>
                            <Descriptions.Item label="Age">{learner.age}</Descriptions.Item>
                            <Descriptions.Item label="Phone"><PhoneOutlined className="mr-2"/>{learner.phone}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email"><MailOutlined className="mr-2"/>{learner.email}
                            </Descriptions.Item>
                            <Descriptions.Item label="Address"><HomeOutlined className="mr-2"/>{learner.address}
                            </Descriptions.Item>
                        </Descriptions>

                        <Descriptions
                            title={<h3 className="text-xl font-semibold text-blue-500 mb-3">Guardian Information</h3>}
                            bordered column={1} className="bg-gray-700 p-4 rounded-md mb-6">
                            <Descriptions.Item label="Name"><TeamOutlined className="mr-2"/>{learner.guardian.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone"><PhoneOutlined className="mr-2"/>{learner.guardian.phone}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email"><MailOutlined className="mr-2"/>{learner.guardian.email}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-indigo-50 border-indigo-200">
                            <Title level={4} className="flex items-center text-indigo-700 mb-4">
                                <BookOutlined className="mr-2"/> Academic Progress
                            </Title>
                            <List
                                dataSource={learner.subjects}
                                renderItem={subject => (
                                    <List.Item
                                        className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                        <div className="flex items-center mb-2 md:mb-0">
                                            <Text className="mr-4 w-24">{subject.name}</Text>
                                            <Tag
                                                color="blue">{learner.performance[subject.name.toLowerCase()] || 'N/A'}</Tag>
                                        </div>
                                        <Progress
                                            percent={subject.progress}
                                            size="small"
                                            strokeColor="#4F46E5"
                                            className="w-full md:w-1/2"
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card className="bg-green-50 border-green-200">
                            <Title level={4} className="flex items-center text-green-700 mb-4">
                                <TrophyOutlined className="mr-2"/> Achievements
                            </Title>
                            <List
                                dataSource={learner.achievements}
                                renderItem={achievement => (
                                    <List.Item>
                                        <Tag color="green" className="mr-2">{achievement.date}</Tag>
                                        <Text>{achievement.title}</Text>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card className="bg-amber-50 border-amber-200 md:col-span-2">
                            <Title level={4} className="flex items-center text-amber-700 mb-4">
                                <CalendarOutlined className="mr-2"/> Upcoming Events
                            </Title>
                            <List
                                dataSource={learner.upcomingEvents}
                                renderItem={event => (
                                    <List.Item>
                                        <Space>
                                            <Tag color="orange">{event.date}</Tag>
                                            <Text strong>{event.title}</Text>
                                            <Text type="secondary">{event.description}</Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </div>


                    {/* Guardian Information */}
                    {/*<div className="bg-gray-700 p-4 rounded-md mb-6">*/}
                    {/*    <h3 className="text-xl font-semibold text-blue-500 mb-3">Guardian Information</h3>*/}
                    {/*    <p><span className="text-gray-400">Name:</span> {learner.guardian.name}</p>*/}
                    {/*    <p><span className="text-gray-400">Phone:</span> {learner.guardian.phone}</p>*/}
                    {/*    <p><span className="text-gray-400">Email:</span> {learner.guardian.email}</p>*/}
                    {/*</div>*/}

                    {/* Academic Performance */}
                    {/*<div className="bg-gray-700 p-4 rounded-md">*/}
                    {/*    <h3 className="text-xl font-semibold text-blue-500 mb-3">Academic Performance</h3>*/}
                    {/*    <div className="grid grid-cols-3 gap-4 text-sm">*/}
                    {/*        <div>*/}
                    {/*            <p className="text-gray-400">Mathematics</p>*/}
                    {/*            <p>{learner.performance.math}</p>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <p className="text-gray-400">English</p>*/}
                    {/*            <p>{learner.performance.english}</p>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <p className="text-gray-400">Science</p>*/}
                    {/*            <p>{learner.performance.science}</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            )}
        </div>
    );
};

export default LearnerProfile;
