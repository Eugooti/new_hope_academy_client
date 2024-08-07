import Heading from "../../../components/heading/Heading.jsx";
import {Button, Form, Input, message} from "antd";
import {useForm} from "antd/es/form/Form.js";
import {PlusOutlined} from "@ant-design/icons";

const NewPatient = () => {

    const records=[
        {date:"12-01-2024",symptoms:["one","two","three"],prescription:["A","B","C"]},
        {date:"12-01-2024",symptoms:["one","two","three"],prescription:["A","B","C"]},
        {date:"12-01-2024",symptoms:["one","two","three"],prescription:["A","B","C"]},
        {date:"12-01-2024",symptoms:["one","two","three"],prescription:["A","C"]},
    ]

    const onSearch = (e) => {
      console.log(e)
    }

    const Details=(item)=>{
        messageApi.success(item.date)
    }

    const [messageApi, contextHolder] = message.useMessage();
    const [form] = useForm();

    const onFormFinish = (values) => {
        // todo handle form finish

        if (values.symptoms===undefined || values.symptoms.length===0){
            messageApi.warning("Symptoms Requires")

        }else if (values.prescription===undefined || values.prescription.length===0){
            messageApi.warning("Prescription Requires")
        }else {
            console.log(values)
        }

    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };



  return(
      <>
          {contextHolder}
          <Heading title='Treat Patient.' subtitle='Diagonise and Treat Patient.'/>

          <div className='py-4'>
              <label>Find Learner</label>
              <Form.Item className='pt-2' name="input">
                  <Input.Search onSearch={onSearch} size={"large"}/>
              </Form.Item>
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
              <div className="bg-gray-200 shadow-md alignCenter rounded-md p-6">
                  <h2 className="text-xl font-semibold mb-2">Lerner Details.</h2>

                  <div className={"p-4"}>
                      <dl className="divide-y divide-gray-400">
                          <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Eugene
                                  Ochieng
                              </dd>
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

                          <div className='pt-5'>
                              <h2 className="text-xl font-semibold mb-2">Lerner Clinic History.</h2>
                          </div>

                          <table  className='w-full border-2 rounded-xl'>
                              <thead className='border-2 bg-gray-400'>
                                  <th className='text-lg border-2 border-amber-950'>Date</th>
                                  <th className='text-lg border-2 border-amber-950'>Symptoms</th>
                                  <th className='text-lg border-2 border-amber-950'>Prescription</th>
                                  <th className='text-lg border-2 border-amber-950'>Action</th>
                              </thead>
                              {records.map((item,index)=> (
                                  <thead key={index} className='border-2'>
                                  <th className='border-2 border-amber-950'>{item.date}</th>
                                  <th className='border-2 border-amber-950'>
                                      {item.symptoms.map((item,index)=>(
                                          <div key={index} className='flex ml-3'>
                                             <ul>{`${index+1}. ${item} `}</ul>
                                          </div>
                                      ))}
                                  </th>
                                  <th className='border-2 border-amber-950'>
                                      {item.prescription.map((item, index) => (
                                          <div key={index} className='flex ml-3'>
                                              <ul>{`${index + 1}. ${item} `}</ul>
                                          </div>
                                      ))}
                                  </th>
                                  <th className='border-2 border-amber-950'>
                                      <div>
                                        <button className='h-7 bg-blue-700 hover:bg-blue-900 rounded-md w-16 text-white' onClick={()=>Details(item)}>Details</button>
                                      </div>
                                  </th>
                                  </thead>
                              ))}

                          </table>


                      </dl>

                  </div>

              </div>
              <div className="bg-gray-200 shadow-md alignCenter rounded-md p-6">
                  <Form
                      form={form}
                      name="basic"
                      layout="vertical"
                      initialValues={{remember: true}}
                      onFinish={onFormFinish}
                      onFinishFailed={onFormFinishFailed}
                  >
                      <div className='pb-4'>
                          <label className='text-xl font-sans text-balance'>Symptoms</label>
                      </div>

                      <Form.List name='symptoms'>
                          {(fields, {add, remove}) => (
                              <>
                                  {fields.map(({key, name, ...restField}) => (
                                      <div key={key}>
                                          <div>
                                              <Form.Item
                                                  label='Symptom'
                                                  {...restField}
                                                  name={[name, 'symptom']}
                                              >
                                                  <Input.TextArea
                                                      className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                      size={"large"}/>                                              </Form.Item>
                                          </div>
                                          <div className='flex justify-center pb-8'>
                                              <button
                                                  className='bg-red-700 hover:bg-red-900 h-8 w-1/2 rounded-lg text-white'
                                                  onClick={() => remove(name)}>Remove Symptom
                                              </button>

                                          </div>
                                      </div>
                                  ))}
                                  <Form.Item>
                                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                          Add Symptom
                                      </Button>
                                  </Form.Item>
                              </>
                          )}
                      </Form.List>

                      <div className='pb-4'>
                          <label className='text-xl font-sans text-balance'>Prescription</label>
                      </div>

                      <Form.List name='prescription'>
                          {(fields, {add, remove}) => (
                              <>
                                  {fields.map(({key, name, ...restField}) => (
                                      <div key={key}>
                                          <div className='grid md:grid-cols-2 gap-6'>
                                              <Form.Item
                                                  label='Medicine'
                                                  {...restField}
                                                  name={[name, 'medicine']}
                                              >
                                                  <Input
                                                      className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                      size={"large"}/>
                                              </Form.Item>
                                              <Form.Item
                                                  label='Dosage'
                                                  {...restField}
                                                  name={[name, 'dosage']}
                                              >
                                                  <Input
                                                      className="border-2 border-gray-600 h-10 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500 transition duration-150 ease-in-out"
                                                      size={"large"}/>

                                              </Form.Item>

                                          </div>
                                          <div className='flex justify-center pb-8'>
                                              <button
                                                  className='bg-red-700 hover:bg-red-900 h-8 w-1/2 rounded-lg text-white'
                                                  onClick={() => remove(name)}>Remove Prescription
                                              </button>

                                          </div>
                                      </div>
                                  ))}
                                  <Form.Item>
                                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                          Add Prescription
                                      </Button>
                                  </Form.Item>
                              </>
                          )}
                      </Form.List>
                      <div>
                          <button className='bg-blue-900 hover:bg-blue-950 h-10 w-full rounded-2xl text-white text-xl'
                                  type="submit">Submit
                          </button>
                      </div>
                  </Form>
              </div>
          </div>

      </>
  )
}
export default NewPatient;
