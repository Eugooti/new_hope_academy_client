import Heading from "../../../components/heading/Heading.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Button, Form, Input} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import DatePickerWrapper from "../../../components/DatePicker/DatePickerWrapper.jsx";
const LeaseBook = () => {
  const [form] = useForm();

    const onFormFinish = (values) => {
        // todo handle form finish
        console.log(values)
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };

    const onSearch = (e) => {
        if (e===""||e===null||e===undefined)console.log("weeeeeeee")
        else console.log(e)

    }

    return(
      <>
          <Heading title={'Books Borrowing'} subtitle={'Lease a Book'}/>
          <div className='py-4'>
              <label>Find Learner</label>
              <Form.Item className='pt-2' name="input">
                  <Input.Search size={"large"} onSearch={onSearch}/>
              </Form.Item>
          </div>
          <div className='grid md:grid-cols-2'>
              <div>
                  <h1>Learner data</h1>
              </div>
              <Form
                  form={form}
                  name="basic"
                  layout="vertical"
                  initialValues={{remember: true}}
                  onFinish={onFormFinish}
                  onFinishFailed={onFormFinishFailed}
              >
                  <Form.List name={'booksBorrowed'}>
                      {(fields, {add, remove}) => (
                          <>
                              {fields.map(({key, name, ...restField}) => (
                                  <div key={key}>
                                      <Form.Item
                                          {...restField}
                                          label="Book Id" name={[name, "bookId"]}>
                                          <Input
                                              className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                              size={"large"}/>                                      </Form.Item>

                                      <div className='flex align-middle justify-center'>
                                          <Form.Item className='w-1/2'>
                                              <Button type="dashed" onClick={() => remove()} block
                                                      icon={<MinusOutlined/>}>
                                                  Remove Book
                                              </Button>
                                          </Form.Item>
                                      </div>

                                  </div>
                              ))}
                              <Form.Item>
                                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                      Add Book
                                  </Button>
                              </Form.Item>
                          </>
                      )}
                  </Form.List>
                  <Form.Item label="Date Borrowed" name="borrowDate">
                      <DatePickerWrapper
                          size='large'
                          className="border-2 w-full border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                      />
                  </Form.Item>
                  <Form.Item label="Return Date" name="returnDate">
                      <DatePickerWrapper
                          size='large'
                          className="border-2 w-full border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                      />
                  </Form.Item>

                  <div>
                      <button className='bg-blue-900 hover:bg-blue-950 h-10 w-full rounded-2xl text-white text-xl'
                              type="submit">Lease Book
                      </button>
                  </div>
              </Form>
          </div>


      </>
    )
}
export default LeaseBook
