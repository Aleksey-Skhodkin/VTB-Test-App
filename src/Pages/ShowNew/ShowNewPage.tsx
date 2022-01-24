import Typography from 'antd/lib/typography';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../../components/TaskCard/TaskCard';
import { IValues, StoreContext } from '../../context/StoreContext/StoreContext';
import { CREATE_NEW } from '../../routing/sitePaths';
import styles from './ShowNewPage.module.css';

const { Title } = Typography;

interface IShowNewPageProps
   extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const ShowNewPage: FC<IShowNewPageProps> = ({ className, ...props }) => {
   const { taskState } = useContext<IValues>(StoreContext);

   if (!taskState.length) {
      return (
         <div className={`${styles.showNew} ${className}`} {...props}>
            <Title level={3}>Нет ни одной задачи</Title>
            <Link to={CREATE_NEW}>Добавить задачу</Link>
         </div>
      );
   }

   return (
      <div className={`${styles.showNew} ${className}`} {...props}>
         <TaskCard task={taskState[taskState.length - 1]} />
      </div>
   );
};

export default ShowNewPage;
