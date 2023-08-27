import "./App.css";
import Home from "./Componets/Home/Home";
import LoginPage from "./Componets/LoginPage/LoginPage";
import RecordScreen from "./Componets/RecordingMedia/RecordScreen";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
    <Home path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={ <RecordScreen />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
