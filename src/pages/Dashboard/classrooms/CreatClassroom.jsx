import {useTheme} from "../../../context/ThemeContext/ThemeContext.jsx";
import Heading from "../../../components/heading/Heading.jsx";
import {Form, Input, message, Select} from "antd";
import {useForm} from "antd/es/form/Form.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {readStaff} from "../../../redux/Reducers/AdminSlice/staffSlice.js";
import {getFromLocalStorage} from "../../../utils/LocalStorage/localStorage.jsx";
import {createClass} from "../../../redux/Reducers/AdminSlice/classSlice.js";

const CreatClassroom = () => {
    const {light,dark,lightTheme}=useTheme()
    const theme=!lightTheme?light:dark;

    const {loading}=useSelector((state)=>state.classroom)


    const dispatch=useDispatch();

    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const user = getFromLocalStorage('user')

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
            const formattedData = staffList?.result.map((staff) => ({
                label:staff.gender === "Male"?`Mr. ${staff.firstname} ${staff.lastName}`:`Mrs. ${staff.firstname} ${staff.lastName}`,
                value: staff.employeeNo
            }));
            setDataSource(formattedData);
        }
    }, [staffList]);


    const onFormFinish = async (values) => {
        // todo handle form finish


        const classTeacher = dataSource.find(item => item.value === values.classroomFacilitator)
        const userData = {
            ...values,
            classroomFacilitator:classTeacher?.label,
            employeeNo:classTeacher?.value,
            createdBy: user.employeeNo
        };

        console.log(userData)

        await dispatch(createClass(userData)).then((action)=>{
            if (action.error) {
                messageApi.error(action.payload?.message);
            } else {
                messageApi.success(action.payload?.message).then(() => form.resetFields());
            }
        })
    };

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
                                <Form.Item rules={rules.grade} label="Grade" name="classroomNo">
                                    <Input
                                        placeholder={'eg 1'}
                                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                        size={"large"}/>
                                </Form.Item>

                                <Form.Item rules={rules.gradeName} label="Grade Name" name="classroomName">
                                    <Input
                                        placeholder={'eg Grade One'}
                                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                        size={"large"}/>
                                </Form.Item>
                                <Form.Item rules={rules.classTeacher} label="Class Teacher" name="classroomFacilitator">
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

export default CreatClassroom;
