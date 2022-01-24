import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import styles from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import './global.css';
import { routes } from './routing/routes';

const App: FC = () => {
   const element = useRoutes(routes);

   return (
      <Layout className={styles.layout}>
         <Header>
            <div className={styles.wrapper}>
               <Navbar />
            </div>
         </Header>
         <Content>
            <div className={styles.wrapper}>{element}</div>
         </Content>
      </Layout>
   );
};

export default App;
