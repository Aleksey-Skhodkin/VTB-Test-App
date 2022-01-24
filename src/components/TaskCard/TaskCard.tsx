import Card from 'antd/lib/card';
import Typography from 'antd/lib/typography';
import { FC, useContext } from 'react';
import {
   ITaskValues,
   IValues,
   StoreContext,
   TaskActions,
} from '../../context/StoreContext/StoreContext';
import styles from './TaskCard.module.css';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const { Title } = Typography;

interface ITaskCardProps {
   task: ITaskValues;
}

const TaskCard: FC<ITaskCardProps> = ({ task }) => {
   const { dispatchTask } = useContext<IValues>(StoreContext);
   const { description, id, select } = task;

   const handleClick = () => {
      dispatchTask({
         type: TaskActions.DELETE_TASK,
         payload: { ...task },
      });
   };

   return (
      <Card className={styles.taskCard}>
         <div className={styles.id}>id: {id}</div>
         <div className={styles.container}>
            <div>
               <Title level={4} className={styles.title}>
                  Что сделать: {select}
               </Title>
               <Title level={4} className={styles.title}>
                  Описание: {description}
               </Title>
            </div>
            <Button
               className={styles.button}
               type='primary'
               onClick={handleClick}
            >
               <DeleteOutlined />
            </Button>
         </div>
      </Card>
   );
};

export default TaskCard;
