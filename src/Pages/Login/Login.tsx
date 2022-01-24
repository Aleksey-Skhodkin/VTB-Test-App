import notification from 'antd/lib/notification';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import { useForm } from 'antd/lib/form/Form';
import Input from 'antd/lib/input/Input';
import Typography from 'antd/lib/typography';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { DASHBOARD, SIGN_UP } from '../../routing/sitePaths';
import styles from './Login.module.css';

const { Title } = Typography;

interface ILoginProps
   extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Login: FC<ILoginProps> = ({ className, ...props }) => {
   const navigate = useNavigate();
   const { login } = useContext(AuthContext);
   const [form] = useForm();

   const onFinish = (values: { password: string }) => {
      if (login(values.password)) {
         navigate(DASHBOARD);
         form.resetFields();
         notification['success']({
            message: 'Вы успешно вошли на сайт!',
         });
      } else {
         notification['error']({
            message: 'Неправильный пароль или Вы не зарегистрированы.',
         });
      }
   };

   return (
      <div className={`${styles.login} ${className}`} {...props}>
         <Card className={styles.card}>
            <Title level={3}>Вход</Title>
            <Form
               form={form}
               name='login'
               layout='vertical'
               onFinish={onFinish}
            >
               <Form.Item
                  label='Пароль'
                  name='password'
                  rules={[
                     { required: true, message: 'Поле должно быть заполнено' },
                  ]}
               >
                  <Input type='password' autoFocus />
               </Form.Item>
               <Button size='large' type='primary' htmlType='submit' block>
                  Войти
               </Button>
            </Form>
         </Card>
         <p>
            Еще не регистрировались? <Link to={SIGN_UP}>Регистрация</Link>
         </p>
      </div>
   );
};

export default Login;
