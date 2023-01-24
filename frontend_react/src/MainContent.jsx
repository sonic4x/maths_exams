import Exam from "./Exam";
import History from "./History";

function TestComponent(props) {
  return <Exam testId='1' />;
}

function HistoryComponent(props) {
  return <History />;
}

function MainContent(props) {
  const isShowTest = props.isShowTest;
  if (isShowTest) {
    return <TestComponent />;
  }
  return <HistoryComponent />;
}

export default MainContent;
