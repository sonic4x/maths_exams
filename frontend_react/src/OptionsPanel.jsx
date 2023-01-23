import { useState } from "react";
import { Select, Slider, Space } from "antd";
import "./OptionsPanel.css";

// import { FrownOutlined, SmileOutlined } from "@ant-design/icons";

const ops_label = ["加法", "减法", "乘法", "除法"];
const ops_value = ["+", "-", "*", "/"];
const options = [];
for (let i = 0; i < ops_label.length; i++) {
  options.push({
    label: ops_label[i],
    value: ops_value[i],
  });
}
const handleChange = (value) => {
  // value is a list
  console.log(`selected ${value}`);
  //   TODO: save value to state (of parent).
};

// slider
const slider_marks = {
  1: {
    style: {
      color: "green",
    },
    label: <strong>B</strong>,
  },
  2: {
    style: {
      color: "blue",
    },
    label: <strong>A</strong>,
  },
  3: {
    style: {
      color: "purple",
    },
    label: <strong>A+</strong>,
  },
  4: {
    style: {
      color: "orange",
    },
    label: <strong>A++</strong>,
  },
};

const satisfactionEmojis = ["😁", "🙂", "😐", "😭"];
const formatter = (value) => {
  return satisfactionEmojis[value - 1];
};

const OptionsPanel = () => {
  const [level, setLevel] = useState(0);
  return (
    <Space
      style={{
        width: "100%",
      }}
      direction='vertical'
    >
      <div className='options'>
        <label style={{ top: 4 }}>算术选择</label>
        <Select
          mode='multiple'
          allowClear
          style={{
            width: "100%",
          }}
          placeholder='选择难度'
          defaultValue={["+", "-"]}
          onChange={handleChange}
          options={options}
        />
      </div>
      <div className='options'>
        <label style={{ top: 9 }}>难度选择</label>
        <div>
          <Slider
            min={1}
            max={4}
            marks={slider_marks}
            // tooltip={{ formatter: null }}
            tooltip={{
              formatter,
            }}
            // step={null}
            defaultValue={1}
            onChange={setLevel}
            value={level}
          />
        </div>
      </div>
    </Space>
  );
};

export default OptionsPanel;
