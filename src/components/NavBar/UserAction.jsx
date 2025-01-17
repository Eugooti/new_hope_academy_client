import {Fragment} from "react";
import {Menu, Transition} from '@headlessui/react';
import dp from '../../assets/dp.jpg';
import {useNavigate} from "react-router-dom";
import {useTheme} from '../../context/ThemeContext/ThemeContext2.jsx';
import {useDispatch} from "react-redux";
import {logout} from "../../redux/Reducers/authSlice.js";
import {message} from "antd";
import {removeSessionItem} from "../../utils/LocalStorage/sessionStorage.jsx"; // Adjust this path as needed

const UserAction = () => {
    const { currentTheme } = useTheme(); // Access current theme from context
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Logout = async () => {
      await dispatch(logout()).then(action=>{
          action.error?
              messageApi.error(action.payload.message):
              messageApi.success(action.payload.message).then(()=>{
                  navigate('/login')
                  removeSessionItem('user')
                  removeSessionItem("token")
                  removeSessionItem("refreshToken")
              })
      })
    }
    
    const userNavigation = [
        { name: 'Your Profile', onClick: ()=>(navigate('/profile')) },
        { name: 'Sign out', onClick: Logout },
    ];


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <div className='flex justify-center align-middle'>
            {contextHolder}
            <Menu as="div" className="relative ml-5">
                <div className='pt-4'>
                    <Menu.Button
                        className={`relative flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary} focus:ring-offset-2 focus:ring-offset-${currentTheme.background}`}
                        style={{ backgroundColor: currentTheme.surface }}
                    >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img className="h-10 w-10 rounded-full" src={dp} alt="" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        style={{
                            backgroundColor: currentTheme.surface,
                            borderColor: currentTheme.border,
                            color: currentTheme.text,
                        }}
                    >
                        {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                                {({ active }) => (
                                    <label
                                        onClick={item.onClick}
                                        className={classNames(
                                            active ? `bg-${currentTheme.hover}` : '',
                                            `block px-4 py-2 text-sm text-${currentTheme.subtext} cursor-pointer`
                                        )}
                                        style={{
                                            backgroundColor: active ? currentTheme.hover : 'transparent',
                                            color: currentTheme.text
                                        }}
                                    >
                                        {item.name}
                                    </label>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default UserAction;
