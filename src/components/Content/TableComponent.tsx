import { Table, TableProps, GetProp } from "antd";
import { useEffect, useState } from "react";

import { GetRecipe } from "../../utils";

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

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Recipe Name",
    dataIndex: "recipeName",
    key: "name",
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.recipeName.localeCompare(b.recipeName),
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

function TableComponent() {
  const [recipeArray, setRecipeArray] = useState<DataType[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: [10],
      showSizeChanger: false,
    },
  });

  const loadMoreRecipeData = () => {
    GetRecipe(recipeArray.length).then((jsonData) => {
      setRecipeArray(recipeArray.concat(jsonData));
    });
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

  useEffect(() => {
    loadMoreRecipeData();
  }, []);

  useEffect(() => {
    console.log(
      tableParams.pagination.current,
      tableParams.pagination.pageSize
    );
    if (tableParams.pagination.current! * 10 + 30 > recipeArray.length) {
      console.log("Load more data!");
      loadMoreRecipeData();
    }
  }, [tableParams.pagination]);

  return (
    <Table
      bordered={true}
      columns={columns}
      dataSource={recipeArray}
      showSorterTooltip={{ target: "sorter-icon" }}
      style={{ marginLeft: "75px", overflow: "auto" }}
      pagination={tableParams.pagination}
      rowKey="recipeID"
      onChange={tableOnChange}
    ></Table>
  );
}

export default TableComponent;
