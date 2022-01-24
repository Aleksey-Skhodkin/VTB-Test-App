import { InputNumber } from 'antd';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import { useForm } from 'antd/lib/form/Form';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';
import Typography from 'antd/lib/typography';
import {
   DetailedHTMLProps,
   FC,
   HTMLAttributes,
   useContext,
   useState,
} from 'react';
import {
   IValues,
   StoreContext,
   TaskActions,
} from '../../context/StoreContext/StoreContext';
import { EMPTY_STRING } from '../../utils/constants';
import styles from './CreateNew.module.css';

const { Title } = Typography;

export interface ICreateNewValues {
   select: string;
   description: string;
   radio: string;
   numberInput: string;
}

interface ICreateNewProps
   extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const CreateNew: FC<ICreateNewProps> = ({ className, ...props }) => {
   const { dispatchTask } = useContext<IValues>(StoreContext);
   const [form] = useForm();
   const [number, setNumber] = useState<{
      value: number | undefined;
      min: number;
      max: number;
      step: number;
      validateStatus?: any;
      errorMsg?: string | null;
   }>({
      value: undefined,
      min: 10,
      max: 50,
      step: 5,
      validateStatus: EMPTY_STRING,
      errorMsg: null,
   });
   const [radioValue, setRadioValue] = useState<'percent' | 'sum'>('percent');

   function validatePrimeNumber(
      number: number | undefined,
      min: number,
      max: number
   ) {
      if (number && number <= max && number >= min) {
         return {
            validateStatus: 'success',
            errorMsg: null,
         };
      }
      return {
         validateStatus: 'error',
         errorMsg: `Число должно быть не больше ${max} и не меньше ${min}`,
      };
   }

   const onFinish = (values: ICreateNewValues) => {
      const result = {
         ...values,
         numberInput: String(number.value),
         radio: radioValue,
      };
      if (number.validateStatus === 'success') {
         dispatchTask({
            type: TaskActions.CREATE_TASK,
            payload: { id: Date.now(), ...result },
         });
         setNumber({ ...number, value: undefined });
         form.resetFields();
      }
   };

   const onNumberChange = (
      value: number | undefined,
      min: number = 10,
      max: number = 50,
      step: number = 5
   ): void => {
      setNumber({
         ...number,
         value,
         min,
         max,
         step,
         ...validatePrimeNumber(value, min, max),
      });
   };

   const onRadioChange = (e: any): void => {
      const value = e.target.value;
      setRadioValue(value);
      if (value === 'percent') onNumberChange(number.value, 10, 50, 5);
      if (value === 'sum') onNumberChange(number.value, 0.14, 2.99, 0.1);
   };

   return (
      <div className={`${styles.createNew} ${className}`} {...props}>
         <Card className={styles.card}>
            <Title level={3}>Создать задачу</Title>
            <Form
               form={form}
               name='createTask'
               layout='vertical'
               onFinish={onFinish}
               initialValues={{ radio: 'percent' }}
            >
               <Form.Item
                  name='select'
                  label='Выберете что-нибудь'
                  rules={[
                     { required: true, message: 'Поле должно быть заполнено!' },
                  ]}
               >
                  <Select>
                     <Select.Option value='Помыть полы'>
                        Помыть полы
                     </Select.Option>
                     <Select.Option value=' Сходить в магазин'>
                        Сходить в магазин
                     </Select.Option>
                     <Select.Option value='Постирать белье'>
                        Постирать белье
                     </Select.Option>
                     <Select.Option value='Помыть посуду'>
                        Помыть посуду
                     </Select.Option>
                     <Select.Option value=' Встретиться в друзьями'>
                        Встретиться в друзьями
                     </Select.Option>
                     <Select.Option value='Сходить в кино'>
                        Сходить в кино
                     </Select.Option>
                  </Select>
               </Form.Item>
               <Form.Item
                  name='description'
                  label='Напишите что-нибудь'
                  rules={[
                     { required: true, message: 'Поле должно быть заполнено!' },
                  ]}
               >
                  <Input.TextArea className={styles.textarea} />
               </Form.Item>
               <Form.Item
                  label='Выберите опцию'
                  rules={[
                     { required: true, message: 'Должно быть что-то выбрано!' },
                  ]}
               >
                  <Radio.Group value={radioValue} onChange={onRadioChange}>
                     <Radio value='percent'>%</Radio>
                     <Radio value='sum'>Сумма</Radio>
                  </Radio.Group>
               </Form.Item>
               <Form.Item
                  label='Введите число'
                  rules={[
                     { required: true, message: 'Поле должно быть заполнено!' },
                  ]}
                  validateStatus={number.validateStatus}
                  help={number.errorMsg}
               >
                  <InputNumber
                     value={number.value}
                     step={number.step}
                     onChange={(value) =>
                        onNumberChange(
                           value,
                           number.min,
                           number.max,
                           number.step
                        )
                     }
                  />
               </Form.Item>
               <Button size='large' type='primary' htmlType='submit' block>
                  Отправить
               </Button>
            </Form>
         </Card>
      </div>
   );
};

export default CreateNew;
