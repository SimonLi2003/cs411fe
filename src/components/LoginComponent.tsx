import { Button, Modal, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";

import { Login } from "../utils";

interface Props {
  signInOnSuccess: () => void;
  loginSetUserID: (userID: number) => void;
}

function LoginComponent({ signInOnSuccess, loginSetUserID }: Props) {
  const [displayModal, setDisplayModal] = useState(false);
  const [form] = Form.useForm();

  const onCancel = () => {
    setDisplayModal(false);
  };

  const onFinish = (form: any) => {
    Login(form)
      .then((userID: number) => {
        setDisplayModal(false);
        message.success("Successfully Login!");
        signInOnSuccess();
        loginSetUserID(userID);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      <Button
        shape="round"
        style={{ marginRight: "20px" }}
        onClick={() => {
          setDisplayModal(true);
        }}
      >
        Login
      </Button>

      <Modal
        title="Login"
        open={displayModal}
        onCancel={onCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default LoginComponent;
