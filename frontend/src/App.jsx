import { Routes, Route, Navigate } from "react-router-dom";
import LoginCardComponent from "./components/LoginCardComponent/LoginCardComponent";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import PerfilPage from "./pages/PerfilPage";
import BibliotecaPage from "./pages/BibliotecaPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginCardComponent />} />
      <Route path="/" element={<Navigate to="/login" />} />

      <Route 
        path="/homepage" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
      </Route>

      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PerfilPage />} />
      </Route>

      <Route 
        path="/biblioteca/:id" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<BibliotecaPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
