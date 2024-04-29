import { SearchOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    GetProp,
    Input,
    message,
    Modal,
    Space,
    Table,
    TableProps,
} from "antd";

import { useState } from "react";
import { getRecipeWithRecipeName } from "../../utils";
import RecipeDrawer from "./RecipeDrawer";

interface DataType {
  recipeID: number;
  recipeName: string;
  recipeType: string;
  userEmail: string;
}

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination: TablePaginationConfig;
}

function SearchRecipesComponent() {
  const [displayModal, setDisplayModal] = useState(false);
  const [form] = Form.useForm();
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [searchResultArray, setSearchResultArray] = useState<DataType[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentSelectedRecipeID, setCurrentSelectedRecipeID] = useState(1);
  const [currentSelectedRecipeName, setCurrentSelectedRecipeName] =
    useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: [10],
      showSizeChanger: false,
    },
  });

  const searchOnClick = () => {
    setDisplayModal(true);
  };

  const modalOnCancel = () => {
    setDisplayModal(false);
  };

  const closeDrawerOnClick = () => {
    setIsDrawerOpen(false);
  };

  const tableOnChange = (newPagination: TablePaginationConfig) => {
    setTableParams({
      pagination: {
        current: newPagination.current,
        pageSize: tableParams.pagination.pageSize,
        pageSizeOptions: [10],
        showSizeChanger: false,
      },
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Recipe Name",
      dataIndex: "recipeName",
      key: "name",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => a.recipeName.localeCompare(b.recipeName),
      render(value, record) {
        return (
          <a
            onClick={() =>
              recipeNameOnClick(record.recipeID, record.recipeName)
            }
            className="text-primary"
            style={{ textDecoration: "none" }}
          >
            {value}
          </a>
        );
      },
    },
    {
      title: "Recipe Type",
      dataIndex: "recipeType",
      key: "type",
      filters: [
        {
          text: "breakfast",
          value: "breakfast",
        },
        {
          text: "lunch",
          value: "lunch",
        },
        {
          text: "dinner",
          value: "dinner",
        },
      ],
      onFilter: (value, record) =>
        record.recipeType.indexOf(value as string) === 0,
    },
    {
      title: "Owner Email",
      dataIndex: "userEmail",
      key: "email",
    },
  ];

  const recipeNameOnClick = (recipeID: number, recipeName: string) => {
    setCurrentSelectedRecipeID(recipeID);
    setCurrentSelectedRecipeName(recipeName);
    setIsDrawerOpen(true);
  };

  const formOnFinish = (form: any) => {
    setSubmitButtonLoading(true);
    getRecipeWithRecipeName(form, searchResultArray.length)
      .then((jsonData) => {
        setSearchResultArray(jsonData);
        setDisplayModal(false);
        setSubmitButtonLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setDisplayModal(false);
        setSubmitButtonLoading(false);
      });
  };

  return (
    <>
      <Modal
        title="Search"
        open={displayModal}
        onCancel={modalOnCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={formOnFinish}>
          <Form.Item name="recipeName">
            <Input placeholder="Recipe Name" />
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
      <Space direction="vertical" size="large">
        <Button
          icon={<SearchOutlined />}
          shape="round"
          onClick={searchOnClick}
          style={{ width: "1000px", marginLeft: "75px" }}
        >
          "Search Recipe"
        </Button>
        <Table
          bordered={true}
          columns={columns}
          dataSource={searchResultArray}
          showSorterTooltip={{ target: "sorter-icon" }}
          style={{ marginLeft: "75px", overflow: "auto", width: "1000px" }}
          pagination={tableParams.pagination}
          rowKey="recipeID"
          onChange={tableOnChange}
        ></Table>
        <RecipeDrawer
          isDrawerOpen={isDrawerOpen}
          currentSelectedRecipeID={currentSelectedRecipeID}
          currentSelectedRecipeName={currentSelectedRecipeName}
          closeDrawerOnClick={closeDrawerOnClick}
        />
      </Space>
    </>
  );
}

export default SearchRecipesComponent;
