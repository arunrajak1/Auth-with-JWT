import "./App.css";

import LoginPage from "./Componets/LoginPage/LoginPage";
import RecordScreen from "./Componets/RecordingMedia/RecordScreen";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={ <RecordScreen />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
