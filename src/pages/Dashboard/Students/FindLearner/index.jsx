import {Input} from "antd";

const FindLearner = () => {

    return (
        <>
            <div className='w-full alignCenter2'>
                <h1>Find Learner</h1>
                <Input.Search placeHlder={"Enter Admission Number."} size="large"/>
            </div>
        </>
    )

}

export  default FindLearner;