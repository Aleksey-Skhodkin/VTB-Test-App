import { FC } from 'react';
import { IUser } from '../../Pages/Dashboard/DashboardTypes';
import styles from './UserCard.module.css';

const UserCard: FC<IUser> = (props) => {
   const { name, email, phone } = props;
   return (
      <div className={styles.userCard}>
         <h2>{name}</h2>
         <p>email: {email}</p>
         <p>phone: {phone}</p>
      </div>
   );
};

export default UserCard;
