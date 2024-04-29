import { Layout } from "antd";
import { useState } from "react";
import ContentComponent from "./components/Content/ContentComponent";
import HeaderComponent from "./components/Header/HeaderComponent";
import SiderComponent from "./components/Sider/SiderComponent";

const { Header, Content, Sider, Footer } = Layout;

function App() {
  // TODO: change loggin state back to false
  const [isLoggedIn, setLoggedInStatus] = useState(false);
  const [userID, setUserID] = useState(-1);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  const signInOnSuccess = () => {
    setLoggedInStatus(true);
  };

  const signOutOnClick = () => {
    setLoggedInStatus(false);
  };

  const loginSetUserID = (userID: number) => {
    setUserID(userID);
  };

  const updateSelectedMenuItem = (key: string) => {
    setSelectedMenuItem(key);
  };

  return (
    <Layout>
      <HeaderComponent
        isLoggedIn={isLoggedIn}
        userID={userID}
        signInOnSuccess={signInOnSuccess}
        signOutOnClick={signOutOnClick}
        loginSetUserID={loginSetUserID}
      />
      <Layout hasSider={true}>
        <SiderComponent updateSelectedMenuItem={updateSelectedMenuItem} />
        <Layout style={{ padding: "24px" }}>
          <ContentComponent selectedMenuItem={selectedMenuItem} />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
