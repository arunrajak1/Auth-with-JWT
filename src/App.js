import "./App.css";
import HomePage from "./Componets/Home/HomePage";
import LoginPage from "./Componets/LoginPage/LoginPage";
import RecordScreen from "./Componets/RecordingMedia/RecordScreen";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={ <RecordScreen />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
