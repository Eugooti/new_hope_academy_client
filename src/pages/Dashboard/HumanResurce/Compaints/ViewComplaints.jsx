import Heading from "../../../../components/heading/Heading.jsx";
import Button from "antd/es/button/index.js";
import {Table, Tag} from "antd";
import {useState} from "react";

function ViewComplaints() {

    const initialData =[
        {key:1,accuser:'Bright Kim',accused:'Kevin Klein',complaint:'',date:'12-03-2024',status:false},
        {key:2,accuser:'Prince July',accused:'Joy Precious',complaint:'',date:'10-03-2024',status:true},
        {key:3,accuser:'Jane Doe',accused:'Frank John',complaint:'',date:'19-03-2024',status:false},
        {key:4,accuser:'Peter John',accused:'Riley Kim',complaint:'',date:'02-03-2024',status:true},
        {key:5,accuser:'Tom Clancy',accused:'Justine Timber',complaint:'',date:'12-02-2024',status:false},
        {key:6,accuser:'Justine Timber',accused:'Tom Clancy',complaint:'',date:'23-02-2024',status:true},
        {key:7,accuser:'Riley Kim',accused:'Peter John',complaint:'',date:'12-03-2024',status:false},
        {key:8,accuser:'Frank John',accused:'Jane Doe',complaint:'',date:'12-03-2024',status:true},
    ]


    const [data, setData] = useState(initialData);

    const markResolved =(key)=>{
        const newData = [...data]
        const index = newData.findIndex(item => item.key === key)
        if(index > -1) {
            newData[index].status=!newData[index].status
            setData(newData);
        }
    }

    const columns = [
        {
            title: "Accuser",
            dataIndex: "accuser",
            width:'15%'
        },
        {
            title: "Accused",
            dataIndex: 'accused',
            width:'15%'
        },
        {
            title: "Complaint",
            dataIndex: 'complaint',
            width:'25%'
        },
        {
            title: "Date",
            dataIndex: 'date',
            width:'15%'
        },
        {
            title: "Status",
            dataIndex: 'resolved',
            width:'12%',
            render: (_, record) =>{
                return (
                    <Tag color={record.status?"green-inverse":"red-inverse"} >{record.status?'Resolved':'Unresolved'}</Tag>
                )
            }
        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (_, record) =>{
                return (
                    <Button onClick={()=>markResolved(record.key)} type="text" danger>Mark Resolved</Button>
                )
            }
        },


    ]

    return (
        <>
            <Heading title={'View Complaints'} />
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

export default ViewComplaints