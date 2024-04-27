import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { signUp } from "../../utils";

function SignUpComponent() {
  const [displayModal, setDisplayModal] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (form: any) => {
    signUp(form)
      .then(() => {
        setDisplayModal(false);
        message.success("Successfully signed up");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const onCancel = () => {
    setDisplayModal(false);
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        style={{ marginRight: "20px" }}
        onClick={() => {
          setDisplayModal(true);
        }}
      >
        SignUp
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
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default SignUpComponent;
