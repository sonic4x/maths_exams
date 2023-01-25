import { useState } from "react";
import { Row } from "antd";
import { Layout, theme } from "antd";

import axios from "axios";
import global_v from "./global_v";
import OptionsPanel from "./OptionsPanel";
import MainContent from "./MainContent";

const { Content } = Layout;

const MainArea = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [showTest, setShowTest] = useState(false);
  const [operatorList, setOperatorList] = useState(["+"]);
  const [level, setLevel] = useState(1);

  const onClickStartTest = (value) => {
    // value is a list
    // Apply setting
    const path = "http://" + global_v.api_server + ":5000/api/setting";

    axios
      .post(path, {
        operator_list: operatorList,
        difficulty: level,
      })
      .then((res) => {
        console.log("Setting applied");
      });
    setShowTest(true);
  };

  const onClickHistory = (value) => {
    // value is a list
    setShowTest(false);
  };

  const onChangeOperators = (value) => {
    // value is a list
    console.log(`selected ${value}`);
    setOperatorList(value);
  };

  const onChangeLevel = (value) => {
    // value is a list
    console.log(`selected ${value}`);
    setLevel(value);
  };

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
          <OptionsPanel
            level={level}
            onChangeOperators={onChangeOperators}
            onChangeLevel={onChangeLevel}
            onClickBeginTest={onClickStartTest}
            onClickShowHistory={onClickHistory}
          />
        </Row>
        <Row>
          <MainContent isShowTest={showTest} />
        </Row>
      </Content>
    </Layout>
  );
};
export default MainArea;
