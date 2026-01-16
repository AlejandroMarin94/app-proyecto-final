import { Routes, Route, Navigate } from "react-router-dom";
import LoginCardComponent from "./components/LoginCardComponent/LoginCardComponent";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginCardComponent />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/homepage" element={<MainLayout />} />
    </Routes>
  );
}

export default App
