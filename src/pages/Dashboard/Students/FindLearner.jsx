import Heading from "../../../components/heading/Heading.jsx";
import {Form, Input, message} from "antd";
import {LoadingOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {readOneLearner} from "../../../redux/Reducers/AdminSlice/LearnerSlice.js";

const FindLearner = () => {

    const [loading, setLoading] = useState(true);
    const [nullValue, setNullValue] = useState(false);

    const [learnerData, setLearnerData] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const search = async (e) => {
        if (e===undefined){
            setNullValue(true)
        }else {
            await dispatch(readOneLearner(e)).then((action)=>{
                action.error?
                    messageApi.error(action.payload.message):
                    messageApi.success(action.payload.message).then(()=>{
                        setLearnerData(action.payload?.result)
                        setLoading(false)

                    })
            })
        }
    }

    console.log(learnerData)

    return(
        <>
            {contextHolder}
            <Heading title={'Looking for a Learner?'} subtitle='Find a Learner'/>
            <div className='md:w-2/3 pt-5'>
                <label>Learner Admission Number</label>
                <Form.Item className='pt-2' name="input">
                    <Input.Search
                        size={"large"}
                        placeholder={"Enter Learner Admission Number"}
                        prefix={<UserOutlined/>}
                        onSearch={search}/>
                </Form.Item>
            </div>
            <div className="bg-gray-200 shadow-md alignCenter rounded-md p-6">
                <h2 className="text-xl font-semibold mb-2">Lerner Information</h2>

                {loading ? <div className='w-full h-full flex align-middle justify-center'><LoadingOutlined/></div> :

                    <div className={"p-4"}>
                        <dl className="divide-y divide-gray-400">
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {`${learnerData?.first_name} ${learnerData?.last_name}`}
                                </dd>
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
                                <dt className="text-sm font-medium leading-6 text-gray-900">Current Grade</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{learnerData?.grade}</dd>
                            </div>

                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Due Date</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Yoooo</dd>
                            </div>

                        </dl>

                    </div>
                }


            </div>

        </>
    )
}
export default FindLearner;
