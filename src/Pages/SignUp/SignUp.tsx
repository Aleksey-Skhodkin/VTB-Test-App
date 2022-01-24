import notification from 'antd/lib/notification';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import { useForm } from 'antd/lib/form/Form';
import Input from 'antd/lib/input/Input';
import Typography from 'antd/lib/typography';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMaskInput } from '../../hooks/useMaskInput';
import { DASHBOARD, LOGIN } from '../../routing/sitePaths';
import styles from './SignUp.module.css';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const { Title } = Typography;

interface ISignUpProps
   extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const SignUp: FC<ISignUpProps> = ({ className, ...props }) => {
   const { signIn } = useContext(AuthContext);
   const navigate = useNavigate();
   const [form] = useForm();
   const { value, onChange } = useMaskInput();

   const onFinish = (values: { password: string }) => {
      const testObj = { ...values, value };

      if (signIn(testObj, values.password)) {
         navigate(DASHBOARD);
         form.resetFields();
         notification['success']({
            message: 'Вы зарегистрированы!',
         });
      } else {
         notification['error']({
            message: 'Вы уже зарегистрированы.',
         });
      }
   };

   return (
      <div className={`${styles.signup} ${className}`} {...props}>
         <Card className={styles.card}>
            <Title level={3}>Регистрация</Title>
            <Form
               form={form}
               name='signup'
               layout='vertical'
               onFinish={onFinish}
            >
               <Form.Item
                  label='Логин'
                  rules={[
                     { required: true, message: 'Поле должно быть заполнено' },
                  ]}
               >
                  <Input
                     placeholder='+7 (xxx) xxx-xx-xx'
                     type='tel'
                     autoFocus
                     value={value}
                     onChange={onChange}
                  />
               </Form.Item>
               <Form.Item
                  label='Пароль'
                  name='password'
                  rules={[
                     { required: true, message: 'Поле должно быть заполнено' },
                  ]}
               >
                  <Input type='password' />
               </Form.Item>
               <Button size='large' type='primary' htmlType='submit' block>
                  Зарегистрироваться
               </Button>
            </Form>
         </Card>
         <p>
            Уже зарегистрированы? <Link to={LOGIN}>Login</Link>
         </p>
      </div>
   );
};

export default SignUp;
