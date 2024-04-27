import { Menu, Layout, Button, MenuProps } from "antd";
const { Sider } = Layout;

interface Props {
  updateSelectedMenuItem: (key: any) => void;
}

function SiderComponent({ updateSelectedMenuItem }: Props) {
  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode
  ): MenuItem {
    return {
      key,
      icon,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [getItem("Recipes", 1), getItem("Ingredients", 2)];

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
