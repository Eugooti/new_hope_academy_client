import Heading from "../../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Form, Input, Select} from "antd";
import {LoadingOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";

const ToAnotherClass = () => {

    const [form] = useForm();

    const onFormFinish = (values) => {
        // todo handle form finish
        console.log(values)
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };

    const [loading, setLoading] = useState(true);

    const [nullValue, setNullValue] = useState(false);
    const search = (e) => {
      console.log(e)

        if (e===undefined){
            setNullValue(true)
        }

        setLoading(!loading)
    }

    const rules={
        Required:[{required:true,message:"Required Field"}]
    }

    return(
        <>
            <Heading title="Transfer Learner" subtitle='To another class'/>

            <Form
                form={form}
                name="transfer-to-class"
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >
                <div className='md:w-2/3 '>
                    <Form.Item label="Find Learner" name="input" rules={rules.Required}>
                        <Input.Search
                            size={"large"}
                            placeholder={"Enter Learner Admission Number"}
                            prefix={<UserOutlined/>}
                            onSearch={search}/>
                        <label className={nullValue?'text-red-800':''}>Enter Lerner Admission Number</label>
                    </Form.Item>
                </div>

                <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-6'>

                    <div className="bg-gray-200 shadow-md alignCenter rounded-md p-6">
                    <h2 className="text-xl font-semibold mb-2">Lerner Information</h2>

                        {loading?<div className='w-full h-full flex align-middle justify-center'><LoadingOutlined/></div>:

                    <div className={"p-4"}>
                        <dl className="divide-y divide-gray-400">
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Eugene Ochieng</dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Male</dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Year Of Birth</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">12-12-2002</dd>
                            </div>
                            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Current Grade</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Three</dd>
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
                            <Select size={"large"}>
                                <Select.Option value="Baby Class">Playgroup</Select.Option>
                                <Select.Option value="PP1">PP1</Select.Option>
                                <Select.Option value="PP2">PP2</Select.Option>
                                <Select.Option value="1">One</Select.Option>
                                <Select.Option value="2">Two</Select.Option>
                                <Select.Option value="3">Tree</Select.Option>
                                <Select.Option value="4">Four</Select.Option>
                                <Select.Option value="5">Five</Select.Option>
                                <Select.Option value="6">Six</Select.Option>
                                <Select.Option value="7">Seven</Select.Option>
                                <Select.Option value="8">Eight</Select.Option>
                                <Select.Option value="9">Nine</Select.Option>
                            </Select>
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
