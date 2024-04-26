import { Col, Layout, Row } from "antd";

const { Header } = Layout;

import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";
import UserComponent from "./UserComponent";

interface Props {
  isLoggedIn: boolean;
  userID: number;
  signOutOnClick: () => void;
  signInOnSuccess: () => void;
  loginSetUserID: (userID: number) => void;
}

function HeaderComponent({
  isLoggedIn,
  userID,
  signOutOnClick,
  signInOnSuccess,
  loginSetUserID,
}: Props) {
  return (
    <Header>
      <Row justify={"end"}>
        {isLoggedIn && (
          <Col>
            <UserComponent userID={userID} signOutOnClick={signOutOnClick} />
          </Col>
        )}
        {!isLoggedIn && (
          <Col>
            <LoginComponent
              signInOnSuccess={signInOnSuccess}
              loginSetUserID={loginSetUserID}
            />
            <SignUpComponent />
          </Col>
        )}
      </Row>
    </Header>
  );
}

export default HeaderComponent;
