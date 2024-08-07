import {useEffect, useRef, useState} from 'react';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import {Button, Form, Input, InputNumber, message, Popconfirm, Select, Space, Table, Typography} from 'antd';
import Highlighter from 'react-highlight-words';
import FeeItemSetting from "./FeeItemSetting.jsx";
import {getFeeItems, updateFeeItem,deleteFeeItem} from "../../../../redux/Reducers/AdminSlice/FeeSlice.js";
import {useDispatch, useSelector} from "react-redux";

const options = [
    { label: "one", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
];

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    let inputNode;
    if (inputType === 'number') {
        inputNode = <InputNumber />;
    } else if (inputType === 'select') {
        inputNode = (
            <Select
                options={options}
                size={"large"}
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

const FeeItemsList = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState();

    const dispatch=useDispatch();
    const {loading,feeItems}=useSelector(state => state.fee)

    useEffect(() => {
        dispatch(getFeeItems())
    }, [dispatch]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (feeItems){
            const itemsData=feeItems?.response.map((item,index)=>({
                key: index+1,
                id: item._id,
                vote:item.vote,
                cost:item.charge,
            }))

            setDataSource(itemsData)
        }
    }, [feeItems]);


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editingKey, setEditingKey] = useState('');
    const searchInput = useRef(null);

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
            const newData = [...dataSource];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                const data=newData.find(item=>key === item.key)
                const formData={
                    vote:data.vote,
                    charge:data.cost
                }
                const id=data.id
                dispatch(updateFeeItem({id, formData})).then((action)=>{
                    if (action.error){
                        messageApi.error(action.payload.message)
                    }else {
                        messageApi.success(action.payload.message)
                        setEditingKey('');
                        setDataSource(newData);

                    }
                })
            } else {
                newData.push(row);
                setDataSource(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const handleDelete = async (key) => {
        await dispatch(deleteFeeItem(key.id)).then(action => {
            if (action.error) {
                messageApi.error(action.payload.message || 'Network error');
            } else {
                messageApi.success(action.payload.message).then(() => {
                    const newData = dataSource.filter((item) => item.key !== key.key);
                    setDataSource(newData);
                });
            }
        });
    };

    const columns = [
        {
            title: 'Vote',
            dataIndex: 'vote',
            key: 'vote',
            width: '40%',
            editable: true,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
            width: '20%',
            editable: true,
        },
        {
            title: 'Operation',
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
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                        <Button type="text" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                ) : null,
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
                inputType: col.dataIndex === 'cost' ? 'number' : col.dataIndex === 'address' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const [open, setOpen] = useState(false);
    const handleYes = () => {
        window.location.href='/view-feeItem'
    };

    return (
        <>
            {contextHolder}
            <div className='mb-5 flex align-middle justify-end'>
                <Button onClick={() => setOpen(true)} icon={<PlusOutlined />} type="primary">Add Fee Item</Button>
            </div>

            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={dataSource}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>

            <FeeItemSetting open={open} setOpen={setOpen} handleYes={handleYes} />
        </>
    );
};

export default FeeItemsList;
