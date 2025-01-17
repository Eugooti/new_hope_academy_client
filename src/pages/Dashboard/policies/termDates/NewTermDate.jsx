import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import {useForm} from "antd/es/form/Form.js";
import {Form, Input} from "antd";
import Button from "antd/es/button/index.js";
import {CloseOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import TextArea from "antd/es/input/TextArea.js";
import DatePickerWrapper from "../../../../components/DatePicker/DatePickerWrapper.jsx";
import {useTheme} from "../../../../context/ThemeContext/ThemeContext2.jsx";
import {getFromSessionStorage} from "../../../../utils/LocalStorage/sessionStorage.jsx";
import {createSchedule} from "../../../../redux/Reducers/AdminSlice/scheduleSlice.js";

// eslint-disable-next-line react/prop-types
function NewTermDate({open,setOpen}) {

    const cancelButtonRef = useRef(null)
    const {currentTheme} = useTheme()

    const [form] = useForm();
    const user = getFromSessionStorage('user')

    const {loading} = useSelector((state) => state.schedule);
    const dispatch = useDispatch()

    const [successMessage, setSuccessMessage] = useState();

    const [errorMessage, setErrorMessage] = useState();
    const onFormFinish = (values) => {
        // todo handle form finish
        const data = {
            ...values,
        }
        const id = user?.employeeNo;
        dispatch(createSchedule({id, data})).then((action)=>{
            if (action.error){
                setErrorMessage(action.error.message)
                setTimeout(()=>{
                    setErrorMessage(null)
                    form.resetFields()
                },2000)
            }
            setSuccessMessage(action?.payload.message)

            setTimeout(()=>{
                setSuccessMessage(null)
                form.resetFields()
            },2000)

        })

    };

    const rules = {
        required: [{required:true,message:"Required Fields."}],
    }

    return (
        <Transition.Root show={open} as={Fragment}>
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
                            <Dialog.Panel
                                style={{background:currentTheme.surface, color:currentTheme.text}}
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className='flex align-middle justify-end pt-3 pr-3'>
                                    <Button type="text" onClick={()=>setOpen(false)} shape="circle" icon={<CloseOutlined/>}/>
                                </div>
                                <div className=" px-4 pb-4 sm:pl-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-green-600"
                                                                     aria-hidden="true"/>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-base font-semibold leading-6">
                                                What do you have planned?
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm">
                                                    Add a Term Date.
                                                </p>
                                            </div>
                                            <div>
                                                {successMessage&&<div className='text-lg font-bold text-green-600'><h1>{successMessage}</h1></div>}
                                                {errorMessage&&<div className='text-lg font-bold text-red-600'><h1>{errorMessage}</h1></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" px-4 py-3 sm:px-6">

                                    <Form
                                        form={form}
                                        name="basic"
                                        layout="vertical"
                                        initialValues={{remember: true}}
                                        onFinish={onFormFinish}
                                    >


                                        <Form.Item rules={rules.required} label="Activity" name="event">
                                            <Input placeholder="Enter event." size={"large"}/>
                                        </Form.Item>
                                        <Form.Item rules={rules.required} label="Date" name="date">
                                            <DatePickerWrapper style={{width: '100%'}} classname='w-full' size='large'/>
                                        </Form.Item>
                                        <Form.Item rules={rules.required} label="Description" name="description">
                                            <TextArea rows={4}/>
                                        </Form.Item>

                                        <div className='flex align-middle justify-end py-4'>
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto"
                                            >
                                                {loading?"Creating...":"Create Date"}
                                            </button>
                                        </div>

                                    </Form>


                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default NewTermDate
