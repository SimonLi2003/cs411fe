import { Button, Col, Layout, Row } from "antd";

const { Header } = Layout;

import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";

interface Props {
  isLoggedIn: boolean;
  signOutOnClick: () => void;
  signInOnSuccess: () => void;
}

function HeaderComponent({
  isLoggedIn,
  signOutOnClick,
  signInOnSuccess,
}: Props) {
  return (
    <Header>
      <Row justify={"end"}>
        {isLoggedIn && (
          <Col>
            <Button
              shape="round"
              style={{ marginRight: "20px" }}
              onClick={signOutOnClick}
            >
              Signout
            </Button>
          </Col>
        )}
        {!isLoggedIn && (
          <Col>
            <LoginComponent onSuccess={signInOnSuccess} />
            <SignUpComponent />
          </Col>
        )}
      </Row>
    </Header>
  );
}

export default HeaderComponent;
