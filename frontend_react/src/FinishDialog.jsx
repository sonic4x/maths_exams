import { Modal, Rate } from "antd";
import sound_finish from "./finish.mp3";
import { useEffect, useCallback } from "react";

import "./MainArea.css";

let wrongNumMsg;
let rate;

function FinishDialog(props) {
  console.log("FinishDialog");
  // useEffect with useCallback, this way, useEffect won't be called repeatedly.
  // Only when props.result change, it will re-calculate.
  const calcResult = useCallback(() => {
    console.log("finish_useCallback");
    wrongNumMsg =
      props.result.wrongNum > 0
        ? "共答错" + props.result.wrongNum + "题。"
        : "全对，太棒了！";

    rate = 5;
    if (!props.result.breakRecord) rate -= 0.5;
    if (props.result.wrongNum > 5) rate -= 1;
    else if (props.result.wrongNum > 0) rate -= 0.5;
    console.log(rate);
  }, [props.result]);

  useEffect(() => {
    console.log("finish_useEffect");
    calcResult();
  }, [calcResult]);

  return (
    <Modal
      title='恭喜你完成所有考题'
      open={props.open}
      onOk={props.onCancel}
      onCancel={props.onCancel}
    >
      <audio src={sound_finish} autoPlay='autoplay'></audio>
      <p>{wrongNumMsg}</p>
      <p>共耗时：{props.result.duration}</p>
      <p className={props.result.breakRecord ? "" : "hidden"}>破记录了哟🥙</p>
      <div className='rate-wrapper'>
        <Rate allowHalf disabled defaultValue={rate} />
      </div>
    </Modal>
  );
}

export default FinishDialog;
