import { createContext, Dispatch, FC, useReducer } from 'react';
import { ICreateNewValues } from '../../Pages/CreateNew/CreateNew';

export enum TaskActions {
   CREATE_TASK = 'CREATE-TASK',
   DELETE_TASK = 'DELETE-TASK',
}

export interface ITaskValues extends ICreateNewValues {
   id: number;
}

interface ITaskAction {
   type: TaskActions;
   payload: ITaskValues;
}

const taskReducer = (state: Array<ITaskValues>, action: ITaskAction) => {
   const { type, payload } = action;

   switch (type) {
      case TaskActions.CREATE_TASK:
         return [...state, payload];
      case TaskActions.DELETE_TASK:
         return state.filter((item) => item.id !== payload.id);
      default:
         return state;
   }
};

export interface IValues {
   taskState: Array<ITaskValues>;
   dispatchTask: Dispatch<ITaskAction>;
}

export const StoreContext = createContext({} as IValues);

const StoreContextProvider: FC = ({ children }) => {
   const [taskState, dispatchTask] = useReducer(taskReducer, []);

   return (
      <StoreContext.Provider value={{ taskState, dispatchTask }}>
         {children}
      </StoreContext.Provider>
   );
};

export default StoreContextProvider;
