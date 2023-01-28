import { useState } from "react";
import { Row } from "antd";
import { Layout, theme } from "antd";

import axios from "axios";
import global_v from "./global_v";
import OptionsPanel from "./OptionsPanel";
import MainContent from "./MainContent";

import { CustomerServiceOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import season_train from "./seasontrain.mp3";

const { Content } = Layout;

const MainArea = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [showTest, setShowTest] = useState(false);
  const [operatorList, setOperatorList] = useState(["+", "-"]);
  const [level, setLevel] = useState(1);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const toggleMusic = () => {
    var x = document.getElementById("myAudio");

    if (isMusicOn) {
      x.pause();
      setIsMusicOn(false);
    } else {
      x.play();
      setIsMusicOn(true);
    }
  };
  const onStartTest = (value) => {
    setShowTest(true);
  };

  const onApplySettings = (value) => {
    // value is a list
    // Apply setting
    const path = global_v.api_server + "/api/setting";

    axios
      .post(path, {
        operator_list: operatorList,
        difficulty: level,
      })
      .then((res) => {
        // console.log("Setting applied");
      });
    // setShowTest(true);
  };

  const onClickHistory = (value) => {
    // value is a list
    setShowTest(false);
  };

  const onChangeOperators = (value) => {
    // value is a list
    // console.log(`selected ${value}`);
    setOperatorList(value);
  };

  const onChangeLevel = (value) => {
    // value is a list
    // console.log(`selected ${value}`);
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
            onClickApplySettings={onApplySettings}
            onClickBeginTest={onStartTest}
            onClickShowHistory={onClickHistory}
          />
        </Row>
        <Row>
          <MainContent isShowTest={showTest} />
        </Row>
        <FloatButton
          style={{
            right: 24,
            bottom: 80,
          }}
          tooltip='Music'
          icon={<CustomerServiceOutlined />}
          onClick={toggleMusic}
        />
        <audio id='myAudio' src={season_train} loop='loop'></audio>
      </Content>
    </Layout>
  );
};
export default MainArea;
