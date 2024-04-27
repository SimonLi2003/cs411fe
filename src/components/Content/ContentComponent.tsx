import { Button, Layout, Modal, Input, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Content } = Layout;

interface Props {
  selectedMenuItem: number;
}

function ContentComponent({ selectedMenuItem }: Props) {
  const [displayModal, setDisplayModal] = useState(false);
  const [form] = Form.useForm();
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  // TODO
  const formOnFinish = () => {
    // call method in utils
    // set submit button is loading to true until receive the response from the server
    // close the modal only when receive response from server
    setSubmitButtonLoading(true);

    setDisplayModal(false);
    setSubmitButtonLoading(false);
  };

  const searchOnClick = () => {
    setDisplayModal(true);
  };

  const modalOnCancel = () => {
    setDisplayModal(false);
  };

  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        height: 845,
        overflow: "auto",
      }}
    >
      <Modal
        title="Search"
        open={displayModal}
        onCancel={modalOnCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={formOnFinish}>
          <Form.Item>
            <Input
              placeholder={
                selectedMenuItem == 1 ? "Recipe Name" : "Ingredients Name"
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitButtonLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button
        icon={<SearchOutlined />}
        shape="round"
        onClick={searchOnClick}
        style={{ width: "1000px", marginLeft: "75px" }}
      >
        {selectedMenuItem == 1 ? "Search Recipe" : "Search Ingredients"}
      </Button>
    </Content>
  );
}

export default ContentComponent;
