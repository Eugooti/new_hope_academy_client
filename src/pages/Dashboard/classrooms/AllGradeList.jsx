import {useEffect, useRef, useState} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {Button, Input, Popconfirm, Space, Table} from 'antd';
import Highlighter from 'react-highlight-words';
import Heading from "../../../components/heading/Heading.jsx";
import {useDispatch,useSelector} from "react-redux";
import {readClasses} from "../../../redux/Reducers/AdminSlice/classSlice.js";
import { createStyles } from 'antd-style';
import {ClassroomPDF} from "../../../utils/PDFDownload/PdfDownloads.js";

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

const AllClasses = () => {

    const dispatch=useDispatch();
    const {classroomList}=useSelector((state)=>state.classroom)


    useEffect( () => {
        dispatch(readClasses())
    }, [dispatch]);

    const [dataSource, setDataSource] = useState([])

    useEffect(()=>{
        if (classroomList) {
            const formatData = classroomList?.result.map((classroom,index) => ({
                key: index,
                name:classroom.classroomName,
                classTeacher: classroom.classroomFacilitator,
                male:classroom.population.male,
                female:classroom.population.female,
                total:classroom.population.total,
            }))

            setDataSource(formatData)
        }
    },[classroomList])

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
            fixed: 'left',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Class Teacher',
            dataIndex: 'classTeacher',
            key: 'gender',
            ...getColumnSearchProps('gender'),
        },
        {
            title: 'Male',
            dataIndex: 'male',
            key: 'male',

        },
        {
            title: 'Female',
            dataIndex: 'female',
            key: 'female',

        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',

        },

        {
            title: 'Action',
            fixed: 'right',
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
    const { styles } = useStyle();


    return (
        <>
            <Heading title={"Class Data"} subtitle={"Class Information"}/>

            <div className='flex justify-end align-middle pb-4'>

                <Button onClick={async () => {
                    if (dataSource.length > 0) {
                    await ClassroomPDF(dataSource);
                } else {
                    console.log("Data source is empty");
                }
                }}
                        type="dashed">Download Classroom Data</Button>
            </div>

            <Table
                className={styles.customTable}
                scroll={{
                    x: 'max-content',  // Enables horizontal scrolling
                }}
                columns={columns} bordered dataSource={dataSource} />

        </>

    )
};
export default AllClasses;
