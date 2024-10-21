import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, ContactsOutlined, ShoppingCartOutlined, CommentOutlined, WarningOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom'; // Importamos Link para la navegación


const { SubMenu } = Menu;
const MenuList = ({ darkTheme }) => {
  return (
    <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>
      
      <Menu.Item key="Inicio" icon={<HomeOutlined />}> {}
        <Link to="/Dashboard">Inicio</Link>
      </Menu.Item>

        <Menu.Item key="PosiblesClientes" icon={<UserOutlined />} title="Posibles Clientes">
          <Link to="/PosibleCliente">Posibles Clientes</Link>
        </Menu.Item>

        <Menu.Item key="Clientes" icon={<UserOutlined />} title="Clientes">
          <Link to="/VerCliente">Clientes</Link>
        </Menu.Item>
      <Menu.Item key="VerSeguimiento" icon={<CommentOutlined />}> {}
        <Link to="/VerSeguimiento">Seguimientos</Link>
      </Menu.Item>
      <SubMenu key="Proveedores" icon={<ContactsOutlined />} title="Proveedores">
        <Menu.Item key="8">
          <Link to="/NuevoProveedor">Agregar Proveedor</Link>
        </Menu.Item>
        <Menu.Item key="9">
        <NavLink to="/VerProveedor" activeClassName="active">Ver Proveedores</NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="Servicios" icon={<ShoppingCartOutlined />} title="Servicios">
        <Menu.Item key="10">
          <Link to="/NuevoServicio">Agregar Servicio</Link>
        </Menu.Item>
        <Menu.Item key="11">
        <NavLink to="/VerServicio" activeClassName="active">Ver Servicios</NavLink>
        </Menu.Item>
        </SubMenu>
        <Menu.Item key="Quejas" icon={<CommentOutlined />}> {}
        <Link to="/VerQueja">Quejas</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
