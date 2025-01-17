import Heading from "../../../../components/heading/Heading.jsx";
import {Table} from "antd";
import Button from "antd/es/button/index.js";
import {useEffect, useState} from "react";
import NewTermDate from "./NewTermDate.jsx";
import {useDispatch} from "react-redux";
import {readSchedules, readUserSchedule} from "../../../../redux/Reducers/AdminSlice/scheduleSlice.js";
import {getFromSessionStorage} from "../../../../utils/LocalStorage/sessionStorage.jsx";

const TermDates = () => {

    const columns = [
        {
            title: 'Activity',
            dataIndex: 'activity',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'action',
            dataIndex: 'action',
            render: (_, record) =>(
                <>
                    <button onClick={()=>console.log(record)} className='bg-blue-900 h-7 w-28 rounded-md'>Action</button>
                </>
            )
        }
    ]


    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()

    const user = getFromSessionStorage('user')

    console.log(user)

    useEffect(() => {
        dispatch(readUserSchedule(user?.employeeNo)).then(action=>{
            console.log(action.payload);
        })
        // dispatch(readSchedules()).then(action=>{
        //     console.log(action.payload);
        // })
    }, [dispatch]);
    return (
      <>
          <Heading title={"Important Dates"}/>
          <div className='pb-3 flex align-middle justify-end pr-3'>
              <Button onClick={()=>setOpen(true)} type="dashed">Add Date</Button>
          </div>

          <Table
              dataSource={Array.from(Array(30).keys()).map((value, index) => ({
                  key: index,
                  activity: `Edward King ${index}`,
                  date: 32,
                  description: `London, Park Lane no. ${index}`,
              }))}
              scroll={{y: 350}}
              columns={columns}
              bordered
          />

          <NewTermDate open={open} setOpen={setOpen} />

      </>
  )
}
export default TermDates;