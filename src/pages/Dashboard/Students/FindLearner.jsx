import Heading from "../../../components/heading/Heading.jsx";
import {Form, Input, message} from "antd";
import {LoadingOutlined, UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {readOneLearner} from "../../../redux/Reducers/AdminSlice/LearnerSlice.js";
import {useTheme} from "../../../context/ThemeContext/ThemeContext2.jsx";

const FindLearner = () => {


    const {learner_data,loading,error} =useSelector(state => state.learners);

    const [learnerData, setLearnerData] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const search = async (e) => {
            await dispatch(readOneLearner(e)).then((action)=>{
                action.error?
                    messageApi.error(action.payload.message):
                    messageApi.success(action.payload.message)
            })

    }


    useEffect(() => {
        setLearnerData(learner_data)
    }, [dispatch]);
    const {currentTheme} = useTheme()

    return(
        <>
            {contextHolder}
            <Heading title={'Looking for a Learner?'} subtitle='Find a Learner'/>
            <div className='md:w-2/3'>
                <label>Learner Admission Number</label>
                <Form.Item className='pt-2' name="input">
                    <Input.Search
                        size={"large"}
                        placeholder={"Enter Learner Admission Number"}
                        prefix={<UserOutlined/>}
                        onSearch={search}/>
                </Form.Item>
            </div>
            <div style={{background:currentTheme.background}} className="bg-gray-200 shadow-md alignCenter rounded-md p-6">
                <h2 className="text-xl font-semibold mb-2">Lerner Information</h2>

                {loading ? <div className='w-full h-full flex align-middle justify-center'><LoadingOutlined/></div> :

                    learner_data &&
                    <div  className={"p-4"}>
                        <dl className="divide-y divide-gray-400">
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt style={{color:currentTheme.text}} className="text-sm font-medium leading-6">Full Name</dt>
                                <dd style={{color:currentTheme.text}} className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {`${learner_data?.result.firstName} ${learner_data?.result.lastName}`}
                                </dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt style={{color:currentTheme.text}} className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                                <dd style={{color:currentTheme.text}} className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{learner_data?.result.gender}</dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt style={{color:currentTheme.text}} className="text-sm font-medium leading-6 text-gray-900">Year Of Birth</dt>
                                <dd style={{color:currentTheme.text}} className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{learner_data?.result.yob}</dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt style={{color:currentTheme.text}} className="text-sm font-medium leading-6 text-gray-900">Current Grade</dt>
                                <dd style={{color:currentTheme.text}} className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{learner_data?.result.classroom}</dd>
                            </div>

                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt style={{color:currentTheme.text}} className="text-sm font-medium leading-6 text-gray-900">Due Date</dt>
                                <dd style={{color:currentTheme.text}} className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Yoooo</dd>
                            </div>

                        </dl>

                    </div>
                }

                {loading ?
                    <div className='w-full h-full flex align-middle justify-center'><LoadingOutlined/></div>:
                    error &&
                    <div>
                        <h2 className='text-xl' style={{color:currentTheme.text}} >{error?.message}.</h2>
                    </div>
                }


            </div>

        </>
    )
}
export default FindLearner;
