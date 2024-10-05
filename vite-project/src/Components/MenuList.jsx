import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, ContactsOutlined, ShoppingCartOutlined, WarningOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom'; // Importamos Link para la navegación


const { SubMenu } = Menu;
const MenuList = ({ darkTheme }) => {
  return (
    <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>
      
      <Menu.Item key="Inicio" icon={<HomeOutlined />}> {}
        <Link to="/">Inicio</Link>
      </Menu.Item>

      <SubMenu key="PosiblesClientes" icon={<UserOutlined />} title="Posibles Clientes">
        <Menu.Item key="5">
          <Link to="/NuevoPosibleCliente">Nuevo Posible Cliente</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/PosibleCliente">Listado de Posibles Clientes</Link>
        </Menu.Item>
        <Menu.Item key="12">
          <Link to="/MenuOpciones">Opciones</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="Clientes" icon={<UserOutlined />} title="Clientes">
        <Menu.Item key="7">
          <Link to="/NuevoCliente">Crear Clientes</Link>
        </Menu.Item>
        <Menu.Item key="8">
        <NavLink to="/VerCliente" activeClassName="active">Ver Cliente</NavLink>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="Seguimiento" icon={<HomeOutlined />}> {}
        <Link to="/Seguimiento">Seguimiento</Link>
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

        <SubMenu key="QUEJA " icon={<WarningOutlined />} title="QUEJA">
        <Menu.Item key="12">
        <NavLink to="/NuevaQueja" activeClassName="active">Agregar Queja</NavLink>
        </Menu.Item>
        <Menu.Item key="12">
        <NavLink to="/VerQueja" activeClassName="active">Ver Queja</NavLink>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default MenuList;
