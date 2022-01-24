import {
   DashboardOutlined,
   ExportOutlined,
   FileAddOutlined,
   FolderViewOutlined,
} from '@ant-design/icons';
import Menu from 'antd/lib/menu';
import { FC, useContext } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { AuthContext, IValues } from '../../context/AuthContext/AuthContext';
import {
   CREATE_NEW,
   DASHBOARD,
   LOGIN,
   SHOW_ALL,
   SHOW_NEW,
} from '../../routing/sitePaths';

const Navbar: FC = () => {
   const { isAuth, logout } = useContext<IValues>(AuthContext);
   let location = useLocation();

   const handleClick = (e: any) => {
      if (e.key === 'exit') {
         logout();
         <Navigate to={LOGIN} />;
      }
   };

   return (
      <Menu
         onClick={handleClick}
         theme='dark'
         mode='horizontal'
         selectedKeys={[location.pathname]}
      >
         <Menu.Item key={DASHBOARD} icon={<DashboardOutlined />}>
            <Link to={DASHBOARD}>Dashboard</Link>
         </Menu.Item>
         <Menu.Item key={CREATE_NEW} icon={<FileAddOutlined />}>
            <Link to={CREATE_NEW}>Создать новый</Link>
         </Menu.Item>
         <Menu.Item key={SHOW_NEW} icon={<FolderViewOutlined />}>
            <Link to={SHOW_NEW}>Посмотреть ранее созданный</Link>
         </Menu.Item>
         <Menu.Item key={SHOW_ALL} icon={<FolderViewOutlined />}>
            <Link to={SHOW_ALL}>Посмотреть все</Link>
         </Menu.Item>
         {isAuth ? (
            <Menu.Item key='exit' icon={<ExportOutlined />}>
               Выход
            </Menu.Item>
         ) : null}
      </Menu>
   );
};

export default Navbar;
