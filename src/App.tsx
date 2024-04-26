import { useState } from "react";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  // TODO: change loggin state back to false
  const [isLoggedIn, setLoggedInStatus] = useState(false);
  const [userID, setUserID] = useState(-1);

  const signInOnSuccess = () => {
    setLoggedInStatus(true);
  };

  const signOutOnClick = () => {
    setLoggedInStatus(false);
  };

  const loginSetUserID = (userID: number) => {
    setUserID(userID);
  };

  return (
    <HeaderComponent
      isLoggedIn={isLoggedIn}
      userID={userID}
      signInOnSuccess={signInOnSuccess}
      signOutOnClick={signOutOnClick}
      loginSetUserID={loginSetUserID}
    />
  );
}

export default App;
