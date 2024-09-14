import {useTheme} from "../../../context/ThemeContext/ThemeContext.jsx";
import Heading from "../../../components/heading/Heading.jsx";
import {Form, Input, message, Select} from "antd";
import {useForm} from "antd/es/form/Form.js";
import {createClass} from "../../../redux/Reducers/AdminSlice/classSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {readStaff} from "../../../redux/Reducers/AdminSlice/staffSlice.js";

const CreatClass = () => {
    const {light,dark,lightTheme}=useTheme()
    const theme=!lightTheme?light:dark;

    const {loading,classes_data,error}=useSelector((state)=>state.grades)


    const dispatch=useDispatch();

    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const onFormFinish = async (values) => {
        // todo handle form finish
        await dispatch(createClass(values)).then((action)=>{
            action.error?
                messageApi.error(action.payload.message):
                messageApi.success(action.payload.message).then(()=>{
                    form.resetFields()
                })
        })
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };

    const {  staffList } = useSelector((state) => state.staff);

    useEffect(() => {
        dispatch(readStaff());
    }, [dispatch]);


    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (staffList) {
            const formattedData = staffList?.response.map((staff, index) => ({
                label:`${staff.firstName} ${staff.lastName}`,
                value:staff.staffId
            }));
            setDataSource(formattedData);
        }
    }, [staffList]);

    const rules={
        grade:[{required:true,message:"Required field"}],
        gradeName:[{required:true,message:"Required field"}],
        stream:[{required:true,message:"Required field"}],
        classTeacher:[{required:true,message:"Required field"}],
    }

    return(
        <>
            {contextHolder}
            <div className='w-full py-8' >
                    <div>
                        <Heading title={"Create new Grade"} subtitle={"Add a grate to the school"}/>
                        <Form
                            form={form}
                            className='py-4'
                            name="newClass"
                            layout="vertical"
                            initialValues={{remember: true}}
                            onFinish={onFormFinish}
                            onFinishFailed={onFormFinishFailed}
                        >
                            <div className='grid md:grid-cols-2 gap-6 py-4'>
                                <Form.Item rules={rules.grade} label="Grade" name="grade">
                                    <Input
                                        placeholder={'eg 1'}
                                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                        size={"large"}/>
                                </Form.Item>

                                <Form.Item rules={rules.gradeName} label="Grade Name" name="gradeName">
                                    <Input
                                        placeholder={'eg Grade One'}
                                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                        size={"large"}/>
                                </Form.Item>
                                <Form.Item rules={rules.stream} label="Stream" name="stream">
                                    <Input
                                        placeholder={'North'}
                                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                        size={"large"}/>
                                </Form.Item>
                                <Form.Item rules={rules.classTeacher} label="Class Teacher" name="classTeacher">
                                    <Select
                                        placeholder={'Select Class teacher'}
                                        options={dataSource}
                                        size={"large"}
                                    />
                                </Form.Item>
                            </div>



                            <div className="flex align-middle justify-center py-4">
                                <button
                                    className="h-10 w-1/2 bg-blue-900 hover:bg-blue-950 rounded-xl text-white text-xl font-bold"
                                    type="submit"
                                >
                                    {loading?"Creating...":"Add Grade"}
                                </button>
                            </div>

                        </Form>

                    </div>
            </div>

        </>
    )

}

export default CreatClass;
