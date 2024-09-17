  import Heading from "../../components/heading/Heading.jsx";
import UserCalendar from "../../components/DatePicker/Calendar.jsx";
import {Collapse, Progress, Card, Col, Row, Statistic, Skeleton} from "antd";
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
import {data} from "autoprefixer";
  import {useTheme} from "../../context/ThemeContext/ThemeContext2.jsx";


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
    const {error,departments,loading} = useSelector((state)=>state.department)
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


    const population=[20,30,40,50,60,70,80,90]

    const {currentTheme} = useTheme()

  return(
      <>
          <Heading title={'Dashboard'}/>

          <div className={'flex flex-col pl-4'}>

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
              <div className='grid md:grid-cols-2 gap-6' style={{maxHeight: 250}}>
                  <div className='py-6 flex flex-col w-full h-full overflow-y-auto'>
                      <h1 style={{color:currentTheme.text}} className='font-bold text-lg mb-3'>Term Dates</h1>
                      <Collapse
                          accordion
                          expandIcon={({isActive}) => (
                              <CaretRightOutlined rotate={isActive ? 90 : 0}/>
                          )}
                      >
                          <Collapse.Panel header="This is panel header 1" key="1">
                              <p>Panel content 1</p>
                          </Collapse.Panel>
                          <Collapse.Panel header="This is panel header 2" key="2">
                              <p>Panel content 2</p>
                          </Collapse.Panel>
                          <Collapse.Panel header="This is panel header 3" key="3">
                              <p>Panel content 3</p>
                          </Collapse.Panel>
                      </Collapse>

                  </div>
                  <div className='py-6'>
                      <h1 style={{color:currentTheme.text}} className='font-bold text-lg mb-3'>School Events</h1>
                      <Collapse
                          accordion
                          expandIcon={({isActive}) => (
                              <CaretRightOutlined rotate={isActive ? 90 : 0}/>
                          )}
                      >
                          <Collapse.Panel header="This is panel header 1" key="1">
                              <p>Panel content 1</p>
                          </Collapse.Panel>
                          <Collapse.Panel header="This is panel header 2" key="2">
                              <p>Panel content 2</p>
                          </Collapse.Panel>
                          <Collapse.Panel header="This is panel header 3" key="3">
                              <p>Panel content 3</p>
                          </Collapse.Panel>
                      </Collapse>


                  </div>
              </div>
              <div  className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-4'>
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
                              <Progress type="dashboard"  strokeColor={conicColors} key={index}  percent={item} size={70} />
                          ))}
                      </div>

                  </div>
                  <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-4">
                      <h1 className='font-bold text-lg mb-3'>Calendar</h1>
                      <UserCalendar/>
                  </div>
              </div>

              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-4'>
                  <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-4">
                      <h1 style={{color:currentTheme.text}} className='font-bold text-lg mb-3'>Teachers on duty</h1>
                      <Row gutter={16}>
                          <Col span={12}>
                              <Card bordered={false}>
                                  <Statistic
                                      title="Admission"
                                      value={11.28}
                                      precision={2}
                                      valueStyle={{
                                          color: '#3f8600',
                                      }}
                                      prefix={<ArrowUpOutlined />}
                                      suffix="%"
                                  />
                              </Card>
                          </Col>
                          <Col span={12}>
                              <Card bordered={false}>
                                  <Statistic
                                      title="Transfers"
                                      value={9.3}
                                      precision={2}
                                      valueStyle={{
                                          color: '#cf1322',
                                      }}
                                      prefix={<ArrowDownOutlined />}
                                      suffix="%"
                                  />
                              </Card>
                          </Col>
                      </Row>
                  </div>
                  <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-4">
                      <h1 style={{color:currentTheme.text}} className='font-bold text-lg mb-3'>Prefects on duty</h1>
                      <div className='grid lg:grid-cols-2'>
                          <Countdown
                              title={<div><label style={{color:currentTheme.text}}>Countdown</label></div>}
                              value={deadline} onFinish={onFinish} />

                          <Countdown title={<div><label style={{color:currentTheme.text}}>Million Seconds</label></div>}
                                     value={deadline} format="HH:mm:ss:SSS" />

                          <Countdown
                              title={<div><label style={{color:currentTheme.text}}>Countdown</label></div>}
                              value={Date.now() + 10 * 1000} onChange={onChange} />
                      </div>



                  </div>
                  <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-4">
                      <h1 className='font-bold text-lg mb-3'>Friday Activity</h1>
                  </div>
              </div>
          </div>

      </>
  )
}
export default Dashboard;
