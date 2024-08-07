import Heading from "../../../../components/heading/Heading.jsx";
import {Form, Input} from "antd";
import {useState} from "react";
import AnotherSchoolModal from "./ConfirmModal.jsx";
import {SearchOutlined} from "@ant-design/icons";

const ToAnotherSchool = () => {

    const search = (e) => {
      console.log(e)
    }

    const [open, setOpen] = useState(false);

    const handleYes = () => {
         console.log("This is yes")
    }


  return(
      <>
          <Heading title='Transfer Learner' subtitle='To Another School'/>

          <div className='py-4'>
              <label className='text-lg'>
                  Find Learner
              </label>
              <Form.Item className='mt-4' name="input">
                  <Input.Search prefix={<SearchOutlined/>} size='large' onSearch={search} placeholder='Enter Learner Admision Number'/>
              </Form.Item>


              <div className='grid md:grid-cols-2 gap-6'>
                  <div className="bg-gray-200 shadow-md alignCenter rounded-md p-6">
                      <h2 className="text-xl font-semibold mb-2">Learner Information</h2>
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
                                  <dt className="text-sm font-medium leading-6 text-gray-900">Grade</dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Three</dd>
                              </div>

                              <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">Admission Date</dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">07-01-2015</dd>
                              </div>

                              <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">Assessment Number</dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">A0003489498</dd>
                              </div>

                              <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">NEMIS Number</dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">QEU365</dd>
                              </div>


                          </dl>

                      </div>
                  </div>

                  <div className="bg-gray-200 shadow-md alignCenter rounded-md p-6">
                      <h2 className="text-xl font-semibold mb-2">Fee and Clinic Information</h2>
                      <div className={"p-4"}>
                          <h3 className="text-xl font-semibold mb-2">Fee Report</h3>
                          <dl className="divide-y divide-gray-400">
                              <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">Fee Balance</dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Ksh.
                                      10000.00
                                  </dd>
                              </div>
                              <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">Last Fee Paid</dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Ksh.
                                      3000.00
                                  </dd>
                              </div>
                          </dl>

                      </div>
                      <div className={"p-4"}>
                          <h3 className="text-xl font-semibold mb-2">Clinic Report</h3>
                          <dl className="divide-y divide-gray-400">
                              <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">Last Visit Date</dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                      12-12-2020
                                  </dd>
                              </div>
                              <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">Diagnosis</dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                      Flu
                                  </dd>
                              </div>

                              <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">Prescription</dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Piriton</dd>
                              </div>
                          </dl>

                      </div>

                  </div>

              </div>

              <div className='py-5 flex justify-center'>
                  <button onClick={()=>setOpen(true)} className='bg-red-900 h-10 w-1/2 rounded-xl text-xl text-white font-bold'>Transfer Learner</button>
              </div>

          </div>
          <AnotherSchoolModal handleYes={handleYes} setOpen={setOpen} open={open} />
      </>
  )
}
export default ToAnotherSchool;
