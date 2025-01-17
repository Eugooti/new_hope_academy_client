import React, { useContext, useEffect, useRef, useState } from 'react';
import {Button, Form, Input, Skeleton, Table, Tag} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {readAssessments} from "../../../redux/Reducers/AdminSlice/assessmentSlice.js";
import {useNavigate} from "react-router-dom";
import {setSessionStorage} from "../../../utils/LocalStorage/sessionStorage.jsx";


const EditableContext = React.createContext(null);
// eslint-disable-next-line no-unused-vars
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingInlineEnd: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
const ViewAssessments = () => {
    const dispatch = useDispatch();
    const {loading,assessments} = useSelector((state) => state.assessment);


    useEffect(() => {
        dispatch(readAssessments());
    }, [dispatch]);


    useEffect(() => {
        if (assessments){
            const formattedData = assessments.result.map((assessment,index) => ({
                key: index,
                name: assessment.examName,
                facilitator: assessment.facilitator,
                term: assessment.term,
                classroom: assessment.classroomNo,
                tests: assessment.outcome.length,
                examiners: assessment.outcome[0].learners.length,
                date: `${assessment.startDate} - ${assessment.endDate}`,
                status: assessment.outcome[0].totals > 0,
                learners:assessment.outcome,
                id: assessment._id,
                subjects:assessment.outcome.map(subject => subject.subject),
            }));

            setDataSource(formattedData);
        }
    }, [assessments]);
    const [dataSource, setDataSource] = useState();
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const navigate = useNavigate()

    const toCaptureScores = (item) => {
        setSessionStorage("exam",item)
        navigate("/capture-scores")
    }
    const toGetAssessmentReport = (item) => {
        setSessionStorage("assessmentReport",item)
        navigate("/assessment-report")
    }

    const defaultColumns = [
        {
            title: 'Exam Name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'Classroom',
            dataIndex: 'classroom',
        },
        {
          title: "Tests",
          dataIndex: 'tests',
        },
        {
            title: 'Examiners',
            dataIndex: 'examiners',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
          title: "Status",
          dataIndex: 'outcome',
            render:(_, record)=>(
                record.status?<>
                    <Tag color="green-inverse">Captured</Tag>
                </>:<>
                    <Tag color="red-inverse">Pending</Tag>
                </>
            )
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <>

                        <Button onClick={() => !record.status?toCaptureScores(record):toGetAssessmentReport(record)} type="primary" danger={!record.status}>
                            {record.status?"View report":"Capture Scores"}
                        </Button>
                    </>

                ) : null,
        },
    ];
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <div>
            {loading&&
                <Skeleton/>
            }
            {assessments &&
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            }

        </div>
    );
};
export default ViewAssessments;