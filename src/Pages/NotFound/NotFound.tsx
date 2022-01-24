import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react';
import Typography from 'antd/lib/typography';
import styles from './NotFound.module.css';
import { AuthContext, IValues } from '../../context/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';
import { LOGIN } from '../../routing/sitePaths';

const { Title } = Typography;

const NotFound: FC<
   DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...props }) => {
   const { isAuth } = useContext<IValues>(AuthContext);

   if (!isAuth) return <Navigate to={LOGIN} />;

   return (
      <div className={`${styles.notFound} ${className}`} {...props}>
         <Title level={2}>Нет такой страницы</Title>
      </div>
   );
};

export default NotFound;
