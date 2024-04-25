import { Button, Modal, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

import { Login } from "../utils";

interface Props {
  onSuccess: () => void;
}

function LoginComponent({ onSuccess }: Props) {
  const [displayModal, setDisplayModal] = useState(false);
  const [form] = Form.useForm();

  const onCancel = () => {
    setDisplayModal(false);
  };

  const onFinish = (form: any) => {
    Login(form)
      .then(() => {
        setDisplayModal(false);
        message.success("Successfully Login!");
        onSuccess();
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
        title="SignUp"
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
            <Input prefix={<LockOutlined />} placeholder="Email" />
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
