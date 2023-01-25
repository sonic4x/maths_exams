import "./MainArea.css";
import axios from "axios";
import global_v from "./global_v";
import { Layout } from "antd";
import { Input } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import FinishDialog from "./FinishDialog";

function Exam(props) {
  const [testMsg, setTestMsg] = useState("");
  const [testId, setTestId] = useState(1);
  const [answer, setAnswer] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [finishResult, setFinishResult] = useState({
    duration: 0,
    wrongNum: 0,
    breakRecord: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTestAnimation, setShowTestAnimation] = useState(true);

  useEffect(() => {
    const path = "http://" + global_v.api_server + ":5000/api/getexam";
    axios
      .get(path)
      .then((res) => {
        setTestMsg(res.data["exam"]);
        setTestId(res.data["test_id"]);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error);
      });
  }, []);

  const onChange = (e) => {
    console.log(e.target.value);
    setAnswer(e.target.value);
  };

  const restartTest = (e) => {
    setShowTestAnimation(false);
    const path = "http://" + global_v.api_server + ":5000/api/getexam";
    axios
      .get(path)
      .then((res) => {
        setTestMsg(res.data["exam"]);
        setTestId(res.data["test_id"]);
        setShowTestAnimation(true);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error);
      });
  };

  const submitAns = (e) => {
    setShowTestAnimation(false);
    const path = "http://" + global_v.api_server + ":5000/api/checkanswer";
    axios
      .post(path, {
        test_str: testMsg,
        test_answer: e.target.value,
      })
      .then((res) => {
        if (res.data["correct"] === 1) {
          setIsWrong(false);
          if (res.data["end"] === 1) {
            console.log("end test");

            setFinishResult({
              duration: res.data["duration"],
              wrongNum: res.data["wrong_num"],
              breakRecord: res.data["breakRecord"],
            });
            setIsModalOpen(true);
          } else {
            console.log("next");
            setTestMsg(res.data["exam"]);
            setTestId(res.data["test_id"]);
            setAnswer("");
            setShowTestAnimation(true);
          }
        } else {
          //   alert("回答错误");
          setIsWrong(true);
          // TODO: animation
          //   const ele = document.getElementById("test-input-panel").parentElement;
          //   ele.setAttribute("class", "warn");
        }
      });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout style={{ background: "white" }}>
      <div>
        <div className='options'>
          <label>第{testId}题</label>

          <Row gutter={8}>
            <Col span={30}>
              <h1 className={showTestAnimation ? "test-msg flipX" : "test-msg"}>
                {testMsg} ={" "}
              </h1>
            </Col>
            <Col span={30}>
              <Input
                id='test-input-panel'
                className={isWrong ? "warn shake" : "test-input"}
                status={isWrong ? "error" : ""}
                placeholder='输入后Enter'
                allowClear
                value={answer}
                onPressEnter={submitAns}
                onChange={onChange}
              />
            </Col>
          </Row>
        </div>
        <FloatButton.Group
          shape='circle'
          style={{
            right: 24,
            bottom: 24,
          }}
        >
          <FloatButton
            tooltip='restart'
            icon={<UndoOutlined />}
            onClick={restartTest}
          />
        </FloatButton.Group>

        <FinishDialog
          open={isModalOpen}
          onCancel={handleOk}
          result={finishResult}
        />
      </div>
    </Layout>
  );
}

export default Exam;
