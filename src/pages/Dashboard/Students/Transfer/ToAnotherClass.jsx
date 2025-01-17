import Heading from "../../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Form, Input, message, Select} from "antd";
import {LoadingOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {readOneLearner} from "../../../../redux/Reducers/AdminSlice/LearnerSlice.js";
import {transferLearner} from "../../../../redux/Reducers/AdminSlice/classSlice.js";
import {BatchRequest} from "../../../../redux/Reducers/AdminSlice/batchRequestSlice.js";

const ToAnotherClass = () => {

    const [form] = useForm();




    const grades = [{label:"Play Group",value:"PlayGroup"},{label:"Pri-Primary One",value:"PP1"},{label:"Pri-Primary Two",value:"PP2"},
        {label:"Grade One",value:"G1"},{label:"Grade Two",value:"G2"},{label:"Grade Three",value:"G3"},{label:"Grade Four",value:"G4"}
        ,{label:"Grade Five",value:"G5"},{label:"Grade Six",value:"G6"},{label:"Grade Seven",value:"G7"},{label:"Grade Eight",value:"G8"},{label:"Grade Nine",value:"G9"}]


    const [nullValue, setNullValue] = useState(false);

    const {loading} = useSelector(state => state.learners);

    const [learnerData, setLearnerData] = useState();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const search = (e) => {
        if (!e){
            messageApi.warning("Admission number is required.")
        }else {
            dispatch(readOneLearner(e)).then(action => {
                action.error?
                    messageApi.error(action.payload.message):
                    messageApi.success(action.payload.message).then(()=>{
                        setLearnerData(action.payload.result)
                        e=null;
                    })
            })
        }

    }

    const onFormFinish = async (values) => {
        // todo handle form finish
        const classroomRecordData ={
            admNo:learnerData?.admNo,
            newClassroom:values.grade
        }

        const learnerRecord = {
            classroom:values.grade
        }
        const admNo = learnerData?.admNo
        const grade = learnerData?.classroom

        const requests = [
            {method:"PUT",url:`/learners/update/${admNo}`,data:learnerRecord},
            {method:"PUT",url:`/learnerService/clinic/update/${admNo}`,data:learnerRecord},
            {method:"PUT",url:`/classroom/attendance/transfer/${grade}`,data:classroomRecordData},
            {method:"PUT",url:`/classroom/transfer/${grade}`,data:classroomRecordData},
        ]
        await dispatch(BatchRequest(requests)).then((action)=>{
            console.log(action.payload.responses)

            if (action.error){
                messageApi.error(action.payload.message)
            }

            if (action.payload?.responses[0].status===200 && action.payload?.responses[1].status===200 && action.payload?.responses[2].status===200 && action.payload?.responses[3].status===200){
                messageApi.success("Records successfully updated").then(()=>{
                    form.resetFields()
                    setLearnerData(action.payload?.responses[0].data.result)
                })
            }

        })



    };

    const rules={
        Required:[{required:true,message:"Required Field"}]
    }

    return(
        <>
            {contextHolder}
            <Heading title="Transfer Learner" subtitle='To another class'/>
            <div className='md:w-1/2 pb-4'>
                    <Input.Search
                        size={"large"}
                        placeholder={"Enter Learner Admission Number"}
                        prefix={<UserOutlined/>}
                        onSearch={(e)=>search(e)}/>
                    <label className={nullValue ? 'text-red-800' : ''}>Enter Lerner Admission Number</label>
            </div>

            <Form
                form={form}
                name="transfer-to-class"
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
            >


                <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-6'>

                    <div className="bg-gray-200 shadow-md alignCenter rounded-md p-6">
                        <h2 className="text-xl font-semibold mb-2">Lerner Information</h2>

                        {loading &&
                            <div className='w-full h-full flex align-middle justify-center'><LoadingOutlined/></div>
                        }
                        {learnerData &&
                            <div className={"p-4"}>
                                <dl className="divide-y divide-gray-400">
                                    <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${learnerData?.firstName} ${learnerData?.lastName}`}</dd>
                                    </div>
                                    <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{learnerData?.gender}</dd>
                                    </div>
                                    <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Year Of Birth</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{learnerData?.yob}</dd>
                                    </div>
                                    <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Classroom</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{learnerData?.classroom}</dd>
                                    </div>

                                    <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Due Date</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Yoooo</dd>
                                    </div>

                                </dl>

                            </div>

                        }

                    </div>

                    <div>

                        <Form.Item rules={rules.Required} label="Choose Grade" name='grade'>
                            <Select size={"large"} options={grades}/>
                        </Form.Item>

                        <button className='bg-blue-900 h-10 w-full text-xl rounded-2xl' type='submit'>
                            Transfer Learner
                        </button>


                    </div>

                </div>

            </Form>


        </>
    )

}
export default ToAnotherClass;
