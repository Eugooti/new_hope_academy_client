import Heading from "../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Form, Input, Select} from "antd";

const NewProcurement = () => {

    const [form] = useForm();

    const onFormFinish = (values) => {
        // todo handle form finish
        console.log(values)
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };


    return(
        <>
            <Heading title={"Procurements"} subtitle={"New item"}/>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >
                <div className='grid md:grid-cols-2 py-6 px-5 gap-6'>
                    <Form.Item label="Item" name="item">
                        <Input size={"large"}/>
                    </Form.Item>

                    <Form.Item label="Use" name="Use">
                        <Input ro size={"large"}/>
                    </Form.Item>

                    <Form.Item label="Cost" name="cost">
                        <Input size={"large"}/>
                    </Form.Item>
                    <Form.Item label="Department" name='department'>
                        <Select size={"large"}>
                            <Select.Option value="opt1">Option 1</Select.Option>
                            <Select.Option value="opt2">Option 2</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="flex align-middle justify-center py-4">
                    <button
                        className="h-10 w-1/2 bg-blue-900 hover:bg-blue-950 rounded-xl text-white text-xl font-bold"
                        type="submit"
                    >
                        Add Item
                    </button>
                </div>


            </Form>

        </>
    )

}
export default NewProcurement;
