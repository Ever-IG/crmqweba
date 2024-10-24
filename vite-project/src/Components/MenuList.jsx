import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ContactsOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  WarningOutlined,
  AuditOutlined
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom"; // Importamos Link para la navegación

const { SubMenu } = Menu;
const MenuList = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
    >
      <Menu.Item key="Inicio" icon={<HomeOutlined />}>
        {" "}
        {}
        <Link to="/Dashboard">Inicio</Link>
      </Menu.Item>

      <Menu.Item
        key="PosiblesClientes"
        icon={<UserOutlined />}
        title="Posibles Clientes"
      >
        <Link to="/PosibleCliente">Posibles Clientes</Link>
      </Menu.Item>

      <Menu.Item key="Clientes" icon={<UserOutlined />} title="Clientes">
        <Link to="/VerCliente">Clientes</Link>
      </Menu.Item>
      <Menu.Item key="VerSeguimiento" icon={<CommentOutlined />}>
        {" "}
        {}
        <Link to="/VerSeguimiento">Seguimientos</Link>
      </Menu.Item>

      <Menu.Item key="VerProveedor" icon={<ContactsOutlined />}>
        {" "}
        {}
        <Link to="/VerProveedor">Proveedores</Link>
      </Menu.Item>

      <Menu.Item
        key="Servicios"
        icon={<ShoppingCartOutlined />}
        title="Servicios"
      >
        <Link to="/VerServicio">Servicios</Link>
      </Menu.Item>

      <Menu.Item key="Quejas" icon={<CommentOutlined />}>
        {" "}
        {}
        <Link to="/VerQueja">Quejas</Link>
      </Menu.Item>

      <Menu.Item key="Informe" icon={<AuditOutlined />} title="Informe" >
       {}
        <Link to="/Informes/ReporteSeguimiento">Informe</Link>
      </Menu.Item>

    </Menu>
    


  );
};

export default MenuList;
