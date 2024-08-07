import Heading from "../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Card, Form, message, Select} from "antd";
import Button from "antd/es/button/index.js";
import {PlusOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {getFromLocalStorage} from "../../../utils/LocalStorage/localStorage.jsx";
import {createSchedule} from "../../../redux/Reducers/AdminSlice/scheduleSlice.js";
import {useDispatch} from "react-redux";

const ScheduleSetting = () => {
  const [form] = useForm();

  const initialValue= [{day:"",lessons:[{grade:"",subject:"",time:""}]}]


    useEffect(() => {
        form.setFieldsValue({weekSchedule:initialValue})
    }, [form]);

    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
  const user=getFromLocalStorage('user')
  const onFormFinish =async (values) => {
        // todo handle form finish
      const schedule={
          ...values,
          teachersName:`${user?.firstName} ${user?.lastName}`,
          staffId:user?.staffId
      }
      await dispatch(createSchedule(schedule)).then(action=>{
          action.error?
              messageApi.error(action.payload.message):
              messageApi.success(action.payload.message)
      })
   };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };


    const Day=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((item,index)=>({
        value:index+1,
        label:item
    }))


    const schoolSubjects = [
        'Mathematics', 'English', 'Science', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology',
        'Physical Education', 'Art', 'Music', 'Computer Science', 'Economics', 'Business Studies',
        'Political Science', 'Psychology', 'Sociology', 'Philosophy', 'Literature', 'Foreign Language',
        'Environmental Science', 'Health Education', 'Drama', 'Religious Studies', 'Technology',
        'Engineering', 'Accounting', 'Statistics', 'Home Economics', 'Astronomy'].map((item)=>({
        label:item,
        value:item
    }))

    const grade=["PP1","PP2","Grade One","Grade Two","Grade Three","Grade Four","Grade Five","Grade Six",
        "Grade Seven","Grade Eight","Grade Nine"].map(item=>({
        label:item,
        value:item
    }))


    const time=["8:20am - 9:00am","9:00am - 9:40am","9:50am - 10:30am","10:30am - 11:10am","11:30am - 12:10pm",
        "12:10pm - 12:50pm","1:30pm - 2:00pm","2:00pm - 2:40pm","2:40pm - 3:20pm"].map((item)=>({
        label:item,
        value:item
    }))


    return(
      <>
          {contextHolder}
          <Heading title={"Set Schedule"}/>
          <Form
              form={form}
              name="basic"
              layout="vertical"
              initialValues={{remember: true}}
              onFinish={onFormFinish}
              onFinishFailed={onFormFinishFailed}
          >
              <Form.List name={'weekSchedule'}>
                  {(fields, { add, remove })=>(
                      <div className={'grid grid-cols-1 gap-4'} >
                          {fields.map(({key,name,...restFields})=>(
                              <div className="bg-gray-200 shadow-md alignCenter rounded-md p-4" key={key}>
                                  <Heading title={null} subtitle={`Day ${key+1} Activity`}/>
                                      <Form.Item
                                          {...restFields}
                                          label="Day"
                                          name={[name,"day"]}
                                          className='pt-3'
                                      >
                                          <Select
                                              size={"large"}
                                              className='w-full'
                                              tokenSeparators={[',']}
                                              options={Day}
                                              placeholder={"Select Day"}
                                          />
                                      </Form.Item>
                                  <Form.List name={[name,'lessons']}>
                                      {(fields,{add,remove})=>(
                                          <dl className="divide-y divide-gray-400">
                                              {fields.map(({key,name,...restFields})=>(
                                                  <div key={key} >
                                                      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6'>
                                                          <Form.Item
                                                              label="Grade"
                                                              {...restFields}
                                                              name={[name,"grade"]}
                                                          >
                                                              <Select
                                                                  options={grade}
                                                                  size={"large"}
                                                                  placeholder='Select Grade'
                                                              />
                                                          </Form.Item>


                                                          <Form.Item
                                                              label="Subject"
                                                              {...restFields}
                                                              name={[name,"subject"]}
                                                          >
                                                              <Select
                                                                  options={schoolSubjects}
                                                                  size={"large"}
                                                                  placeholder='Select subject'
                                                              />
                                                          </Form.Item>
                                                          <Form.Item
                                                              label="Time"
                                                              {...restFields}
                                                              name={[name,"time"]}
                                                          >
                                                              <Select
                                                                  options={time}
                                                                  size={"large"}
                                                                  placeholder='Select Time'
                                                              />
                                                          </Form.Item>

                                                      </div>
                                                      <div className='flex align-middle justify-end pb-4'>
                                                          <Button onClick={()=>remove(name)} danger={true} type="primary">Remove Activity</Button>
                                                      </div>
                                                  </div>
                                              ))}
                                              <Form.Item className={'pt-5'}>
                                                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                      Add Activity
                                                  </Button>
                                              </Form.Item>
                                          </dl>
                                      )}
                                  </Form.List>
                                  <div className='flex align-middle justify-end'>
                                      <Button onClick={()=>remove(name)} danger type="primary">Remove Schedule</Button>
                                  </div>

                              </div>
                          ))}
                          <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                  Add Schedule
                              </Button>
                          </Form.Item>
                      </div>
                  )}
              </Form.List>
              <Button htmlType='submit' type="primary">Submit</Button>


          </Form>



      </>
  )
}
export default ScheduleSetting;
