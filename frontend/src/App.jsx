import { Routes, Route, Navigate } from "react-router-dom";
import LoginCardComponent from "./components/LoginCardComponent/LoginCardComponent";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import PerfilPage from "./pages/PerfilPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginCardComponent />} />
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/homepage" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/perfil" element={<MainLayout />}>
        <Route index element={<PerfilPage />} />
      </Route>
    </Routes>
  );
}

export default App
