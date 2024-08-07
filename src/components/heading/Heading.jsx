import {useTheme} from "../../context/ThemeContext/ThemeContext.jsx";

// eslint-disable-next-line react/prop-types
const Heading = ({title,subtitle}) => {
    const {light,dark,lightTheme}=useTheme()
    const theme=!lightTheme?light:dark;
    return(
                <>
                    <div  className="text-left grid gap-y-3 sm:ml-4 md:ml-0 sm:mt-0 w-full">
                        <h1 style={{color:theme.text}} className='text-2xl font-bold font-sans text-gray-800'>{title}</h1>
                        <h1 style={{color:theme.text}} className='text-xl font-bold font-sans text-gray-800' >{subtitle}</h1>
                    </div>
                </>

    )
}
export default Heading;
