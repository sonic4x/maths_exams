import "./App.css";
import { Layout, Divider } from "antd";
import HeaderBar from "./HeaderBar";
import MainArea from "./MainArea";
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <Layout style={{ background: "white" }}>
      <HeaderBar />
      <Divider />
      <MainArea />
      <Divider />
    </Layout>
  );
}

export default App;
