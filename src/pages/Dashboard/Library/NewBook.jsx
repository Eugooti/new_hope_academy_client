import { useForm } from "antd/es/form/Form.js";
import { Form, Input, message, Select } from "antd";
import DatePickerWrapper from "../../../components/DatePicker/DatePickerWrapper.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../../redux/Reducers/appSlice/librarySlice.js";
import Heading from "../../../components/heading/Heading.jsx";

const NewBook = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const { loading, error,library_data } = useSelector((state) => state.library);
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
    ];

    return (
        <>
            {contextHolder}
            <Heading title="New Book" subtitle="Add book to the library" />
            <Form
                form={form}
                name="addBook"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >
                <div className="grid md:grid-cols-2 gap-6 pt-5">
                    <Form.Item label="Title" name="bookTitle">
                        <Input
                            size="large"
                            className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>
                    <Form.Item label="Author" name="author">
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
                    <Form.Item label="Date" name="date">
                        <DatePickerWrapper
                            size="large"
                            className="border-2 w-full border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </Form.Item>
                    <Form.Item label="Subject" name="subject">
                        <Select
                            className="rounded-lg border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                            size="large"
                        >
                            {subjects.map((item, index) => (
                                <Select.Option key={index} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
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
            {error && (
                <div className="text-red-600 font-bold text-center">{error.message}</div>
            )}
            {library_data && (<div>{library_data.message}</div>)}
        </>
    );
};

export default NewBook;
