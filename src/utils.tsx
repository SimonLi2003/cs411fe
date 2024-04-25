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
    console.log(response);
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
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to Login");
    }
  });
};
