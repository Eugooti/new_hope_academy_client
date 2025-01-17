import Heading from "../../../components/heading/Heading.jsx";
import {getFromSessionStorage, removeSessionItem} from "../../../utils/LocalStorage/sessionStorage.jsx";
import {calculateSubjectAverages, transformOutcome} from "../../../Tests.js";
import {Button, Form, InputNumber, message, Popconfirm, Table} from "antd";
import {createStyles} from "antd-style";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {captureAssessments} from "../../../redux/Reducers/AdminSlice/assessmentSlice.js";
import {useNavigate} from "react-router-dom";

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

// Editable Cell Component
const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === "number" ? <InputNumber size="large" /> : null;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[{ required: true, message: `Please input ${title}!` }]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const CaptureScores = () => {
    const exam = getFromSessionStorage('exam');
    const [form] = Form.useForm();
    const [data, setData] = useState(transformOutcome(exam.learners).map((item,index)=>({
        key: index.toString(),
        ...item
    })));
    console.error(data)
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    // Edit Handler
    const edit = (record) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    // Save Handler
    const save = async (key) => {
        try {
            console.log(key)
            // Validate the form fields
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const updatedItem = { ...newData[index], ...row };
                newData.splice(index, 1, updatedItem);  // Update the specific row
                setData(newData);  // Update the state with the new data
                setEditingKey('');  // Exit edit mode
                form.resetFields();  // Reset form fields to clear previous values
            }
        } catch (errInfo) {
            console.error('Validate Failed:', errInfo);  // Log validation errors
        }
    };


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const updateScores = async () => {
        console.log(calculateSubjectAverages(data,exam?.subjects))
        const updatedScores= calculateSubjectAverages(data,exam?.subjects);
        const id = exam?.id;
        const Data = {data: updatedScores};

      await dispatch(captureAssessments({id, data:Data})).then(action=>{
          action.error?
              messageApi.error(action.payload.message):
              messageApi.success(action.payload.message).then(()=>{
                  removeSessionItem('exam')
                  navigate('/view-assessment')
              })
      });

    }


    // Cancel Handler
    const cancel = () => {
        setEditingKey('');
    };

    // Generate columns
    const subjectColumns = exam?.subjects.map((subjectData) => ({
        title: subjectData,
        dataIndex: subjectData,
        width: 'auto',
        editable: true,
    }));

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            fixed: 'left',
        },
        {
            title: 'Admission Number',
            dataIndex: 'admNo',
            fixed: 'left',
        },
        ...subjectColumns,
        {
            title: 'Action',
            dataIndex: 'action',
            fixed: 'right',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Button type="link" onClick={() => save(record.key)}>Save</Button>
            <Popconfirm title="Cancel changes?" onConfirm={cancel}>
              <Button type="link">Cancel</Button>
            </Popconfirm>
          </span>
                ) : (
                    <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record)}>Capture Scores</Button>
                );
            },
        },
    ];

    // Merge columns with EditableCell props
    const mergedColumns = columns.map((col) => {
        if (!col.editable) return col;
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex !== 'name' && col.dataIndex !== 'admNo' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const { styles } = useStyle();

    return (
        <>
            {contextHolder}
            <Heading title="Capture Scores" subtitle={`${exam?.name} Examination`} />
            <Form form={form} component={false}>
                <Table
                    bordered
                    components={{ body: { cell: EditableCell } }}
                    className={styles.customTable}
                    dataSource={data.map((item, index) => ({ ...item, key: index.toString() }))}
                    columns={mergedColumns}
                    scroll={{ x: 'max-content' }}
                    pagination={{ pageSize: 10 }}
                />
            </Form>
            <Button onClick={updateScores} type="primary">Submit</Button>


        </>
    );
};

export default CaptureScores;
