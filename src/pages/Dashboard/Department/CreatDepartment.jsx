import Heading from "../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import { Form, Input, message, Select} from "antd";
import {createDepartment} from "../../../redux/Reducers/AdminSlice/departmentSlice.js";
import {useDispatch,useSelector} from "react-redux";
import {getFromLocalStorage} from "../../../utils/LocalStorage/localStorage.jsx";
import {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea.js";
import {readStaff} from "../../../redux/Reducers/AdminSlice/staffSlice.js";

const CreatDepartment = () => {

    const [form] = useForm();

    const {  staffList } = useSelector((state) => state.staff);
    const dispatch=useDispatch();

    useEffect(() => {
        dispatch(readStaff());
    }, [dispatch]);

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (staffList) {
            const formattedData = staffList?.result.map((staff) => ({
                label:staff.gender === "Male"?`Mr. ${staff.firstname} ${staff.lastName}`:`Mrs. ${staff.firstname} ${staff.lastName}`,
                value:staff.gender === "Male"?`Mr. ${staff.firstname} ${staff.lastName}`:`Mrs. ${staff.firstname} ${staff.lastName}`,
            }));
            setDataSource(formattedData);
        }
    }, [staffList]);

    const [messageApi, contextHolder] = message.useMessage();
    const {loading}=useSelector(state => state.department)

    const user = getFromLocalStorage('user')
    const onFormFinish = async (values) => {
        const data = {
            ...values,
            createdBy:user.employeeNo
        }
        dispatch(createDepartment(data)).then((action) => {
            action.error?
                messageApi.error(action.payload.message):
                messageApi.success(action.payload.message).then(()=>form.resetFields())
        })

    };

    const rules = {
        required:[{required: true,message:"Required Field"}]
    }



    return(
        <>
            {contextHolder}
            <Heading title='New Department' subtitle='Create Department'/>
            <Form
                form={form}
                name="basic"
                className='py-4'
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
            >

                <Form.Item rules={rules.required} label="Department Name" name="name">
                    <Input
                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        size={"large"}/>
                </Form.Item>
                <Form.Item rules={rules.required} label="Head Of Department" name='departmentHead'>
                    <Select
                        size={"large"}
                        options={dataSource}
                        placeholder="Mr. John Tom"
                    />
                </Form.Item>
                <Form.Item rules={rules.required} label="Description" name="description">
                    <TextArea
                        className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        rows={2} size="large"/>
                </Form.Item>

                <div>
                    <button className='bg-blue-900 hover:bg-blue-950 h-10 w-full rounded-2xl text-white text-xl'
                            type="submit">
                        {loading?"Adding...":"Add Department"}
                    </button>
                </div>

            </Form>


        </>
    )

}
export default CreatDepartment;
