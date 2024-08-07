import Heading from "../../../components/heading/Heading.jsx";
import {Table} from "antd";
import {useTheme} from "../../../context/ThemeContext/ThemeContext.jsx";


const Events = () => {

    const {light,dark,lightTheme}=useTheme()
    const theme=!lightTheme?light:dark;

    return(

                <>
                    <div style={{background:theme.bg,outline:'dashed red 1px',minHeight:'99vh',minWidth:'100%'}} className='min-h-full'>
                        <Heading title={"What do you have planned"} subtitle={"See and add events"}/>
                        <Table
                            title={() => "Header"}
                            footer={() => "Footer"}
                            size="middle"
                            columns={[
                                {title: "Title", dataIndex: "name"},
                                {title: "Description", dataIndex: "age"},
                                {title: "Date", dataIndex: "age"},
                            ]}
                            dataSource={[
                                {key: 1, name: "John", age: 30},
                                {key: 2, name: "Lucy", age: 31},
                            ]}
                        />

                    </div>
                </>
    )
}
export default Events;