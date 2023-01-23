import { Col, Row } from "antd";
import { Layout, theme } from "antd";

import OptionsPanel from "./OptionsPanel";

const { Content } = Layout;

const MainArea = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Row>
          <OptionsPanel />
        </Row>
        <Row>MainContent</Row>
        <Row>Copyright</Row>
      </Content>
    </Layout>
  );
};
export default MainArea;
