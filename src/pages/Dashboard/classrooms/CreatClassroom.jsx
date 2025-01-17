import Heading from "../../../components/heading/Heading.jsx";
import {Form, message, Select} from "antd";
import {useForm} from "antd/es/form/Form.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {readStaff} from "../../../redux/Reducers/AdminSlice/staffSlice.js";
import {useTheme} from "../../../context/ThemeContext/ThemeContext2.jsx";
import {BatchRequest} from "../../../redux/Reducers/AdminSlice/batchRequestSlice.js";
import {getFromSessionStorage} from "../../../utils/LocalStorage/sessionStorage.jsx";

const CreatClassroom = () => {


    const {loading}=useSelector((state)=>state.batchRequests)


    const dispatch=useDispatch();

    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const user = getFromSessionStorage('user')

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


    const classRooms = [{label:"Play Group",value:"PlayGroup"},{label:"Pri-Primary One",value:"PP1"},{label:"Pri-Primary Two",value:"PP2"},
        {label:"Grade One",value:"G1"},{label:"Grade Two",value:"G2"},{label:"Grade Three",value:"G3"},{label:"Grade Four",value:"G4"}
        ,{label:"Grade Five",value:"G5"},{label:"Grade Six",value:"G6"},{label:"Grade Seven",value:"G7"},{label:"Grade Eight",value:"G8"},{label:"Grade Nine",value:"G9"}]


    const onFormFinish = async (values) => {
        // todo handle form finish
        const classroomName = classRooms.find(item=>item.value ===values.classroomNo)
        const classTeacher = dataSource.find(item => item.value === values.classroomFacilitator)
        const classroomData = {
            classroomNo:values.classroomNo,
            classroomName:classroomName.label,
            classroomFacilitator:classTeacher?.label,
            employeeNo:classTeacher?.value,
            createdBy: user.employeeNo
        };

        const requests = [
            { method: "POST", url: `/classroom/create`, data: classroomData },
            { method: "POST", url: `/classroom/timetable/create`, data: classroomData },
            { method: "POST", url: `/classroom/attendance/create`, data: classroomData },
        ]


        await dispatch(BatchRequest(requests)).then((result)=>{
            result.error?
                messageApi.error(result.payload.message):
                result.payload?.responses.map(item => {
                    if (item?.data.success) {
                        messageApi.success(item?.data.message);
                    }else messageApi.error(item?.data.message)
                })
        })

    };

    const rules={
        grade:[{required:true,message:"Required field"}],
        gradeName:[{required:true,message:"Required field"}],
        stream:[{required:true,message:"Required field"}],
        classTeacher:[{required:true,message:"Required field"}],
    }

    const {currentTheme} = useTheme()

    const selectStyles = {
        backgroundColor: currentTheme.surface,
        color: currentTheme.text,
        borderColor: currentTheme.border,
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
                                    <Select
                                        style={selectStyles}
                                        dropdownStyle={{
                                            backgroundColor: currentTheme.surface,
                                        }}
                                        placeholder={'Select Classroom'}
                                        options={classRooms}
                                        size={"large"}

                                    />
                                </Form.Item>

                                <Form.Item rules={rules.classTeacher} label="Class Teacher" name="classroomFacilitator">
                                    <Select
                                        style={selectStyles}
                                        dropdownStyle={{
                                            backgroundColor: currentTheme.surface,
                                        }}
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
