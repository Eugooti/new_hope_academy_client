import {useForm} from "antd/es/form/Form.js";
import {Button, Descriptions, Form, Input, message, Popconfirm, Select, Table} from "antd";
import {useTheme} from "../../../context/ThemeContext/ThemeContext2.jsx";
import DateRangePickerWrapper from "../../../components/DatePicker/DateRangePickerWrapper.jsx";
import {useEffect, useState} from "react";
import {Step, StepLabel, Stepper} from "@mui/material";
import {
    getFromSessionStorage,
    removeSessionItem,
    setSessionStorage
} from "../../../utils/LocalStorage/sessionStorage.jsx";
import {createStyles} from 'antd-style';
import {useDispatch, useSelector} from "react-redux";
import {createAssessment} from "../../../redux/Reducers/AdminSlice/assessmentSlice.js";
import {useNavigate} from "react-router-dom";
import {readStaff} from "../../../redux/Reducers/AdminSlice/staffSlice.js";

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
        customTable: css`
            ${antCls}-table {
                ${antCls}-table-container {
                    ${antCls}-table-body,
                    ${antCls}-table-content {
                        scrollbar-width: thin;
                        scrollbar-color: unset;
                    }
                }
            }
        `,
    };
});


const examDay = ['Day One','Day Two','Day Three','Day Four','Day Five'].map(item=>({
    label:item,
    value:item
}))



