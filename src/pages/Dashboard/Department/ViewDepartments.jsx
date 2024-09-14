import {useEffect, useState} from 'react';
import {Form, Input, message, Popconfirm, Select, Skeleton, Table, Typography} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteDepartment,
    fetchDepartments,
    updateDepartment
} from "../../../redux/Reducers/AdminSlice/departmentSlice.js";
import {readStaff} from "../../../redux/Reducers/AdminSlice/staffSlice.js";
import Button from "antd/es/button/index.js";
import index from "../Index.jsx";


const ViewDepartments = () => {

    const {  staffList } = useSelector((state) => state.staff);
    const dispatch2=useDispatch();

    useEffect(() => {
        dispatch2(readStaff());
    }, [dispatch2]);

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (staffList) {
            const formattedData = staffList?.result.map((staff) => ({
                label:staff.gender === "Male"?`Mr. ${staff.firstname} ${staff.lastName}`:`Mrs. ${staff.firstname} ${staff.lastName}`,
                value:staff.gender === "Male"?`Mr. ${staff.firstname} ${staff.lastName}`:`Mrs. ${staff.firstname} ${staff.lastName}`,
            }));
            setDataSource(formattedData);
        }
    }, [staffList]);

    const EditableCell = ({
                              // eslint-disable-next-line react/prop-types
                              editing,
                              // eslint-disable-next-line react/prop-types
                              dataIndex,
                              // eslint-disable-next-line react/prop-types
                              title,
                              // eslint-disable-next-line react/prop-types
                              inputType,
                              // eslint-disable-next-line no-unused-vars,react/prop-types
                              record,
                              // eslint-disable-next-line no-unused-vars,react/prop-types
                              index,
                              // eslint-disable-next-line react/prop-types
                              children,
                              ...restProps
                          }) => {
        let inputNode;
        if (inputType === 'select') {
            inputNode = (
                <Select
                    size={"large"}
                    options={dataSource}
                    placeholder="Mr. John Tom"
                />
            );
        } else {
            inputNode = <Input size={"large"} />;
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
                                message: `Please Input ${title}!`,
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


    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const dispatch = useDispatch();

    const {departments,loading} = useSelector((state)=>state.department)
    const [departmentData, setDepartmentData] = useState();
    useEffect(() => {
        if (departments && departments.success){
            const mappedDepartment=departments.result.map((item,index)=>({
                key: index,
                name: item.name,
                departmentHead: item.departmentHead,
                id:item._id

            }))
            setDepartmentData(mappedDepartment)
        }
    }, [departments]);

    useEffect(() => {
        dispatch(fetchDepartments())
    }, [dispatch]);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };
    const [messageApi, contextHolder] = message.useMessage();
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...departmentData];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                const id = item.id
                await dispatch(updateDepartment({id, deptData:row})).then(action=>{
                    action.error?
                        messageApi.error(action.payload.message):
                        messageApi.success(action.payload.message).then(()=>{
                            newData.splice(index, 1, {
                                ...item,
                                ...row,
                            });
                            setDepartmentData(newData);
                            setEditingKey('');
                        })
                })

            } else {
                newData.push(row);
                setDepartmentData(newData);
                setEditingKey('');

            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deletion = async (key) => {
        console.log(key)
        const newData = [...departmentData];
        const id = newData[key].id;
        await dispatch(deleteDepartment(id)).then(action=>{
            action.error?
                messageApi.error(action.payload.message):
                messageApi.success(action.payload.message).then(()=>{
                    newData.splice(key, 1)
                    setDepartmentData(newData)
                })
        })
    }

    const columns = [
        {
            title: 'Department',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Department Head',
            dataIndex: 'departmentHead',
            width: '35%',
            editable: true,
        },
        {
            title: 'Update',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_, record) => {
                return (
                    <>
                        <Popconfirm title="Sure to cancel?" onConfirm={()=>deletion(record.key)}>
                            <Button type="text" danger>
                                Delete
                            </Button>
                        </Popconfirm>
                    </>
                )
            }
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'departmentHead' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <>
            {contextHolder}

                 <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={departmentData}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: cancel,
                            }}
                        />
                    </Form>


        </>
    );
};

export default ViewDepartments;
