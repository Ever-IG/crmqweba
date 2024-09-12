import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Layout, theme } from 'antd';
import Logo from './Components/Logo';
import MenuList from './Components/MenuList';
import ToggleThemeButton from './Components/ToggleThemeButton';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NuevoCliente from './Components/NuevoCliente';
import NuevoProveedor from './Components/NuevoProveedor';
import NuevoPosibleCliente from './Components/NuevoPosibleCliente';
import VerServicio from './Components/VerServicio';
import PosibleCliente from './Components/PosibleCliente';
import VerCliente from './Components/VerCliente';
import NuevoServicio from './Components/NuevoServicio';
import VerProveedor from './Components/VerProveedor';

const { Header, Sider } = Layout;

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout>
        {}
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          theme={darkTheme ? 'dark' : 'light'}
          className="sidebar"
          style={{
            position: 'fixed',
            height: '100vh',
            left: 0, 
            top: 0, 
            zIndex: 1000,     
          }}
        >
          <Logo />
          <MenuList darkTheme={darkTheme} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} style={{
            backgroundColor: 'black'  }} />
        </Sider>

        {}
        <Layout
          style={{
            marginLeft: collapsed ? '80px' : '200px',
            paddingTop: '64px', 
          }}
        >
          {}
          <Header
            style={{
              padding: 0,
              background: '#273746',
              position: 'fixed',
              width: `calc(100% - ${collapsed ? '80px' : '100px'})`,
              zIndex: 1001,
              top: 0,
              height: '70px',
            }}
          >
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />

            
          </Header>

          {}
          <Routes>
            <Route path="/NuevoCliente" element={<NuevoCliente />} />
            <Route path="/NuevoProveedor" element={<NuevoProveedor />} />
            <Route path="/VerProveedor" element={<VerProveedor />} />
            <Route path="/NuevoPosibleCliente" element={<NuevoPosibleCliente />} />
            <Route path="/PosibleCliente" element={<PosibleCliente />} />
            <Route path="/NuevoServicio" element={<NuevoServicio />} />
            <Route path="/VerServicio" element={<VerServicio />} />
            <Route path="/VerCliente" element={<VerCliente />} />
          </Routes>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
