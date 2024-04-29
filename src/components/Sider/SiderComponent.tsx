import { Layout, Menu, MenuProps } from "antd";
const { Sider } = Layout;

interface Props {
  updateSelectedMenuItem: (key: any) => void;
}

function SiderComponent({ updateSelectedMenuItem }: Props) {
  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(label: React.ReactNode, key: React.Key): MenuItem {
    return {
      key,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("All Recipes", 1),
    getItem("Search Recipe", 2),
    getItem("Ingredients", 3),
  ];

  const menuItemOnClick = (item: MenuItem) => {
    updateSelectedMenuItem(item?.key);
  };

  return (
    <Sider theme="dark" width={250}>
      <Menu
        items={items}
        onClick={menuItemOnClick}
        theme="dark"
        defaultSelectedKeys={["1"]}
      />
    </Sider>
  );
}

export default SiderComponent;
