import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthContextProvider from './context/AuthContext/AuthContext';
import 'antd/dist/antd.css';
import StoreContextProvider from './context/StoreContext/StoreContext';

ReactDOM.render(
   <BrowserRouter>
      <StoreContextProvider>
         <AuthContextProvider>
            <App />
         </AuthContextProvider>
      </StoreContextProvider>
   </BrowserRouter>,
   document.getElementById('root')
);