export const NewAssessment = () => {


    const {currentTheme} = useTheme()

    const EditableCell = ({
                              // eslint-disable-next-line react/prop-types
                              editing,
                              // eslint-disable-next-line react/prop-types
                              dataIndex,
                              // eslint-disable-next-line react/prop-types,no-unused-vars
                              title,
                              // eslint-disable-next-line react/prop-types
                              inputType,
                              // eslint-disable-next-line react/prop-types,no-unused-vars
                              record,
                              // eslint-disable-next-line react/prop-types,no-unused-vars
                              index,
                              // eslint-disable-next-line react/prop-types
                              children,
                              ...restProps
                          }) => {

        let inputNode;
        if(inputType === 'select'){
            inputNode = (
                <Select
                    size={'large'}
                    options={subjectOptions.map(item=>({
                        label:item,
                        value:item
                    }))}
                    placeholder={'Select Subject'}
                    style={selectStyles}
                    dropdownStyle={{
                        backgroundColor: currentTheme.surface,
                    }}
                />
            )
        }else {
            inputNode= (
                <Select
                    size={'large'}
                    options={examDay}
                    style={selectStyles}
                    dropdownStyle={{
                        backgroundColor: currentTheme.surface,
                    }}
                />
            )
        }
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Required Field`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const [form1] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form1.setFieldsValue({
            day: '',
            examOne: '',
            examTwo: '',
            examThree: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form1.validateFields();
            const newData = [...initialData];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setInitialData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setInitialData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = async (key)=>{
        setCount(prevState => {
            const newData = [...initialData]
            const index = newData.findIndex(item => item.key === key.key)
            newData.splice(index,1)
            setInitialData(newData)
            return prevState -1

        })


    }

    const steps = [
        {title:'Exam Details',content:'exam-details'},
        {title:'Exam Timetable',content:'exam-timetable'},
        {title:'Confirm Details',content:'confirm-details'},
    ].map(item=>({
        key:item.content,
        title:item.title,
    }))



    const currentStep = getFromSessionStorage('step')

    const [currentTab, setCurrentTab] = useState(currentStep || 0);

    const next = () => {
        if (currentTab < steps.length - 1) {
            setCurrentTab(prevState => {
                const newTab = prevState+1
                setSessionStorage('step', newTab);
                return newTab;
            })
        }
    };

    const prev = () => {
        if (currentTab > 0) {
            setCurrentTab(prevState => {
                const newTab = prevState-1
                setSessionStorage('step', newTab);
                return newTab;
            })
        }
    };

    const [form] = useForm();

    const selectStyles = {
        backgroundColor: currentTheme.surface,
        color: currentTheme.text,
        borderColor: currentTheme.border,
    }

    const onFormFinish = (values) => {
        // todo handle form finish

        setSessionStorage("examDetails",values)
        next()
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };

    const term =["Term One","Term Two","Term Three"].map(item=>({
        label:item,
        value:item,
    }))
    const educationData = [
        {
            level: "Pre-primary (PP1 and PP2)",
            subjects: [
                "Language Activities",
                "Mathematical Activities",
                "Environmental Activities",
                "Creative Activities",
                "Religious Activities",
                "Pastoral Programmes of Instruction (PPI)",
            ],
            classroom:[{label:"Pre-primary One",value:"PP1"},{label:"Pre-primary Two",value:"PP2"}]
        },
        {
            level: "Lower Primary (Grades 1 to 3)",
            subjects: [
                "Kiswahili/Kenya Sign Language",
                "English",
                "Mathematics",
                "Environmental Activities (Hygiene and Nutrition)",
                "Religious Education",
                "Creative Arts",
                "Indigenous Languages",
            ],
            classroom:[{label:"Grade One",value:"G1"},{label:"Grade Two",value:"G2"},{label:"Grade Three",value:"G3"}]

        },
        {
            level: "Middle School (Grades 4–6)",
            subjects: [
                "English",
                "Kiswahili/Kenya Sign Language",
                "Mathematics",
                "Science and Technology",
                "Social Studies (Citizenship, History, Geography)",
                "Agriculture and Nutrition",
                "Creative Arts (Art, Craft, Music, Physical Education)",
                "Religious Education (Christian, Islamic, Hindu)",
            ],
            classroom:[{label:"Grade Four",value:"G4"},{label:"Grade Five",value:"G5"},{label:"Grade Six",value:"G6"}]

        },
        {
            level: "Junior Secondary (Grades 7–9)",
            subjects: [
                "English",
                "Kiswahili/Kenya Sign Language",
                "Mathematics",
                "Integrated Science",
                "Pre-Technical Studies",
                "Social Studies",
                "Agriculture and Nutrition",
                "Creative Arts and Sports",
                "Religious Education",
            ],
            classroom:[{label:"Grade Seven",value:"G7"},{label:"Grade Eight",value:"G8"},{label:"Grade Nine",value:"G9"}]

        },
    ];

    const [classroomOptions, setClassroomOptions] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);

    const handleLevelChange = (value) => {
        const selectedLevel = educationData.find((level) => level.level === value);
        setClassroomOptions(selectedLevel ? selectedLevel.classroom : []);
        setSubjectOptions([]); // Reset subjects
        form.setFieldsValue({ classroom: null, subject: null });
    };

    const handleClassroomChange = () => {
        const selectedLevel = educationData.find(
            (level) => level.level === form.getFieldValue("level")
        );
        setSubjectOptions(selectedLevel ? selectedLevel.subjects : []);
        form.setFieldsValue({ subject: null }); // Reset subject field
    };


    const column = [
        {
            title:'Day',
            dataIndex: 'day',
            width: 120,
            editable: true,
            fixed: 'left'
        },
        {
            title:'First Exam',
            dataIndex: 'examOne',
            width: 200,
            editable: true,
        },
        {
            title:'Second Exam',
            dataIndex: 'examTwo',
            width: 200,
            editable: true,
        },
        {
            title:'Last Exam',
            dataIndex: 'examThree',
            width: 200,
            editable: true,
        },
        {
            title: 'Create Schedule',
            fixed: 'right',
            width: 150,
            dataIndex: 'action',
            render:(_,record)=>{
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button type={"text"}
                            onClick={() => save(record.key)}
                            style={{
                                marginInlineEnd: 8,
                            }}
                        >
                          Save
                        </Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ):
                 (
                    <>
                        <Button type={'dashed'} onClick={()=>edit(record)}>Create</Button>
                    </>
                )
            }
        },
        {
            title: 'Delete Schedule.',
            dataIndex: 'delete',
            width: 140,
            fixed: 'right',
            render: (_, record) => {
                return (
                    <>
                        <Button onClick={()=>handleDelete(record)} type="dashed" danger>
                            Delete
                        </Button>
                    </>
                )
            }
        }

    ]

    const mergedColumns = column.map((col) => {
        if (!col.editable) {
            return col;
        }
        if (col.dataIndex === 'examOne'||col.dataIndex ==='examTwo'|| col.dataIndex ==='examThree'){
            return {

                ...col,
                onCell: (record) => ({
                    record,
                    inputType: 'select',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        }

        return {

            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });



    const [initialData, setInitialData] = useState([]);
    const [count, setCount] = useState(initialData.length);


    useEffect(() => {
        const examDetails = getFromSessionStorage('examDetails')
        const timetable = getFromSessionStorage('timeTable')
        if (examDetails){
            form.setFieldsValue(examDetails)
        }
        if (timetable){
            setInitialData(timetable)
        }

    }, [form]);


    const [messageApi, contextHolder] = message.useMessage();
    const examDays=getFromSessionStorage('examDays')

    const handleAdd = () => {
        console.log(count)
        setCount(prevState => {
            if (prevState >= examDays){
                messageApi.warning("Go back to exam details to add more days")
                return prevState
            }else {
                const newData = {key:prevState,day:'Day One',examOne:"",examTwo:"",examThree:""};
                setInitialData([...initialData, newData]);
                edit(newData)
                return prevState +1
            }
        })
    };

    const handleSchedule = ()=>{
        setSessionStorage('timeTable',initialData)
        next()
    }

    const { styles } = useStyle();

    const rule = {
        required:[{required: true , message:"Required Field!"}]
    }

    const examDetails = getFromSessionStorage('examDetails')
    const timetable = getFromSessionStorage('timeTable')
    const dispatch = useDispatch()

    const navigate= useNavigate();

    const {  staffList } = useSelector((state) => state.staff);

    useEffect(() => {
        dispatch(readStaff());
    }, [dispatch]);


    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (staffList) {
            const formattedData = staffList?.result.map((staff) => ({
                label:staff.gender === "Male"?`Mr. ${staff.firstname} ${staff.lastName}`:`Mrs. ${staff.firstname} ${staff.lastName}`,
                value: staff.employeeNo
            }));
            setDataSource(formattedData);
        }
    }, [staffList]);


    const handleSubmit = async () => {
        const facilitator = dataSource.find(item => item.value === examDetails.facilitator)

        const data = {
            examName:examDetails?.examName,
            facilitator:facilitator.label,
            classroom:examDetails?.classroom,
            level:examDetails?.level,
            startDate:examDetails?.dateRange[0],
            endDate:examDetails?.dateRange[1],
            timetable:timetable,
            subjects:examDetails?.subject,
            term:examDetails?.term,
        }

        console.log(data)

        await dispatch(createAssessment(data)).then((action)=>{
            action.error?
                messageApi.error(action.payload.message):
                messageApi.success(action.payload.message).then(()=>{
                    removeSessionItem('step')
                    removeSessionItem('examDays')
                    removeSessionItem('examDetails')
                    navigate('/view-assessment')
                })
        })
    }

    const handleRangeChange = (dateStrings, differenceInDays) => {
        console.log('Selected Date Range:', dateStrings);
        console.log('Difference in days:', differenceInDays);
    };

    return (
        <>
            {contextHolder}
            <Stepper activeStep={currentTab} alternativeLabel>
                {steps.map((item)=>(
                    <Step key={item.content}>
                        <StepLabel ><label className='text-lg' style={{color:currentTheme.text}}>{item.title}</label></StepLabel>
                    </Step>
                ))}
            </Stepper>

            {currentTab === 0 &&(
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    initialValues={{remember: true}}
                    onFinish={onFormFinish}
                    onFinishFailed={onFormFinishFailed}
                >
                    <div className='grid py-8 sm:grid-cols-1 md:grid-cols-2 md:gap-4 sm:gap-2' >
                        <Form.Item rules={rule.required} label="Exam Name" name="examName">
                            <Input
                                size='large'
                                placeholder="Enter Exam Name"

                            />
                        </Form.Item>
                        <Form.Item rules={rule.required} label="Term" name='term'>
                            <Select
                                size={"large"}
                                placeholder={"Select Term"}
                                options={term}
                                style={selectStyles}
                                dropdownStyle={{
                                    backgroundColor: currentTheme.surface,
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="level"
                            label="Select Level"
                            rules={rule.required}
                        >
                            <Select
                                size="large"
                                placeholder="Select Level"
                                options={educationData.map((level) => ({
                                    value: level.level,
                                    label: level.level,
                                }))}
                                style={selectStyles}
                                dropdownStyle={{
                                    backgroundColor: currentTheme.surface,
                                }}
                                onChange={handleLevelChange}
                            />
                        </Form.Item>

                        <Form.Item rules={rule.required} label="Classroom" name='classroom'>
                            <Select
                                size={"large"}
                                options={classroomOptions}
                                onChange={handleClassroomChange}
                                style={selectStyles}
                                disabled={classroomOptions.length === 0}
                                dropdownStyle={{
                                    backgroundColor: currentTheme.surface,
                                }}
                            />
                        </Form.Item>


                        <Form.Item
                            name="subject"
                            label="Subject"
                            rules={rule.required}
                        >
                            <Select
                                size="large"
                                placeholder="Select Subject"
                                options={subjectOptions.map((subject) => ({
                                    value: subject,
                                    label: subject,
                                }))}
                                disabled={subjectOptions.length === 0}
                                mode={"tags"}
                                tokenSeparators={[',']}
                                style={selectStyles}
                                dropdownStyle={{
                                    backgroundColor: currentTheme.surface,
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Date Range"
                            name="dateRange"
                            rules={[{ required: true, message: 'Please select a date range!' }]}
                        >
                            <DateRangePickerWrapper
                                className={'w-full'}
                                onRangeChange={handleRangeChange}
                            />
                        </Form.Item>

                        <Form.Item rules={rule.required} label="Exam Facilitator" name="facilitator">
                            <Select
                                style={selectStyles}
                                dropdownStyle={{
                                    backgroundColor: currentTheme.surface,
                                }}
                                placeholder={'Select Class teacher'}
                                options={dataSource}
                                size={"large"}
                            />
                        </Form.Item>

                    </div>
                    <div className='flex align-middle justify-end'>
                        <Button className='w-28' type={"primary"} htmlType='submit'>Next</Button>
                    </div>
                </Form>
            )}

            {currentTab === 1 && (
                <>
                    <Button onClick={handleAdd} className={'mb-5'} type={"primary"}>Add Day Schedule</Button>
                    <Form form={form1} className={''} component={false}>
                        <Table
                            columns={mergedColumns}
                            dataSource={initialData}
                            className={styles.customTable}
                            pagination={{
                                onChange: cancel,
                            }}
                            bordered
                            scroll={{
                                x: 'max-content',
                            }}
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                        />
                    </Form>
                    <div className='flex align-middle justify-end gap-4 py-4'>
                        <Button className='w-28' onClick={prev} type="dashed" ghost>
                            Back
                        </Button>
                        <Button className='w-28' onClick={handleSchedule} type={"primary"}>Next</Button>
                    </div>
                </>
            )}
            {currentTab ===2 && (
                <>
                    <div style={{background:currentTheme.background}} className='shadow-md p-4 mt-8 rounded-2xl'>
                        <Descriptions
                            title="Exam Details."
                            column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}
                            style={{color:currentTheme.text}}
                        >
                            <Descriptions.Item style={{color:currentTheme.text}} label="Exam Name">{examDetails?.examName}</Descriptions.Item>
                            <Descriptions.Item label="Classroom">{examDetails?.classroom}</Descriptions.Item>
                            <Descriptions.Item label="Exam Facilitator">{examDetails?.facilitator}</Descriptions.Item>
                            <Descriptions.Item label="Year Term">{examDetails?.term}</Descriptions.Item>
                            <Descriptions.Item label="Start Date">{examDetails?.dateRange[0]}</Descriptions.Item>
                            <Descriptions.Item label="End Date">{examDetails?.dateRange[1]}</Descriptions.Item>
                            <Descriptions.Item label="Exam Days">{examDays}</Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div style={{background:currentTheme.background}} className='shadow-md p-4 mt-8 rounded-2xl'>

                        <Descriptions
                            title="Exam Timetable."
                            column={{xxl: 4, xl: 2, lg: 2, md: 3, sm: 2, xs: 1}}
                        >
                            {timetable?.map((item,index)=>(
                                <Descriptions.Item key={index} label={item.day}>{`${item.examOne}, ${item.examTwo}, ${item.examThree}.`}</Descriptions.Item>
                            ))}
                        </Descriptions>
                    </div>

                    <div className='flex mt-6 gap-4 align-middle justify-end'>
                        <Button type={'dashed'} className='w-28' onClick={prev}>
                            back
                        </Button>
                        <Button className='w-28' type={"primary"} onClick={handleSubmit}>
                            Finish
                        </Button>
                    </div>
                </>
            )}
        </>
    )
}