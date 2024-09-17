import {useTheme} from "../../context/ThemeContext/ThemeContext2.jsx";

// eslint-disable-next-line react/prop-types
const Heading = ({title,subtitle}) => {
    const {currentTheme}=useTheme()
    return(
                <>
                    <div   className="text-left mb-6 grid gap-y-3 sm:ml-4 md:ml-0 sm:mt-0 w-full">
                        <h1 style={{color:currentTheme.text}}  className='text-2xl font-bold font-sans text-gray-800'>{title}</h1>
                        <h1 style={{color:currentTheme.text}} className='text-xl font-bold font-sans text-gray-800' >{subtitle}</h1>
                    </div>
                </>

    )
}
export default Heading;
