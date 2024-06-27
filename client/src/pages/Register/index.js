import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Password from 'antd/es/input/Password';

function Register() {
  const onFinish = (values) => {
    console.log('sucess', values);
  };
  return (
    <div className="grid grid-cols-2">
      <div className="bg-primary h-screen flex flex-col justify-center items-center">
        <div>
          <h1 className="text-6xl text-white"> MovieShaker Ltd</h1>
          <span className="text-white">This is where your dream starts</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[300px]">
          <h1>Register</h1>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="full name" name="fullName">
              <Input />
            </Form.Item>
            <Form.Item label="password" name="password">
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
            <div className="flex justify-center mt-5">
              <span>
                Login to your accout <Link to="/login"> Login</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Register;
