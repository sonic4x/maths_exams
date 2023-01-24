import "./MainArea.css";
import axios from "axios";
import global_v from "./global_v";
import { Select, Slider, Space, Layout } from "antd";
import { Input, Modal } from "antd";

import { Col, Row } from "antd";
import { useEffect, useState } from "react";
const { Content } = Layout;

function Exam(props) {
  const [testMsg, setTestMsg] = useState("");
  const [testId, setTestId] = useState(1);
  const [answer, setAnswer] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [finishResult, setFinishResult] = useState({
    duration: 0,
    wrong_num: 0,
    break_record: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const submitAns = (e) => {
    // Apply setting
    const path = "http://" + global_v.api_server + ":5000/api/checkanswer";
    axios
      .post(path, {
        test_str: testMsg,
        test_answer: e.target.value,
      })
      .then((res) => {
        if (res.data["correct"] == 1) {
          setIsWrong(false);
          if (res.data["end"] == 1) {
            console.log("end test");
            setFinishResult({
              duration: res.data["duration"],
              wrong_num: res.data["wrong_num"],
              break_record: res.data["break_record"],
            });

            // this.dialog = true;
          } else {
            console.log("next");
            setTestMsg(res.data["exam"]);
            setTestId(res.data["test_id"]);
            setAnswer("");
            setIsModalOpen(true);
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

  const chooseClass = () => {
    if (isWrong) {
      return "shake";
    } else {
      return "test-input";
    }
  };

  return (
    <Layout style={{ background: "white" }}>
      <div>
        <div className='options'>
          <label>第{testId}题</label>

          <Row gutter={8}>
            <Col span={30}>
              <h1 className='test-msg'>{testMsg} = </h1>
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
        <Modal
          title='Basic Modal'
          open={isModalOpen}
          //   onOk={handleOk}
          //   onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </Layout>
  );
}

export default Exam;
