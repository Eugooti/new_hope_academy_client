import Text from "antd/es/typography/Text.js";
import {useTheme} from "../../context/ThemeContext/ThemeContext2.jsx";
const LearnerCard = ({name,Img,grade,to}) => {
    const {currentTheme} = useTheme()


  return(
      <div  className='grid  grid-cols-2 py-2'>
          <div className='flex gap-4'>
              <img src={Img} alt={""} className='rounded-full h-12 w-12'/>
              <div>
                  <h5>{name}</h5>
                  <label>{"Grade "+grade}</label>
              </div>
          </div>
          <div className='alignCenter2'>
              <Text type={to===1?"warning":"danger"}>{to===0?"To Other School":"To Other Class"}</Text>
          </div>

      </div>
  )
}

export default LearnerCard
