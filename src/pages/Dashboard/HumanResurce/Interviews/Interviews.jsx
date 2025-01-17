import Heading from "../../../../components/heading/Heading.jsx";
import {useState} from "react";
import {Table, Tag} from "antd";
import {useTheme} from "../../../../context/ThemeContext/ThemeContext2.jsx";
import Button from "antd/es/button/index.js";

const interviews = [
    {key:1,fullName:"Bright Kim",email:'bright@gmail.com',role:'Teacher',date:'12-03-2024',status:false,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {key:2,fullName:"Prince July",email:'prince@gmail.com',role:'Driver',date:'10-03-2024',status:true,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {key:3,fullName:"Jane Doe",email:'jane@gmail.com',role:'Accountant',date:'19-03-2024',status:true,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {key:4,fullName:"Peter John",email:'peter@gmail.com',role:'IT Technician',date:'02-03-2024',status:false,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {key:5,fullName:"Tom Clancy",email:'clancy@gmail.com',role:'Cook',date:'12-02-2024',status:false,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {key:6,fullName:"Justine Timber",email:'justine@gmail.com',role:'Groundsman',date:'23-02-2024',status:false,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {key:7,fullName:"Riley Kim",email:'riley@gmail.com',role:'Administrator',date:'12-03-2024',status:true,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {key:8,fullName:"Frank John",email:'frank@gmail.com',role:'Nurse',date:'12-03-2024',status:false,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {key:9,fullName:"Kevin Klein",email:'kev@gmail.com',role:'Coach',date:'12-03-2024',status:false,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
    {key:10,fullName:"Joy Precious",email:'joy@gmail.com',role:'Accountant',date:'12-03-2024',status:false,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
]

 function Interviews() {

    const {currentTheme} = useTheme()


     const [data, setData] = useState(interviews);
     console.log(data)

    const markInterviewed = (key) => {
        const newData = [...data]
        const index = newData.findIndex(item => item.key === key)

        if(index > -1) {
            newData[index].status=!newData[index].status
            setData(newData);
        }
    }

     const columns =[
         {
           title:'Full Name',
           dataIndex: 'fullName',
           width:'15%'
         },
         Table.EXPAND_COLUMN,
         {
             title: 'Email Address',
             dataIndex: 'email',
             width: '18%'
         },
         {
             title: 'Role',
             dataIndex: 'role',
             width: '15%'
         },
         {
             title: 'Interview Date',
             dataIndex: 'date',
             width: '15%'
         },
         {
             title: 'Status',
             dataIndex: 'status',
             width: '15%',
             render: (_, record) => {
                 return (
                     <Tag color={record.status?"cyan-inverse":"red-inverse"} >{record.status?"Interviewed":"Pending.."}</Tag>
                 )
             }
         },
         {
             title: 'Action',
             render:(_, record)=>{
                 return (
                     <Button onClick={()=>markInterviewed(record.key)} type="text" danger>
                         Mark Interviewed
                     </Button>
                 )
             }
         }

     ]

     return (
        <>
            <Heading title="Interviews" subtitle='See all applicants'/>
            <Table
                scroll={{y: 400}}
                className='rounded-2xl'
                columns={columns}
                bordered
                expandable={{
                    expandedRowRender: (record) => (
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            {record.description}
                        </p>
                    ),
                }}
                rowClassName="editable-row"
                dataSource={data}
            />

        </>
    )
}
export default Interviews;