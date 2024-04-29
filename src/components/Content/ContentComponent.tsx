import { Layout } from "antd";
import AllRecipesComponent from "./AllRecipesComponent";
import SearchRecipesComponent from "./SearchRecipesComponent";
const { Content } = Layout;

interface Props {
  selectedMenuItem: string;
}

function ContentComponent({ selectedMenuItem }: Props) {
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        height: 845,
        overflow: "auto",
      }}
    >
      {selectedMenuItem === "1" && <AllRecipesComponent />}
      {selectedMenuItem === "2" && <SearchRecipesComponent />}
    </Content>
  );
}

export default ContentComponent;
