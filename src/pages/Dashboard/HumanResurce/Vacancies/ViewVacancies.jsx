import Heading from "../../../../components/heading/Heading.jsx";
import {useState} from "react";
import {Table, Tag} from "antd";
import {useTheme} from "../../../../context/ThemeContext/ThemeContext2.jsx";
import Button from "antd/es/button/index.js";

const ViewVacancies = () => {

    const {currentTheme} = useTheme()

    const mockData =[
        {key:1,jobTitle:'Driver',department:'Logistics',status:false},
        {key:2,jobTitle:'Driver',department:'Logistics',status:true},
        {key:3,jobTitle:'Driver',department:'Logistics',status:true},
        {key:4,jobTitle:'Driver',department:'Logistics',status:true},
        {key:5,jobTitle:'Driver',department:'Logistics',status:false},
        {key:6,jobTitle:'Driver',department:'Logistics',status:false},
        {key:7,jobTitle:'Driver',department:'Logistics',status:true},
        {key:8,jobTitle:'Driver',department:'Logistics',status:false},
        {key:9,jobTitle:'Driver',department:'Logistics',status:true},
        {key:10,jobTitle:'Driver',department:'Logistics',status:false},
    ]


    const [data, setData] = useState(mockData);

    const markRecruited = async (key)=>{
        const newData = [...data]
        const index = newData.findIndex(item => item.key === key)

        if(index > -1) {
            newData[index].status=!newData[index].status
            setData(newData);
        }
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'jobTitle',
            width: '25%',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            width: '25%',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            render: (_, record) => {
                return (
                    <Tag color={record.status?currentTheme.success:currentTheme.error}>{record.status?"Recruited":"Recruiting.."}</Tag>
                )
            }
        },
        {
            title: "Operation",
            dataIndex: 'operation',
            render:(_, record)=>{
                return (
                    <Button onClick={()=>markRecruited(record.key)} type="text" danger>
                        Mark Recruited
                    </Button>
                )
            }
        }

    ]

    return (
        <>

            <Heading title="Vacancies" />
            <Table
                scroll={{y: 400}}
                className='rounded-2xl'
                columns={columns}
                bordered
                rowClassName="editable-row"
                dataSource={data}
            />


        </>
    )

}

export default ViewVacancies;