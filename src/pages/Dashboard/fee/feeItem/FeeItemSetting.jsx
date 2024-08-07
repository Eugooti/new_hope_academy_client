import {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import {useForm} from "antd/es/form/Form.js";
import {Form, Input, message, Switch} from "antd";
import {newFeeItem} from "../../../../redux/Reducers/AdminSlice/FeeSlice.js";
import {useDispatch, useSelector} from "react-redux";

// eslint-disable-next-line react/prop-types
export default function FeeItemSetting({handleYes,open,setOpen}) {

    const cancelButtonRef = useRef(null)

    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch=useDispatch();
    const {loading,feeItem,error}=useSelector(state => state.fee)
    const onFormFinish = async (values) => {
        // todo handle form finish
       await dispatch(newFeeItem(values)).then(action=>{
           console.log(action)
           action.error?
               messageApi.error(action.payload.message):
               messageApi.success(action.payload.message).then(()=>{
                   form.resetFields()
                   handleYes()
               })
       })
    };
    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
    };


    const rules={
        required:[{required: true,message:"Required Field"}]
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            {/*{contextHolder}*/}
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <Form
                                    form={form}
                                    name="basic"
                                    layout="vertical"
                                    className='w-full'
                                    initialValues={{remember: true}}
                                    onFinish={onFormFinish}
                                    onFinishFailed={onFormFinishFailed}
                                >
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div
                                                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600"
                                                                         aria-hidden="true"/>
                                            </div>
                                            <div className="mt-3 mb-7 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3"
                                                              className="text-base font-semibold leading-6 text-gray-900">
                                                    Create New Fee Item
                                                </Dialog.Title>
                                                <div className="mt-2">

                                                    <p className={feeItem?.success?"text-sm text-green-700":"text-sm text-red-700"}>
                                                        {feeItem && feeItem?.success && "Successfully Created"}
                                                        {error && !feeItem?.success && error.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        <Form.Item rules={rules.required} label="Vote" name="vote">
                                        <Input size={"large"}/>
                                        </Form.Item>
                                        <Form.Item rules={rules.required} label="Cost" name="charge">
                                            <Input size={"large"}/>
                                        </Form.Item>
                                        <Form.Item label="Required Fee?" name="compulsory" valuePropName="checked">
                                            <Switch/>
                                        </Form.Item>


                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 sm:ml-3 sm:w-auto"
                                        >
                                            {loading?"Creating":"Create Fee Item"}
                                        </button>

                                    </div>
                                </Form>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
