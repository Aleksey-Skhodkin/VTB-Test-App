import Typography from 'antd/lib/typography';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../../components/TaskCard/TaskCard';
import { IValues, StoreContext } from '../../context/StoreContext/StoreContext';
import { CREATE_NEW } from '../../routing/sitePaths';
import styles from './ShowAllPage.module.css';

const { Title } = Typography;

interface IShowAllPageProps
   extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const ShowAllPage: FC<IShowAllPageProps> = ({ className, ...props }) => {
   const { taskState } = useContext<IValues>(StoreContext);

   if (!taskState.length) {
      return (
         <div className={`${styles.showAll} ${className}`} {...props}>
            <Title level={3}>Нет ни одной задачи</Title>
            <Link to={CREATE_NEW}>Добавить задачу</Link>
         </div>
      );
   }

   return (
      <div className={`${styles.showAll} ${className}`} {...props}>
         {taskState.map((task) => (
            <TaskCard key={task.id} task={task} />
         ))}
      </div>
   );
};

export default ShowAllPage;
