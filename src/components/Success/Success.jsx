import {  Result } from 'antd';
import {useNavigate} from "react-router-dom";


const Success = () => {
    const navigate=useNavigate();


    return (
        <Result
            status="success"
            title="Learner have been admitted successfully!"
            subTitle={"Hostel"}
            extra={[
                <button onClick={()=>navigate("/fee-setting")} className={"bg-gray-800 text-lg text-white hover:bg-gray-900  h-11 w-44 rounded-3xl"}
                        type="primary" key="console">
                    Finish
                </button>
            ]}
        />
    )

};

export default Success;
