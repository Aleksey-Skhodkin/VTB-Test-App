import { ComponentType, FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, IValues } from '../../context/AuthContext/AuthContext';
import { LOGIN } from '../../routing/sitePaths';

interface IPrivateRouteProps {
   component: ComponentType;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({
   component: RouteComponent,
}) => {
   const context = useContext<IValues>(AuthContext);

   return context.isAuth ? (
      <RouteComponent />
   ) : (
      <Navigate to={LOGIN} replace={true} />
   );
};

export default PrivateRoute;
