import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="movie">
        <a href="/movie">영화</a>
      </Menu.Item>
      <Menu.Item key="tv">
        <a href="/tv">Tv</a>
      </Menu.Item>
      <Menu.Item key="book">
        <a href="/book">도서</a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/favorite">내가찜한콘텐츠</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
