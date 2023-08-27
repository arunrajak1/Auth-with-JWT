import "./App.css";
import LoginPage from "./Componets/LoginPage/LoginPage";
import RecordScreen from "./Componets/RecordingMedia/RecordScreen";
import { Route, Routes ,useLocation} from "react-router-dom";

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "https://auth-with-jwt.onrender.com/";
  return (
    <Routes>
      {isLoginPage ? (
        <Route path="/login" element={<LoginPage />} />
      ) : (
        <>
          <Route path="/" element={<RecordScreen />} />
        </>
      )}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
