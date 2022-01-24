import { createContext, FC, ReactNode, useState } from 'react';

export const AuthContext = createContext({} as IValues);

export interface IValues {
   isAuth: boolean;
   logout: () => void;
   login: (password: string) => boolean;
   signIn: (
      testObj: { password: string; value: string },
      password: string
   ) => boolean;
}

interface IAuthContextProviderProps {
   children: ReactNode;
}

const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
   const [isAuth, setIsAuth] = useState<boolean>(false);

   const logout = (): void => {
      setIsAuth(false);
   };

   const login = (password: string): boolean => {
      if (localStorage.getItem(password)) {
         setIsAuth(true);
         return true;
      }
      return false;
   };

   const signIn = (
      testObj: { password: string; value: string },
      password: string
   ): boolean => {
      const isSignedUp = localStorage.getItem(password);
      if (isSignedUp) {
         return false;
      } else {
         localStorage.setItem(password, JSON.stringify(testObj));
         setIsAuth(true);
         return true;
      }
   };

   return (
      <AuthContext.Provider value={{ isAuth, login, logout, signIn }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContextProvider;
