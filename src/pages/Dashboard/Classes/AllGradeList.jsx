
import {useEffect, useRef, useState} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {Button, Input, Popconfirm, Space, Table} from 'antd';
import Highlighter from 'react-highlight-words';
import Heading from "../../../components/heading/Heading.jsx";
import {useDispatch,useSelector} from "react-redux";
import {readClasses} from "../../../redux/Reducers/AdminSlice/classSlice.js";

const AllClasses = () => {

    const dispatch=useDispatch();
    const {loading,classList,error}=useSelector((state)=>state.grades)


    useEffect( () => {
        dispatch(readClasses())
    }, [dispatch]);

    console.log(classList&&classList)
    console.log(error && error)

    const [dataSource, setDataSource] =useState( [
        {key:1,name:"Play Group",gender:'Mr. Kevin',male:10,female:15,total:25},
        {key:2,name:"PP1",gender:'Mr. Tom',phone:"0723720516",male:10,female:15,total:25},
        {key:3,name:"PP2",gender:'Mrs. Jane',phone:"0723720516",male:10,female:15,total:25},
        {key:4,name:"Grade One",gender:'Mrs. Jil',phone:"0723720516",male:10,female:15,total:25},
        {key:5,name:"Grade Two",gender:'Mr. Ken',phone:"0723720516",male:10,female:15,total:25},
        {key:6,name:"Grade Three",gender:'Mr. Eugene',phone:"0723720516",male:10,female:15,total:25},
        {key:7,name:"Grade Four",gender:'Mrs. Betty',phone:"0723720516",male:10,female:15,total:25},
        {key:8,name:"Grade Five",gender:'Mr. Rose',phone:"0723720516",male:10,female:15,total:25},
        {key:9,name:"Grade Six",gender:'Mr. Steve',phone:"0723720516",male:10,female:15,total:25},
        {key:10,name:"Grade Seven",gender:'Mrs. June',phone:"0723720516",male:10,female:15,total:25},
        {key:11,name:"Grade Eight",gender:'Mr. Zing',phone:"0723720516",male:10,female:15,total:25},
    ]);


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

    const handleDelete = (key) => {
        console.log(key)
        const newData = dataSource.filter((item) => item.key !== key.key);
        setDataSource(newData);
    };

    const columns = [
        {
            title: 'Grade',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Class Teacher',
            dataIndex: 'gender',
            key: 'gender',
            width: '20%',
            ...getColumnSearchProps('gender'),
        },
        {
            title: 'Male',
            dataIndex: 'male',
            key: 'male',
            width: '12%'

        },
        {
            title: 'Female',
            dataIndex: 'female',
            key: 'female',
            width: '12%'

        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: '12%'

        },

        {
            title: 'Absent',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                        {/*<button className='bg-red-900 h-7 w-auto rounded-xl hover:bg-red-600'>Update</button>*/}
                        <Button danger type="text">Update</Button>

                    </Popconfirm>
                ) : null,
        },
    ];
    return (
        <>
            <Heading title={"Class Data"} subtitle={"Class Information"}/>
            <Table className='pt-5' columns={columns} bordered dataSource={dataSource} />

        </>

    )
};
export default AllClasses;
