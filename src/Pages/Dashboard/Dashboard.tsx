import Carousel from 'antd/lib/carousel';
import { FC, useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import img1 from './../../images/1.jpeg';
import img2 from './../../images/2.jpeg';
import img3 from './../../images/3.jpeg';
import { IUser } from './DashboardTypes';
import UserCard from '../../components/UserCard/UserCard';

const Dashboard: FC = () => {
   const [users, setUsers] = useState<IUser[]>([]);

   useEffect(() => {
      const getUsers = async () => {
         const response = await fetch(process.env.REACT_APP_BASE_URL as string);
         const users = await response.json();
         setUsers(users);
      };
      getUsers();
   }, []);

   return (
      <div>
         <Carousel autoplay>
            <div className={styles.box}>
               <img className={styles.image} src={img1} alt='img' />
            </div>
            <div className={styles.box}>
               <img className={styles.image} src={img2} alt='img' />
            </div>
            <div className={styles.box}>
               <img className={styles.image} src={img3} alt='img' />
            </div>
         </Carousel>
         <div className={styles.usersContainer}>
            {users?.map((user) => (
               <UserCard key={user.id} {...user} />
            ))}
         </div>
      </div>
   );
};

export default Dashboard;
