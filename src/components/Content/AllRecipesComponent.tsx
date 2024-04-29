import { Table, TableProps, GetProp, message } from "antd";
import { useEffect, useState } from "react";

import { GetRecipe } from "../../utils";
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

function AllRecipesComponent() {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: [10],
      showSizeChanger: false,
    },
  });
  const [recipeArray, setRecipeArray] = useState<DataType[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentSelectedRecipeID, setCurrentSelectedRecipeID] = useState(1);
  const [currentSelectedRecipeName, setCurrentSelectedRecipeName] =
    useState("21 apple pie");
  const [isTableLoading, setIsTableLoading] = useState(false);

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

  const closeDrawerOnClick = () => {
    setIsDrawerOpen(false);
  };

  const loadMoreRecipeData = () => {
    GetRecipe(recipeArray.length)
      .then((jsonData) => {
        setRecipeArray(recipeArray.concat(jsonData));
        setIsTableLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setIsTableLoading(false);
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
    setIsTableLoading(true);
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

  useEffect(() => {}, [currentSelectedRecipeID]);

  return (
    <>
      <Table
        bordered={true}
        columns={columns}
        dataSource={recipeArray}
        showSorterTooltip={{ target: "sorter-icon" }}
        style={{ marginLeft: "75px", overflow: "auto", width: "1000px"}}
        pagination={tableParams.pagination}
        rowKey="recipeID"
        onChange={tableOnChange}
        loading={isTableLoading}
      ></Table>
      <RecipeDrawer
        isDrawerOpen={isDrawerOpen}
        currentSelectedRecipeID={currentSelectedRecipeID}
        currentSelectedRecipeName={currentSelectedRecipeName}
        closeDrawerOnClick={closeDrawerOnClick}
      />
    </>
  );
}

export default AllRecipesComponent;
