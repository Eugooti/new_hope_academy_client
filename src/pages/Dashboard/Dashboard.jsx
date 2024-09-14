import { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Layout, Menu, Button, theme } from 'antd';
import { getFromLocalStorage } from "../../utils/LocalStorage/localStorage.jsx";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined, MoneyCollectOutlined,
} from '@ant-design/icons';
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ListIcon from '@mui/icons-material/List';
import ClassIcon from '@mui/icons-material/Class';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookIcon from '@mui/icons-material/Book';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChecklistIcon from '@mui/icons-material/Checklist';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import NavBar from "../../components/NavBar/UserAction.jsx";
import dp from "../../assets/logo1.png";

const { Header, Content, Footer, Sider } = Layout;

const DashboardContext = createContext(undefined);

export const DashboardProvider = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const savedKey = getFromLocalStorage('selectedKey');
        savedKey ? setSelectedKey(savedKey) : setSelectedKey('1');
    }, []);

    useEffect(() => {
        const matchedItem = findMatchedItem(location.pathname, items);
        if (matchedItem) {
            setSelectedKey(matchedItem.key);
            localStorage.setItem('selectedKey', matchedItem.key);
        }
    }, [location.pathname]);

    function getItem(label, key, icon, children, path) {
        return {
            key,
            icon,
            children,
            label,
            path,
        };
    }


    const items = [
        getItem('Dashboard', '1', <DashboardIcon />, null, '/'),
        getItem('Students', 'sub1', <SchoolIcon />, [
            getItem('Admit Learner', '2', <PersonAddIcon />, null, '/admit-learner'),
            getItem('Learner Attendance', 'sub2', <CheckCircleOutlineIcon />, [
                getItem('Mark Attendance', '3', null, null, '/mark-attendance'),
                getItem('View Attendance', '4', null, null, '/view-attendance')
            ]),
            getItem('Transfer Learner', 'sub3', <TransferWithinAStationIcon />, [
                getItem('To another class', '5', null, null, '/transfer-to-class'),
                getItem('To another School', '6', null, null, '/transfer-to-school')
            ]),
            getItem('Find Learner', '7', <SearchIcon />, null, '/find-learner')
        ]),
        getItem('Staff', 'sub4', <PeopleIcon />, [
            getItem('New Staff', '8', <PersonAddAlt1Icon />, null, '/new-staff'),
            getItem('View Staff', '9', <ListIcon />, null, '/view-staff')
        ]),
        getItem('classrooms', 'sub5', <ClassIcon />, [
            getItem('Create Class', '10', null, null, '/create-class'),
            getItem('View Class', '11', null, null, '/view-class')
        ]),
        getItem('Library', 'sub6', <LocalLibraryIcon />, [
            getItem('Add book', '12', <ImportContactsIcon />, null, '/add-book'),
            getItem('Add Course Book', '13', <BookmarkAddIcon />, null, '/create-course-book'),
            getItem('Books Borrowing', 'sub7', <ShoppingCartCheckoutIcon />, [
                getItem('Lease a book', '14', null, null, '/lease-book'),
                getItem('View leased books', '15', null, null, '/view-leased-books')
            ]),
            getItem('View Books', '16', <LibraryBooksIcon />, null, '/view-books'),
            getItem('View course books', '17', <BookIcon />, null, '/view-course-books')
        ]),
        getItem('Inventory', 'sub8', <InventoryIcon />, [
            getItem('New item', '18', <AddShoppingCartIcon />, null, '/new-item'),
            getItem('View Items', '19', <ChecklistIcon />, null, '/view-items')
        ]),
        getItem('Fee',"26",<MoneyCollectOutlined/>,[
            getItem("Fee Structure","sub11",null,[
                getItem("Create Fee Structure",'27',null,null,'/new-feeStructure'),
                getItem("View Fee Structure","28",null,null,'/fee-structures')
            ]),
            getItem("View Fee Item","30",null,null,'/view-feeItem'),
        ]),
        getItem('Clinic', 'sub9', <MedicationIcon />, [
            getItem('New Patient', '20', <LocalPharmacyIcon />, null, '/new-patient'),
            getItem('Learner Records', '21', <FormatListNumberedIcon />, null, '/learner-records'),
            getItem('View Records', '22', <FormatListBulletedRoundedIcon />, null, '/view-records')
        ]),
        getItem('Departments', 'sub10', <MenuUnfoldOutlined />, [
            getItem('Create Department', '23', null, null, '/create-department'),
            getItem('View Departments', '25', null, null, '/view-departments')
        ]),
    ];

    const findPath = (key, items) => {
        for (let item of items) {
            if (item.key === key) {
                return item.path;
            }
            if (item.children) {
                const childPath = findPath(key, item.children);
                if (childPath) {
                    return childPath;
                }
            }
        }
        return null;
    };

    const findMatchedItem = (path, items) => {
        for (let item of items) {
            if (item.path === path) {
                return item;
            }
            if (item.children) {
                const childItem = findMatchedItem(path, item.children);
                if (childItem) {
                    return childItem;
                }
            }
        }
        return null;
    };

    const onClick = ({ key }) => {
        const path = findPath(key, items);
        if (path) {
            setSelectedKey(key);
            localStorage.setItem('selectedKey', key);
            navigate(path);
        }
    };


    return (
        <DashboardContext.Provider value={null}>
            <Layout hasSider>

                <div className='pl-5 py-3' style={{ height: "100%" }}>
                    <Sider
                        theme={"light"}
                        className='rounded-2xl bg-amber-400'
                        style={{height: "96vh", position: "fixed", overflow: "auto"}}
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                    >


                        <Menu
                            theme="light"
                            mode="inline"
                            className='pt-5'
                            selectedKeys={[selectedKey]}
                            items={items}
                            onClick={onClick}
                        />

                        <div>
                            <img src={dp} alt=""/>
                        </div>

                    </Sider>
                </div>

                <Layout
                    style={{marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s ease-out'}}
                >
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                        className='rounded-2xl ml-3'
                    >
                        <div className='flex flex-row justify-between pr-8'>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <div className='flex justify-center align-middle'>
                                <NavBar />
                            </div>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '20px 16px 0',
                            overflow: 'auto',
                            height: 'calc(100vh - 88px)',
                            padding: 24,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </DashboardContext.Provider>
    );
};
