import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AuthContext } from "./context/authContext";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Login from "./pages/Login";
import AddMovie from "./pages/AddMovie";
import "../App.css";

// Protected Route Component for Admin-only pages
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Public Route - Redirect to home if already logged in
const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function AppContent() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Movies />} />
        
        {/* Login Route - Redirect if already logged in */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/add-movie" 
          element={
            <ProtectedRoute>
              <AddMovie />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;