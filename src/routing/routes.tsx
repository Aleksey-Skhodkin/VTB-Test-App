import React from 'react';
import { RouteObject } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Login from '../Pages/Login/Login';
import NotFound from '../Pages/NotFound/NotFound';
import SignUp from '../Pages/SignUp/SignUp';
import {
   CREATE_NEW,
   DASHBOARD,
   LOGIN,
   SHOW_ALL,
   SHOW_NEW,
   SIGN_UP,
   UNKNOWN,
} from './sitePaths';

const Dashboard = React.lazy(() => import('../Pages/Dashboard/Dashboard'));
const CreateNew = React.lazy(() => import('../Pages/CreateNew/CreateNew'));
const ShowAllPage = React.lazy(
   () => import('../Pages/ShowAllPage/ShowAllPage')
);
const ShowNewPage = React.lazy(() => import('../Pages/ShowNew/ShowNewPage'));

export const routes: RouteObject[] = [
   {
      path: DASHBOARD,
      element: (
         <React.Suspense fallback={<div>Загрузка...</div>}>
            <PrivateRoute component={Dashboard} />
         </React.Suspense>
      ),
   },
   {
      path: CREATE_NEW,
      element: (
         <React.Suspense fallback={<div>Загрузка...</div>}>
            <PrivateRoute component={CreateNew} />
         </React.Suspense>
      ),
   },
   {
      path: SHOW_NEW,
      element: (
         <React.Suspense fallback={<div>Загрузка...</div>}>
            <PrivateRoute component={ShowNewPage} />
         </React.Suspense>
      ),
   },

   {
      path: SHOW_ALL,
      element: (
         <React.Suspense fallback={<div>Загрузка...</div>}>
            <PrivateRoute component={ShowAllPage} />
         </React.Suspense>
      ),
   },
   {
      path: LOGIN,
      element: <Login />,
   },
   {
      path: SIGN_UP,
      element: <SignUp />,
   },
   {
      path: UNKNOWN,
      element: <NotFound />,
   },
];
