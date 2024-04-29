import { Drawer, List, Divider, message } from "antd";
import { useEffect, useState } from "react";

import { GetIngredients, GetNutrition } from "../../utils";

interface Props {
  isDrawerOpen: boolean;
  currentSelectedRecipeID: number;
  currentSelectedRecipeName: string;
  closeDrawerOnClick: () => void;
}

interface ingredientDataType {
  ingredientName: string;
  ingredientType: string;
}

interface nutritionDataType {
  nutritionName: string;
  data: number;
  unit: string;
}

function RecipeDrawer({
  isDrawerOpen,
  currentSelectedRecipeID,
  currentSelectedRecipeName,
  closeDrawerOnClick,
}: Props) {
  const [ingredientArray, setIngredientArray] = useState<ingredientDataType[]>(
    []
  );
  const [nutritionArray, setNutritionArray] = useState<nutritionDataType[]>([]);
  const [isIngredientArrayLoading, setIngredientArrayLoading] = useState(false);
  const [isNutritionArrayLoading, setNutritionArrayLoading] = useState(false);

  const loadIngredients = (recipeID: number) => {
    GetIngredients(recipeID)
      .then((jsonData) => {
        setIngredientArray(jsonData);
        setIngredientArrayLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setIngredientArrayLoading(false);
      });
  };

  const loadNutrution = (recipeID: number) => {
    GetNutrition(recipeID)
      .then((response: any) => {
        setNutritionArray([
          {
            nutritionName: "Calorie",
            data: response.calorie,
            unit: "(kCal)",
          },
          {
            nutritionName: "Carbon Hydrate",
            data: response.carbonHydrate,
            unit: "(grams)",
          },
          {
            nutritionName: "Fat",
            data: response.fat,
            unit: "(grams)",
          },
        ]);
        setNutritionArrayLoading(false);
      })
      .catch((err) => {
        // message.error(err.message);
        setNutritionArrayLoading(false);
      });
  };

  useEffect(() => {
    setIngredientArray([]);
    setNutritionArray([]);
    setIngredientArrayLoading(true);
    setNutritionArrayLoading(true);
    loadIngredients(currentSelectedRecipeID);
    loadNutrution(currentSelectedRecipeID);
  }, [currentSelectedRecipeID]);

  return (
    <>
      <Drawer
        title={currentSelectedRecipeName}
        open={isDrawerOpen}
        onClose={closeDrawerOnClick}
      >
        <div className="fs-4" style={{ textAlign: "center" }}>
          Ingredients
        </div>
        <List
          bordered={true}
          loading={isIngredientArrayLoading}
          dataSource={ingredientArray}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.ingredientName}
                description={"Ingredient Type: " + item.ingredientType}
              />
            </List.Item>
          )}
        ></List>
        <Divider />
        <div className="fs-4" style={{ textAlign: "center" }}>
          Nutritions
        </div>
        <List
          bordered={true}
          loading={isNutritionArrayLoading}
          dataSource={nutritionArray}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.nutritionName + ": " + item.data + " " + item.unit}
              />
            </List.Item>
          )}
        ></List>
      </Drawer>
    </>
  );
}

export default RecipeDrawer;
