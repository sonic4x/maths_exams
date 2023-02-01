import { Modal, Rate } from "antd";
import sound_finish from "./finish.mp3";
import { useEffect, useCallback } from "react";

import "./MainArea.css";
import { useState } from "react";

let wrongNumMsg;
let rate;

function FinishDialog(props) {
  const [readyShow, setReadyShow] = useState(false);

  const calcResult = useCallback(() => {
    console.log("calcResult");
    console.log(props.result.wrongNum);
    wrongNumMsg =
      props.result.wrongNum > 0
        ? "共答错" + props.result.wrongNum + "题。"
        : "全对，太棒了！";

    rate = 5;
    // if (!props.result.breakRecord) rate -= 0.5;
    if (props.result.wrongNum > 5) rate -= 1;
    else if (props.result.wrongNum > 0) rate -= 0.5;
    console.log(rate);
  }, [props.result]);

  useEffect(() => {
    setReadyShow(false);
    console.log("useEffect");
    calcResult();
    // ensure when the diag show, all the value are updated
    if (props.open) {
      setReadyShow(true);
    }
  }, [props.open, calcResult]);

  const handleCancel = () => {
    setReadyShow(false);
    props.onCancel();
  };

  return (
    <Modal
      title='恭喜你完成所有考题'
      open={readyShow}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      <audio src={sound_finish} autoPlay='autoplay'></audio>
      <p>{wrongNumMsg}</p>
      <p>共耗时：{props.result.duration}</p>
      <p className={props.result.breakRecord ? "" : "hidden"}>破记录了哟🥙</p>
      <div className='rate-wrapper'>
        <Rate allowHalf disabled value={rate} />
      </div>
    </Modal>
  );
}

export default FinishDialog;
