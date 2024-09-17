import { useForm } from "antd/es/form/Form.js";
import {Button, Form, Input, InputNumber, message, Select} from "antd";
import DatePickerWrapper from "../../../components/DatePicker/DatePickerWrapper.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../../redux/Reducers/appSlice/librarySlice.js";
import Heading from "../../../components/heading/Heading.jsx";
import {useTheme} from "../../../context/ThemeContext/ThemeContext2.jsx";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useEffect} from "react";

const NewBook = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.library);
    const [messageApi, contextHolder] = message.useMessage();

    const onFormFinish = async (values) => {
        const newBook = {
            bookTitle: values.bookTitle,
            author: values.author,
            publisher: values.publisher,
            date: values.date,
            subject: values.subject,
            createdBy: "librarian123", // Adjust as necessary
        };
        await dispatch(addBook(newBook)).then((action) => {
            console.log(action)
            if (action.error) {
                messageApi.error(action.payload?.message);
            } else {
                messageApi.success(action.payload?.message);
            }
        });
    };

    const onFormFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    };

    const subjects = [
        "English",
        "Kiswahili",
        "Mathematics",
        "Creative Art & Sports",
        "Science & Technology",
        "Agriculture",
        "Integrated Science",
        "Indigenous Language",
        "Environmental Activity",
        "Religious Activity",
        "Language Activity",
    ].map(item=>({
        label:item,
        value: item,
    }))

    const {currentTheme} = useTheme()

    const selectStyles = {
        backgroundColor: currentTheme.surface,
        color: currentTheme.text,
        borderColor: currentTheme.border,
    }


    useEffect(() => {
        form.setFieldsValue({authors:[{author:""}],publishers:[{publisher:""}]})
    }, [form]);
    return (
        <>
            {contextHolder}
            <Heading title="New Book" subtitle="Add book to the library" />
            <Form
                form={form}
                name="addBook"
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >
                <div className="grid md:grid-cols-2 gap-6 pt-5">
                    <Form.Item label="Title" name="title">
                        <Input
                            size="large"
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>

                    <Form.Item label="Category" name="category">
                        <Input
                            size="large"
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>
                </div>
                <Form.List name={"authors"}>
                    {(fields,{add,remove}) => (
                        <>
                            <div className="grid md:grid-cols-2 gap-6">
                            {fields.map(({key,name,...restField})=>(
                                <div  key={key}>
                                    <div className='grid grid-cols-10'>
                                        <Form.Item
                                            className='col-span-9'
                                            {...restField}
                                            label="Author" name={[name, "author"]}>
                                            <Input
                                                size="large"
                                                className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                            />
                                        </Form.Item>

                                        <div className='flex justify-center align-middle' >

                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </div>

                                    </div>

                                </div>
                            ))}
                            </div>
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Author
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.List name={"publishers"}>
                    {(fields,{add,remove}) => (
                        <>
                            <div className="grid md:grid-cols-2 gap-6">
                            {fields.map(({key,name,...restField})=>(
                                <div  key={key}>
                                    <div className='grid grid-cols-10'>
                                        <Form.Item
                                            className='col-span-9'
                                            {...restField}
                                            label="Author" name={[name, "publisher"]}>
                                            <Input
                                                size="large"
                                                className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                            />
                                        </Form.Item>

                                        <div className='flex justify-center align-middle' >

                                            <MinusCircleOutlined onClick={() => remove(name)} />

                                        </div>

                                    </div>

                                </div>
                            ))}
                            </div>
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Publisher
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>


                <div className="grid md:grid-cols-2 gap-6 pt-5">

                    <Form.Item label="Sub-Category" name="subCategory">
                        <Input
                            size="large"
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>

                    <Form.Item label="Subject" name="subject">
                        <Select
                            size={"large"}
                            placeholder='Select status'
                            options={subjects}
                            style={selectStyles}
                            dropdownStyle={{
                                backgroundColor: currentTheme.surface,
                            }}
                        />
                    </Form.Item>

                    <Form.Item label="Publisher" name="publisher">
                        <Input
                            size="large"
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>

                    <Form.Item label="ISBN" name="ISBN">
                        <Input
                            size="large"
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>

                    <Form.Item label="Publisher" name="publisher">
                        <Input
                            size="large"
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>
                    <Form.Item label="Copies" name="totalCopies">
                        <InputNumber
                            size="large"
                            className="border-2 w-full w border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>


                    <Form.Item label="Publication Date" name="publicationDate">
                        <DatePickerWrapper
                            size="large"
                            className="border-2 w-full border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>

                </div>
                <div className="flex align-middle justify-center py-4">
                    <button
                        className="h-10 w-1/2 bg-blue-900 hover:bg-blue-950 rounded-xl text-white text-xl font-bold"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Book"}
                    </button>
                </div>
            </Form>
        </>
    );
};

export default NewBook;
