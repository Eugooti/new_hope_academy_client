  import Heading from "../../components/heading/Heading.jsx";
import UserCalendar from "../../components/DatePicker/Calendar.jsx";
import {Collapse, Progress, Card, Col, Row, Statistic, Skeleton, Avatar} from "antd";
import './Dashboard.css'
import {CaretRightOutlined,ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import Dp1 from "../../assets/team-1.jpg"
import Dp2 from "../../assets/team-2.jpg"
import Dp3 from "../../assets/team-3.jpg"
import Dp4 from "../../assets/team-4.jpg"
import Dp5 from "../../assets/team-5.jpg"
import LearnerCard from "../../components/LearnerCard/LearnerCard.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchDepartments} from "../../redux/Reducers/AdminSlice/departmentSlice.js";
import {useTheme} from "../../context/ThemeContext/ThemeContext2.jsx";
  import ToDoModal from "../../components/modals/ToDoModal.jsx";
  import Button from "antd/es/button/index.js";


  const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const onFinish = () => {
    console.log('finished!');
};
const onChange = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {

    }
};

const Dashboard = () => {

    const Transfers=[
        {name:"Jane Doe",img:Dp1,grade:"one",to:1},
        {name:"Tom Kook",img:Dp2,grade:"seven",to:0},
        {name:"Jim Paul",img:Dp3,grade:"Four",to:1},
        {name:"Jill July",img:Dp4,grade:"Six",to:0},
        {name:"Ken Brian",img:Dp5,grade:"Three",to:0},
    ]
    const conicColors = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#ffccc7',
    }

    const dispatch=useDispatch()
    const {departments,loading} = useSelector((state)=>state.department)
    const [departmentData, setDepartmentData] = useState();
    useEffect(() => {
        dispatch(fetchDepartments())
    }, [dispatch]);

    useEffect(() => {
        if (departments && departments.success){
            const mappedDepartment=departments.result.map((item,index)=>({
                key:index,
                name:item.name,
                id:item.id
            }))
            setDepartmentData(mappedDepartment)
        }
    }, [departments]);


    const population=[90,93,97,88,92,87,95,100].map((item,index)=>({
        value:item,
        label:`Grade ${index+1}`,
    }))

    const {currentTheme} = useTheme()

    const TeachersOnDuty = [
        {
            fullname: "Jane Doe",
            nameInitial: "JD",
            pronoun: "Mrs."
        },
        {
            fullname: "John Smith",
            nameInitial: "JS",
            pronoun: "Mr."
        },
        {
            fullname: "Alice Johnson",
            nameInitial: "AJ",
            pronoun: "Mrs."
        },
        {
            fullname: "Michael Brown",
            nameInitial: "MB",
            pronoun: "Mr."
        },
        {
            fullname: "Emily Davis",
            nameInitial: "ED",
            pronoun: "Mrs."
        },
        {
            fullname: "Robert Wilson",
            nameInitial: "RW",
            pronoun: "Mr."
        }
    ];


    const [openToDo, setOpenToDo] = useState(false);

    const handleOpen = () => {
      setOpenToDo(true)
    }

    const handleYes = () => {
      console.log("Weeeeeeh")
    }

    return(
        <>
        <Heading title={'Dashboard'}/>

          <div className={'grid grid-cols-1 gap-4'}>

              <div>
                  <h2 className="text-xl font-semibold mb-2">School Departments & Clubs.</h2>

                  {loading?
                      <Skeleton />:
                      <>
                          <div className=' cards py-2'>
                              {departmentData?.map((item) => (
                                  <button onClick={() => console.log(item)} key={item.key}
                                          className='h-20 bg-amber-400 hover:bg-amber-500 min-w-28 rounded-xl text-xl'
                                          style={{display: "flex", alignItems: "center", justifyContent: "center",background:currentTheme.primary}}>
                                      {item.name}
                                  </button>
                              ))}
                          </div>

                      </>

                  }

              </div>
              <div className='grid md:grid-cols-2 gap-6'>
                  <div className='flex flex-col w-full h-full overflow-y-auto'>
                      <div className={'flex align-middle justify-between pb-3'}>
                          <h1 style={{color: currentTheme.text}} className='font-bold text-lg mb-3'>Term Dates</h1>
                      </div>

                      <Collapse
                          accordion
                          expandIcon={({ isActive }) => (
                              <CaretRightOutlined rotate={isActive ? 90 : 0} />
                          )}
                      >
                          <Collapse.Panel header="Opening Date" key="1">
                              <p><strong>Date:</strong> 03-01-2025</p>
                              <p>
                                  The first day of the new term. Students are expected to report to school, settle in, and receive schedules for classes and activities.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Opener Exam" key="2">
                              <p><strong>Date:</strong> 15-01-2025</p>
                              <p>
                                  An assessment to gauge students' knowledge at the start of the term. It helps teachers understand students’ strengths and areas that need focus throughout the term.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Mid-Term Exam" key="3">
                              <p><strong>Date:</strong> 22-02-2025</p>
                              <p>
                                  The mid-term exam evaluates student progress and understanding of material covered in the first half of the term. Results help adjust teaching strategies as needed.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Half-Term Break" key="4">
                              <p><strong>Dates:</strong> 23-02-2025 to 28-02-2025</p>
                              <p>
                                  A short break to allow students and teachers to recharge after the mid-term exams. It's a great opportunity for students to review their performance and prepare for the second half of the term.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Closing Date" key="5">
                              <p><strong>Date:</strong> 04-04-2025</p>
                              <p>
                                  The last day of the term. Students will receive final feedback and grades. This is also a time for end-of-term activities and a chance to reflect on achievements and areas for growth.
                              </p>
                          </Collapse.Panel>
                      </Collapse>


                  </div>
                  <div>
                      <div className={'flex align-middle justify-between pb-2'}>
                          <h1 style={{color: currentTheme.text}} className='font-bold text-lg mb-3'>ToDo Items</h1>
                          {/*<button  className='rounded-xl w-20 ml-4' style={{background:currentTheme.secondary,color:currentTheme.text}}>Add New</button>*/}
                          <Button onClick={handleOpen} className='ml-4' type="dashed">Add ToDo</Button>

                      </div>

                      <Collapse
                          accordion
                          expandIcon={({ isActive }) => (
                              <CaretRightOutlined rotate={isActive ? 90 : 0} />
                          )}
                      >
                          <Collapse.Panel header="Prepare Lesson Plan" key="1">
                              <p>
                                  A well-organized lesson plan helps streamline your class session. Begin by identifying learning objectives, mapping out instructional activities, and preparing materials. Be sure to include time for student engagement and assessments.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Design Engaging Activities" key="2">
                              <p>
                                  Create interactive and hands-on activities that cater to diverse learning styles. These might include group work, interactive exercises, or multimedia presentations to encourage active participation and reinforce learning outcomes.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Assess Student Progress" key="3">
                              <p>
                                  Plan formative and summative assessments to gauge student understanding and progress. Use quizzes, assignments, or discussions to monitor learning. Reviewing these results will guide your adjustments for future lessons.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Provide Constructive Feedback" key="4">
                              <p>
                                  Offer feedback that motivates and guides improvement. Be specific, focusing on both strengths and areas for growth. Timely feedback helps students understand their progress and encourages continuous learning.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Reflect and Improve" key="5">
                              <p>
                                  After each lesson, take time to reflect on what went well and what could be improved. Note any challenges and think about how to adjust your strategies for future lessons. Continuous reflection is key to effective teaching.
                              </p>
                          </Collapse.Panel>
                      </Collapse>

                  </div>
                  </div>
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-4'>
                  <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-4">
                      <h1 style={{color:currentTheme.text}} className='font-bold text-lg mb-3'>Recent Transfers</h1>
                      {Transfers.map((item, index) => (
                          <div key={index}>
                              <LearnerCard name={item.name} Img={item.img} grade={item.grade} to={item.to}/>
                          </div>
                      ))}
                  </div>
                  <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-4">
                      <h1 style={{color:currentTheme.text}} className='font-bold text-lg mb-3'>Population Chart</h1>
                      <div className='grid md:grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-3'>
                          {population.map((item,index)=>(
                              <div className='flex justify-center align-middle flex-col' key={index} >
                                  <Progress type="dashboard"  strokeColor={conicColors}   percent={item.value} size={70} />
                                  <label className='ml-4'>{item.label}</label>
                              </div>
                          ))}
                      </div>

                  </div>
                  <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-4">
                      <h1 className='font-bold text-lg mb-3'>Calendar</h1>
                      <UserCalendar/>
                  </div>
                  <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-4">
                      <h1 style={{color:currentTheme.text}} className='font-bold text-lg mb-3'>Teachers on duty</h1>
                      <div className='grid grid-cols-2 gap-4'>
                          {TeachersOnDuty.map((item,index)=>(
                              <div className='flex justify-start align-middle' key={index} >
                                  <Avatar size={"large"}>{item.nameInitial}</Avatar>
                                  <h1 className='pt-3 pl-2'>{`${item.pronoun} ${item.fullname}`}</h1>
                              </div>
                          ))}
                      </div>

                      {/*<Row gutter={16}>*/}
                      {/*    <Col span={12}>*/}
                      {/*        <Card bordered={false}>*/}
                      {/*            <Statistic*/}
                      {/*                title="Admission"*/}
                      {/*                value={11.28}*/}
                      {/*                precision={2}*/}
                      {/*                valueStyle={{*/}
                      {/*                    color: '#3f8600',*/}
                      {/*                }}*/}
                      {/*                prefix={<ArrowUpOutlined />}*/}
                      {/*                suffix="%"*/}
                      {/*            />*/}
                      {/*        </Card>*/}
                      {/*    </Col>*/}
                      {/*    <Col span={12}>*/}
                      {/*        <Card bordered={false}>*/}
                      {/*            <Statistic*/}
                      {/*                title="Transfers"*/}
                      {/*                value={9.3}*/}
                      {/*                precision={2}*/}
                      {/*                valueStyle={{*/}
                      {/*                    color: '#cf1322',*/}
                      {/*                }}*/}
                      {/*                prefix={<ArrowDownOutlined />}*/}
                      {/*                suffix="%"*/}
                      {/*            />*/}
                      {/*        </Card>*/}
                      {/*    </Col>*/}
                      {/*</Row>*/}
                  </div>
                  <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-4">
                      <h1 style={{color:currentTheme.text}} className='font-bold text-lg mb-3'>Prefects on duty</h1>
                      <div className='grid grid-cols-2 gap-4 my-4'>
                          {Transfers.map((item,index)=>(
                              <div key={index}>
                                  <h2 className='text-xl'>{item.name}</h2>
                                  <label>{`Grade ${item.grade}`}</label>
                              </div>
                          ))}

                          {/*<Countdown*/}
                          {/*    title={<div><label style={{color:currentTheme.text}}>Countdown</label></div>}*/}
                          {/*    value={deadline} onFinish={onFinish} />*/}

                          {/*<Countdown title={<div><label style={{color:currentTheme.text}}>Million Seconds</label></div>}*/}
                          {/*           value={deadline} format="HH:mm:ss:SSS" />*/}

                          {/*<Countdown*/}
                          {/*    title={<div><label style={{color:currentTheme.text}}>Countdown</label></div>}*/}
                          {/*    value={Date.now() + 10 * 1000} onChange={onChange} />*/}
                      </div>
                  </div>
                  <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-4">
                      <h1 className='font-bold text-lg mb-3'>Friday Activity</h1>


                      <Collapse
                          accordion
                          expandIcon={({ isActive }) => (
                              <CaretRightOutlined rotate={isActive ? 90 : 0} />
                          )}
                      >

                          <Collapse.Panel header="Debate Club" key="2">
                              <p>
                                  The Debate Club meets to discuss current events and engage in structured debates. This activity helps students develop critical thinking, public speaking, and teamwork skills.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Sports and Physical Activities" key="3">
                              <p>
                                  A variety of sports activities are held, including soccer, basketball, and track. These activities encourage physical fitness, sportsmanship, and team spirit among students.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Music and Arts Club" key="4">
                              <p>
                                  Students can explore their creativity through music, painting, drama, and other forms of artistic expression. This club supports personal growth and artistic talent.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Environmental Club" key="5">
                              <p>
                                  The Environmental Club organizes activities focused on sustainability, such as tree planting and recycling drives. It helps students learn the importance of environmental conservation.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Science and Math Club" key="6">
                              <p>
                                  Students interested in science and mathematics gather to conduct experiments, solve challenging problems, and prepare for competitions, fostering curiosity and analytical skills.
                              </p>
                          </Collapse.Panel>

                          <Collapse.Panel header="Community Service" key="7">
                              <p>
                                  A group of students engage in community service projects, such as visiting local care centers or organizing charity drives, helping them develop empathy and a sense of community.
                              </p>
                          </Collapse.Panel>
                      </Collapse>

                  </div>
              </div>
          </div>

            <ToDoModal handleYes={handleYes} setOpen={setOpenToDo} open={openToDo} />
      </>
  )
}
export default Dashboard;
