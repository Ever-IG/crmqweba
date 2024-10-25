import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, ContactsOutlined, ShoppingCartOutlined, CommentOutlined, WarningOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom'; // Importamos Link para la navegación

const { SubMenu } = Menu;

const MenuList = ({ darkTheme }) => {
  return (
    <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>
      <Menu.Item key="Inicio" icon={<HomeOutlined />}>
        <Link to="/MenuOpciones">Inicio</Link>
      </Menu.Item>

      <Menu.Item key="PosiblesClientes" icon={<UserOutlined />} title="Posibles Clientes">
        <Link to="/PosibleCliente">Posibles Clientes</Link>
      </Menu.Item>

      <SubMenu key="Clientes" icon={<UserOutlined />} title="Clientes">
        <Menu.Item key="7">
          <Link to="/NuevoCliente">Crear Clientes</Link>
        </Menu.Item>
        <Menu.Item key="8">
          <NavLink to="/VerCliente" activeClassName="active">Ver Cliente</NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="VerSeguimiento" icon={<CommentOutlined />}>
        <Link to="/VerSeguimiento">Seguimientos</Link>
      </Menu.Item>

      <SubMenu key="Proveedores" icon={<ContactsOutlined />} title="Proveedores">
        <Menu.Item key="9">
          <Link to="/NuevoProveedor">Agregar Proveedor</Link>
        </Menu.Item>
        <Menu.Item key="10">
          <NavLink to="/VerProveedor" activeClassName="active">Ver Proveedores</NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="Servicios" icon={<ShoppingCartOutlined />} title="Servicios">
        <Menu.Item key="11">
          <Link to="/NuevoServicio">Agregar Servicio</Link>
        </Menu.Item>
        <Menu.Item key="12">
          <NavLink to="/VerServicio" activeClassName="active">Ver Servicios</NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="QUEJA" icon={<WarningOutlined />} title="Queja">
        <Menu.Item key="13">
          <NavLink to="/NuevaQueja" activeClassName="active">Agregar Queja</NavLink>
        </Menu.Item>
        <Menu.Item key="14">
          <NavLink to="/VerQueja" activeClassName="active">Ver Queja</NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="PClienteReporte" icon={<CommentOutlined />}>
        <Link to="/PClienteReporte">REPORTE</Link>
      </Menu.Item>
    </Menu> 
  ); // Closing the return statement
};

export default MenuList;
