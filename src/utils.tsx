const SERVER_ORIGIN = "http://localhost:8080/api/v1";

const signUpURL = `${SERVER_ORIGIN}/user/add`;
export const signUp = (credential: any) => {
  const formData = new FormData();
  formData.append("userName", credential.username);
  formData.append("userEmail", credential.email);
  formData.append("password", credential.password);

  return fetch(signUpURL, {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};

const loginURL = `${SERVER_ORIGIN}/user/login`;
export const Login = (credential: any) => {
  const formData = new FormData();
  formData.append("userEmail", credential.email);
  formData.append("password", credential.password);

  return fetch(loginURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to Login");
      }
      return response.text();
    })
    .then((text) => {
      const userID = Number(text);
      return userID;
    });
};

const updateURL = `${SERVER_ORIGIN}/user/updateAll`;
export const UpdateAll = (userID: number, credential: any) => {
  const formData = new FormData();
  formData.append("userID", userID.toString());
  if (credential.username != undefined) {
    formData.append("newUserName", credential.username);
  }

  if (credential.email != undefined) {
    formData.append("newUserEmail", credential.email);
  }

  if (credential.password != undefined) {
    formData.append("newUserPassword", credential.password);
  }

  return fetch(updateURL, {
    method: "PUT",
    body: formData,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to Update");
    }
  });
};

const deleteURL = `${SERVER_ORIGIN}/user/deleteUser`;
export const DeleteUser = (userID: number) => {
  const formData = new FormData();
  formData.append("userID", userID.toString());

  return fetch(deleteURL, {
    method: "DELETE",
    body: formData,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to Delete");
    }
  });
};

const getRecipeURL = `${SERVER_ORIGIN}/recipe/allRecipes`;
export const GetRecipe = (totalRecipeSize: number) => {
  const formData = new FormData();
  formData.append("skipRowsOffset", totalRecipeSize.toString());
  return fetch(getRecipeURL, {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to load Recipes");
    }
    return response.json();
  });
};

const getIngredientsURL = `${SERVER_ORIGIN}/recipeIncludeIngredient/getIngredientsWithRecipeID`;
export const GetIngredients = (recipeID: number) => {
  const formData = new FormData();
  formData.append("recipeID", recipeID.toString());
  return fetch(getIngredientsURL, {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to load Recipes");
    }
    return response.json();
  });
};

const getNutritionURL = `${SERVER_ORIGIN}/nutrition/getNutritionWithRecipeID`;
export const GetNutrition = (recipeID: number) => {
  const formData = new FormData();
  formData.append("recipeID", recipeID.toString());
  return fetch(getNutritionURL, {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to load Recipes");
    }
    return response.json();
  });
};
