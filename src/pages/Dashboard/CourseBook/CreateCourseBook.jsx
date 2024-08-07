import Heading from "../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Form, Input, message, Select} from "antd";
import Button from "antd/es/button/index.js";
import {PlusOutlined} from "@ant-design/icons";
import DatePickerWrapper from "../../../components/DatePicker/DatePickerWrapper.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAllBooks} from "../../../redux/Reducers/appSlice/librarySlice.js";
import {useEffect} from "react";

const CreateCourseBook = () => {

    const dispatch = useDispatch();
    const { loading, error, all_books } = useSelector((state) => state.library);

    useEffect(() => {
        // Dispatch the getAllBooks async thunk when the component mounts
        dispatch(getAllBooks());
    }, [dispatch]);

    console.log(all_books?all_books:null)
    console.log(error?error:null)

    const [form] = useForm();

    const firstBook=[{subject:"",title:"",author:"",publisher: "",publicationDate:""}]

    useEffect(() => {
        form.setFieldsValue({books:firstBook})
    }, [form]);

    const [messageApi, contextHolder] = message.useMessage();

    const onFormFinish = (values) => {
        // todo handle form finish
        if (values.books===undefined || values.books.length===0){
            messageApi.warning("Books Required")
        }else {
            console.log(values)
        }

    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };

    const subjects=["English","Kiswahili","Mathematics","Creative Art & Sports","Science & Technology","Agriculture","Integrated Science","Indigenous Language","Environmental Activity","Religious Activity","Language Activity"]
    const grades=["One","Two","Three","Four","Five","Six","Seven","Eight","Nine"]

    return(
      <>
          {contextHolder}
          <Heading title='New Coursebook' subtitle='Create Coursebook for Use in Class.'/>
          <Form
              form={form}
              name="courseBook"
              className='pt-5'
              layout="vertical"
              initialValues={{remember: true}}
              onFinish={onFormFinish}
              onFinishFailed={onFormFinishFailed}
          >
              <div>
                  <Form.Item label="Grade" name="grade" >

                      <Select size={"large"} >
                          {grades.map((item, index) => (
                              <Select.Option key={index} value={item}>{item}</Select.Option>
                          ))}
                      </Select>
                  </Form.Item>

                  <Form.List name={'books'}>
                      {(fields, {add, remove}) => (
                          <>
                              {fields.map(({key, name, ...restField}) => (
                                  <div key={key}>
                                      <div className='grid md:grid-cols-2 gap-6'>
                                          <Form.Item
                                              label='Subject'
                                              {...restField}
                                              name={[name, 'subject']}
                                          >
                                              <Select size={"large"}>
                                                  {subjects.map((item, index) => (
                                                      <Select.Option key={index} value={item}>{item}</Select.Option>
                                                  ))}
                                              </Select>
                                          </Form.Item>
                                          <Form.Item
                                              label='Title'
                                              {...restField}
                                              name={[name, 'title']}
                                          >
                                              <Input
                                                  className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                  size={"large"}/>
                                          </Form.Item>
                                          <Form.Item
                                              label='Author'
                                              {...restField}
                                              name={[name, 'author']}
                                          >
                                              <Input
                                                  className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                  size={"large"}/>
                                          </Form.Item>
                                          <Form.Item
                                              label='Publisher'
                                              {...restField}
                                              name={[name, 'publisher']}
                                          >
                                              <Input
                                                  className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                  size={"large"}/>
                                          </Form.Item>

                                          <Form.Item
                                              label='Publication Date'
                                              {...restField}
                                              name={[name, 'publicationDate']}
                                          >
                                              <DatePickerWrapper
                                                  size='large'
                                                  className="border-2 w-full border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                              />
                                          </Form.Item>

                                      </div>
                                      <div className='flex justify-center pb-8'>
                                          <button className='bg-red-800 h-8 w-1/2 rounded-2xl text-white text-lg'
                                                  onClick={() => remove(name)}>Remove Book
                                          </button>

                                      </div>
                                  </div>
                              ))}
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                  Add Book
                              </Button>
                          </>
                      )}
                  </Form.List>

              </div>
              <div className='flex align-middle justify-center py-4'>
                  <button className='h-10 w-1/2 bg-blue-900 hover:bg-blue-950 rounded-xl text-white text-xl font-bold'
                          type={"submit"}>Add Book
                  </button>
              </div>
          </Form>


      </>
    )
}
export default CreateCourseBook;
