import  { useState, useEffect } from 'react';
import { Card, Avatar, Typography, Tag, Progress, List, Space, Descriptions, Spin } from 'antd';
import {  BookOutlined, TrophyOutlined, CalendarOutlined, PhoneOutlined, MailOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Combined mock data
const mockLearner = {
    name: "John Doe",
    admissionNumber: "ABC123",
    class: "10A",
    age: 16,
    email: "john.doe@example.com",
    phone: "+123456789",
    address: "123 Elm Street, Springfield",
    guardian: {
        name: "Jane Doe",
        phone: "+987654321",
        email: "jane.doe@example.com"
    },
    performance: {
        math: "A",
        english: "B+",
        science: "A-"
    },
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
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

const LearnerProfile = () => {
    const [learner, setLearner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating an API call
        setTimeout(() => {
            setLearner(mockLearner);
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl shadow-lg">

            <Card className="bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                        <Avatar size={128} src={learner.profilePic} className="mb-4 border-4 border-indigo-300" />
                        <Title level={2} className="text-indigo-700 mb-2">{learner.name}</Title>
                        <Tag color="blue" className="text-sm mb-2">Admission No: {learner.admissionNumber}</Tag>
                        <Tag color="green" className="text-sm mb-2">Class: {learner.class}</Tag>
                        <Text type="secondary" className="text-center">{learner.email}</Text>
                    </div>

                    <div className="md:w-2/3 md:pl-8">
                        <Descriptions title="Personal Information" bordered column={1} className="mb-6">
                            <Descriptions.Item label="Age">{learner.age}</Descriptions.Item>
                            <Descriptions.Item label="Phone"><PhoneOutlined className="mr-2" />{learner.phone}</Descriptions.Item>
                            <Descriptions.Item label="Email"><MailOutlined className="mr-2" />{learner.email}</Descriptions.Item>
                            <Descriptions.Item label="Address"><HomeOutlined className="mr-2" />{learner.address}</Descriptions.Item>
                        </Descriptions>

                        <Descriptions title="Guardian Information" bordered column={1} className="mb-6">
                            <Descriptions.Item label="Name"><TeamOutlined className="mr-2" />{learner.guardian.name}</Descriptions.Item>
                            <Descriptions.Item label="Phone"><PhoneOutlined className="mr-2" />{learner.guardian.phone}</Descriptions.Item>
                            <Descriptions.Item label="Email"><MailOutlined className="mr-2" />{learner.guardian.email}</Descriptions.Item>
                        </Descriptions>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-indigo-50 border-indigo-200">
                                <Title level={4} className="flex items-center text-indigo-700 mb-4">
                                    <BookOutlined className="mr-2" /> Academic Progress
                                </Title>
                                <List
                                    dataSource={learner.subjects}
                                    renderItem={subject => (
                                        <List.Item className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                            <div className="flex items-center mb-2 md:mb-0">
                                                <Text className="mr-4 w-24">{subject.name}</Text>
                                                <Tag color="blue">{learner.performance[subject.name.toLowerCase()] || 'N/A'}</Tag>
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
                                    <TrophyOutlined className="mr-2" /> Achievements
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
                                    <CalendarOutlined className="mr-2" /> Upcoming Events
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
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default LearnerProfile;