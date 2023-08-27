import "./App.css";
import LoginPage from "./Componets/LoginPage/LoginPage";
import RecordScreen from "./Componets/RecordingMedia/RecordScreen";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" Component={LoginPage} />
      <Route path="/" Component={ RecordScreen } />
      <Route path="*" Component={LoginPage} />
    </Routes>
  );
}

export default App;
