import logo from "./logo_maths.svg";
import { Layout, theme } from "antd";
import "./App.css";

const { Header } = Layout;
const HeaderBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      className='header'
      style={{
        background: colorBgContainer,
      }}
    >
      <div className='Title'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1 style={{ position: "relative", left: 10 }}> 数学测试</h1>
      </div>
    </Header>
  );
};

export default HeaderBar;
