import { Modal, Rate } from "antd";

import "./MainArea.css";
function FinishDialog(props) {
  const wrongNumMsg =
    props.result.wrongNum > 0
      ? "共答错" + props.result.wrongNum + "题。"
      : "全对，太棒了！";

  let rate = 5;
  if (!props.result.breakRecord) rate -= 0.5;
  if (props.result.wrongNum > 5) rate -= 1;
  else if (props.result.wrongNum > 0) rate -= 0.5;
  console.log(rate);

  return (
    <Modal
      title='恭喜你完成所有考题'
      open={props.open}
      onOk={props.onCancel}
      onCancel={props.onCancel}
    >
      <p>共耗时：{props.result.duration}</p>
      <p className={props.result.breakRecord ? "" : "hidden"}>破记录了哟🥙</p>
      <p>{wrongNumMsg}</p>
      <p className='rate-wrapper'>
        <Rate allowHalf disabled defaultValue={rate} />
      </p>
    </Modal>
  );
}

export default FinishDialog;
