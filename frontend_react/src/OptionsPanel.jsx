import {
  FormOutlined,
  LineChartOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Select, Slider, Space, Button } from "antd";
import "./MainArea.css";

const ops_label = ["加法", "减法", "乘法", "除法"];
const ops_value = ["+", "-", "*", "/"];
const options = [];
for (let i = 0; i < ops_label.length; i++) {
  options.push({
    label: ops_label[i],
    value: ops_value[i],
  });
}

// slider
const slider_marks = {
  1: {
    style: {
      color: "green",
    },
    label: <strong>Easy</strong>,
  },
  2: {
    style: {
      color: "blue",
    },
    label: <strong>Normal</strong>,
  },
  3: {
    style: {
      color: "purple",
    },
    label: <strong>Hard</strong>,
  },
  4: {
    style: {
      color: "orange",
    },
    label: <strong>Very hard</strong>,
  },
};

const satisfactionEmojis = ["😁", "🙂", "😐", "😭"];
const formatter = (value) => {
  return satisfactionEmojis[value - 1];
};

const OptionsPanel = (props) => {
  return (
    <Space
      style={{
        width: "100%",
      }}
      direction='vertical'
    >
      <div className='options'>
        <label>算术选择</label>
        <Select
          mode='multiple'
          allowClear
          style={{
            width: "100%",
          }}
          placeholder='选择加减乘除运算'
          defaultValue={["+", "-"]}
          onChange={props.onChangeOperators}
          options={options}
        />
      </div>
      <div className='options'>
        <label>难度选择</label>
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
            onChange={props.onChangeLevel}
            value={props.level}
          />
        </div>
      </div>
      <div className='button-group'>
        {/* <Space wrap> */}
        <Button
          type='primary'
          shape='round'
          icon={<CarryOutOutlined />}
          size='large'
          style={{ background: "blue" }}
          onClick={props.onClickApplySettings}
        >
          应用设定
        </Button>
        <Button
          type='primary'
          shape='round'
          icon={<FormOutlined />}
          size='large'
          style={{ background: "green" }}
          onClick={props.onClickBeginTest}
        >
          开始答题
        </Button>
        <Button
          type='primary'
          shape='round'
          icon={<LineChartOutlined />}
          size='large'
          style={{ background: "#9400FF" }}
          onClick={props.onClickShowHistory}
        >
          历史表现
        </Button>
        {/* </Space> */}
      </div>
    </Space>
  );
};

export default OptionsPanel;
