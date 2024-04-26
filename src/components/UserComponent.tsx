import { Button, Drawer, Form, Input, Divider, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { DeleteUser, UpdateAll } from "../utils";

interface Props {
  userID: number;
  signOutOnClick: () => void;
}

function UserComponent({ userID, signOutOnClick }: Props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [form] = Form.useForm();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const formOnFinish = (form: any) => {
    setUpdateLoading(true);
    UpdateAll(userID, form)
      .then(() => {
        setOpenDrawer(false);
        message.success("successfully Update!");
        setUpdateLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setUpdateLoading(false);
      });
  };

  const deleteOnClick = () => {
    setDeleteLoading(true);
    DeleteUser(userID)
      .then(() => {
        setOpenDrawer(false);
        message.success("successfully delete account!");
        setDeleteLoading(false);
        signOutOnClick();
      })
      .catch((err) => {
        message.error(err.message);
        setUpdateLoading(false);
      });
  };

  return (
    <>
      <Button
        onClick={showDrawer}
        icon={<UserOutlined />}
        shape="circle"
      ></Button>
      <Drawer
        title="Account Information"
        onClose={closeDrawer}
        open={openDrawer}
      >
        <Form form={form} onFinish={formOnFinish}>
          <Form.Item name="username">
            <Input
              placeholder="(Optional) New username"
              prefix={<UserOutlined />}
            ></Input>
          </Form.Item>
          <Form.Item name="email">
            <Input
              placeholder="(Optional) New email"
              prefix={<MailOutlined />}
            ></Input>
          </Form.Item>
          <Form.Item name="password">
            <Input
              placeholder="(Optional) New password"
              prefix={<LockOutlined />}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={updateLoading}>
              Update Information
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <Button
          danger={true}
          style={{ marginRight: "20px" }}
          onClick={signOutOnClick}
        >
          SignOut
        </Button>
        <Button
          type="primary"
          danger={true}
          onClick={deleteOnClick}
          loading={deleteLoading}
        >
          Delete Account
        </Button>
      </Drawer>
    </>
  );
}

export default UserComponent;
