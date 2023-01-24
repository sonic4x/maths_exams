import Exam from "./Exam";

function TestComponent(props) {
  return <Exam testId='1' />;
}

function HistoryComponent(props) {
  return <h1>HistoryComponent</h1>;
}

function MainContent(props) {
  const isShowTest = props.isShowTest;
  if (isShowTest) {
    return <TestComponent />;
  }
  return <HistoryComponent />;
}

export default MainContent;
