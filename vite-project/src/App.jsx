import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Layout, theme, Input } from 'antd';
import Logo from './Components/Logo';
import MenuList from './Components/MenuList';
import ToggleThemeButton from './Components/ToggleThemeButton';
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import NuevoCliente from './Components/NuevoCliente';
import NuevoProveedor from './Components/NuevoProveedor';
import NuevoPosibleCliente from './Components/NuevoPosibleCliente';
import VerServicio from './Components/VerServicio';
import VerPosibleCliente from './Components/VerPosibleCliente';
import VerCliente from './Components/VerCliente';
import NuevoServicio from './Components/NuevoServicio';
import VerProveedor from './Components/VerProveedor';
import MenuOpciones from './Components/MenuOpciones';
import Seguimiento from './Components/NuevoSeguimiento';
import NuevaQueja from './Components/NuevaQueja';
import VerQueja from './Components/VerQueja';
import ModalQueja from './Components/ModalQueja';
import Dashboard from './Components/Dashboard';
import ConvertirPaC from './Components/ConvertirPaC';
import VerSeguimiento from './Components/VerSeguimiento';
import Informe from './Components/Informes/ReporteSeguimiento';
import ReporteSeguimiento from './Components/Informes/ReporteSeguimiento';
import PClienteReporte from './Components/PClienteReporte';
import ReporteQuejas from './Components/Informes/ReporteQuejas';
import InformesGenerales from './Components/InformesGenerales';
import DetallePosibleCliente from './Components/DetallePosibleCliente';
const { Header, Sider } = Layout;
 
function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout>
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
          <Box 
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: '0', width: '100%', paddingBottom: '30px' }}
          >
            {/* Botón para alternar el tema */}
            <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />

            {/* Ícono de Configuración */}
            <Button 
              type="text" 
              icon={<SettingOutlined />} 
              onClick={() => console.log('Abrir configuración')}
            />
          </Box>
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? '80px' : '200px',
            paddingTop: '40px',
          }}
        >
          <Header
            style={{
              padding: 0,
              background: '#001529',
              position: 'fixed',
              width: `calc(100% - ${collapsed ? '80px' : '200px'})`,
              zIndex: 1001,
              top: 0,
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />

            {/* Search input */}
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                maxWidth: '300px',
                marginRight: '20px',
              }}
            />
          </Header>

          <Routes>
            <Route path="/NuevoCliente" element={<NuevoCliente />} />
            <Route path="/NuevoProveedor" element={<NuevoProveedor />} />
            <Route path="/VerProveedor" element={<VerProveedor />} />
            <Route path="/NuevoPosibleCliente" element={<NuevoPosibleCliente />} />
            <Route path="/PosibleCliente" element={<VerPosibleCliente />} />
            <Route path="/MenuOpciones" element={<MenuOpciones />} />
            <Route path="/NuevoServicio" element={<NuevoServicio />} />
            <Route path="/VerServicio" element={<VerServicio />} />
            <Route path="/VerCliente" element={<VerCliente />} />
            <Route path='/VerSeguimiento' element ={<VerSeguimiento />}/>
            <Route path='/ConvertirPaC' element ={<ConvertirPaC />}/>
            <Route path='/Seguimiento' element ={<Seguimiento />}/>
            <Route path='/NuevaQueja' element ={<NuevaQueja />}/>
            <Route path='/VerQueja' element ={<VerQueja />}/>
            <Route path='/ModalQueja' element ={<ModalQueja />}/>
            <Route path='/Dashboard' element ={<Dashboard />}/>
            <Route path='/InformesGenerales' element ={<InformesGenerales />}/>
            <Route path='/Informes/ReporteSeguimiento' element ={<ReporteSeguimiento />}/>
            <Route path='/Informes/ReporteQuejas' element ={<ReporteQuejas />} />
            <Route path='/PClienteReporte' element ={<PClienteReporte />}/>
            <Route path="/detalle-posible-cliente/:id" element={<DetallePosibleCliente />} />

          </Routes>
        </Layout>
            
      </Layout>
    </Router>
  );
}

export default App;
