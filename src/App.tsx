import { useState } from "react";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  const [isLoggedIn, setLoggedInStatus] = useState(false);

  const signInOnSuccess = () => {
    setLoggedInStatus(true);
  }

  const signOutOnClick = () => {
    setLoggedInStatus(false);
  }

  return (
    <HeaderComponent
      isLoggedIn={isLoggedIn}
      signInOnSuccess={signInOnSuccess}
      signOutOnClick={signOutOnClick}
    />
  );
}

export default App;
