import { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {Avatar, Button, Input, Popconfirm, Space, Table, Tag} from 'antd';
import Highlighter from 'react-highlight-words';
import Heading from "../../../components/heading/Heading.jsx";
import { useSelector, useDispatch } from "react-redux";
import { readStaff } from "../../../redux/Reducers/AdminSlice/staffSlice.js";

const StaffList = () => {
    const dispatch = useDispatch();
    const { error, staffList } = useSelector((state) => state.staff);

    useEffect(() => {
        dispatch(readStaff());
    }, [dispatch]);


    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (staffList) {
            const formattedData = staffList?.result.map((staff, index) => ({
                key: index + 1,
                name: `${staff.firstname} ${staff.lastName}`,
                gender: staff.gender,
                phone: staff.phone
            }));
            setDataSource(formattedData);
        }
    }, [staffList]);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

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
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => { close(); }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key.key);
        setDataSource(newData);
    };

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
            width: '33%',
            ...getColumnSearchProps('name'),
            render: (text) => (
                <>
                    <Avatar>{text[0]}</Avatar> {text}
                </>
            ),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: '20%',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%'
        },
        {
            title: 'Absent',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                        <Button type="text" danger>
                            Absent
                        </Button>
                    </Popconfirm>
                ) : null,
        },
    ];

    return (
        <>
            <Heading title={"Staff List"} />
            <Table className='pt-5' columns={columns} bordered dataSource={dataSource} />
        </>
    );
};

export default StaffList;
