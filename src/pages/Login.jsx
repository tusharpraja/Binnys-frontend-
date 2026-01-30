import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/authContext";

import { 
  Container, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

const PageContainer = styled(Container)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)",
  paddingTop: "60px",
  paddingBottom: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const LoginCard = styled(Paper)({
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "24px",
  padding: "48px",
  width: "100%",
  maxWidth: "450px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
  position: "relative",
  overflow: "hidden",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "5px",
    background: "linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)",
    backgroundSize: "200% 100%",
    animation: "gradient-shift 3s ease infinite",
  },
  
  "@keyframes gradient-shift": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
  
  "@media (max-width: 600px)": {
    padding: "32px 24px",
  },
});

const LoginHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "40px",
});

const LoginIcon = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "90px",
  height: "90px",
  borderRadius: "22px",
  background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
  marginBottom: "24px",
  boxShadow: "0 10px 30px rgba(255, 107, 107, 0.3)",
  animation: "float 3s ease-in-out infinite",
  
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-10px)" },
  },
  
  "& svg": {
    fontSize: "3rem",
    color: "#fff",
  },
});

const LoginTitle = styled(Box)({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 800,
  fontSize: "2.2rem",
  background: "linear-gradient(135deg, #ffffff 0%, #4ECDC4 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: "8px",
  
  "@media (max-width: 600px)": {
    fontSize: "1.8rem",
  },
});

const LoginSubtitle = styled(Box)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "1rem",
  color: "rgba(255, 255, 255, 0.6)",
});

const StyledTextField = styled(TextField)({
  marginBottom: "24px",
  
  "& .MuiOutlinedInput-root": {
    fontFamily: "'Inter', sans-serif",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.15)",
      transition: "all 0.3s ease",
    },
    
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.25)",
    },
    
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 0.08)",
      
      "& fieldset": {
        borderColor: "#4ECDC4",
        borderWidth: "2px",
      },
    },
    
    "&.Mui-error fieldset": {
      borderColor: "#FF6B6B",
    },
  },
  
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    
    "&.Mui-focused": {
      color: "#4ECDC4",
    },
    
    "&.Mui-error": {
      color: "#FF6B6B",
    },
  },
  
  "& .MuiInputAdornment-root svg": {
    color: "rgba(255, 255, 255, 0.5)",
  },
  
  "& .MuiFormHelperText-root": {
    fontFamily: "'Inter', sans-serif",
    marginLeft: "4px",
  },
});

const LoginButton = styled(Button)({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  fontSize: "1.1rem",
  textTransform: "none",
  padding: "16px 32px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
  color: "#fff",
  border: "none",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  marginTop: "8px",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #4ECDC4, #FF6B6B)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  
  "&:hover:not(:disabled)": {
    transform: "translateY(-3px)",
    boxShadow: "0 12px 40px rgba(255, 107, 107, 0.4)",
    
    "&::before": {
      opacity: 1,
    },
  },
  
  "&:active:not(:disabled)": {
    transform: "translateY(-1px)",
  },
  
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  
  "& .MuiButton-startIcon": {
    marginRight: "12px",
  },
});

const StyledAlert = styled(Alert)({
  marginBottom: "24px",
  borderRadius: "12px",
  fontFamily: "'Inter', sans-serif",
  
  "&.MuiAlert-standardError": {
    background: "rgba(255, 107, 107, 0.1)",
    border: "1px solid rgba(255, 107, 107, 0.3)",
    color: "#fff",
    
    "& .MuiAlert-icon": {
      color: "#FF6B6B",
    },
  },
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 5) {
      errors.password = "Password must be at least 5 characters";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await api.post("/auth/login", { email, password });
      
      // Debug: Log the response to see what structure you're getting
      console.log("Login response:", res.data);
      
      // Handle different possible response structures
      if (res.data) {
        // Check if response has token
        if (!res.data.token) {
          setError("Invalid response from server: No token received");
          return;
        }
        
        // Prepare the data in the format AuthContext expects
        const authData = {
          token: res.data.token,
          user: res.data.user || res.data // Some APIs return user data directly
        };
        
        // Additional check for admin role
        if (authData.user && authData.user.role !== "admin") {
          setError("Access denied. Admin privileges required.");
          return;
        }
        
        login(authData);
        navigate("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response);
      
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
      } else if (err.response?.status === 404) {
        setError("User not found");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message === "Network Error") {
        setError("Cannot connect to server. Please check your connection.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer maxWidth="sm">
      <LoginCard elevation={0}>
        <LoginHeader>
          <LoginIcon>
            <AdminPanelSettingsRoundedIcon />
          </LoginIcon>
          <LoginTitle>Admin Login</LoginTitle>
          <LoginSubtitle>Access your movie management dashboard</LoginSubtitle>
        </LoginHeader>

        {error && (
          <StyledAlert severity="error" onClose={() => setError("")}>
            {error}
          </StyledAlert>
        )}

        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors({ ...fieldErrors, email: "" });
            }}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRoundedIcon />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors({ ...fieldErrors, password: "" });
            }}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRoundedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={loading}
                    sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoginButton
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <LoginRoundedIcon />}
          >
            {loading ? "Signing In..." : "Sign In to Dashboard"}
          </LoginButton>
        </form>
      </LoginCard>
    </PageContainer>
  );
};

export default Login;