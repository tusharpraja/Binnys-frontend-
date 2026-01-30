import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { styled } from "@mui/material/styles";
import MovieFilterRoundedIcon from '@mui/icons-material/MovieFilterRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const StyledAppBar = styled(AppBar)({
  background: "rgba(10, 10, 15, 0.8)",
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  position: "sticky",
});

const StyledToolbar = styled(Toolbar)({
  padding: "12px 24px",
  minHeight: "70px",
});

const Logo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexGrow: 1,
  textDecoration: "none",
  color: "inherit",
  transition: "transform 0.3s ease",
  
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const LogoIcon = styled(MovieFilterRoundedIcon)({
  fontSize: "2.2rem",
  background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  filter: "drop-shadow(0 0 20px rgba(255, 107, 107, 0.5))",
});

const LogoText = styled(Typography)({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 800,
  fontSize: "1.6rem",
  background: "linear-gradient(135deg, #ffffff 0%, #4ECDC4 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  letterSpacing: "0.5px",
});

const NavButton = styled(Button)(({ variant }) => ({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: "0.95rem",
  textTransform: "none",
  padding: "10px 24px",
  borderRadius: "12px",
  marginLeft: "12px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  
  ...(variant === "primary" ? {
    background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
    color: "#fff",
    border: "none",
    
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
    
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(255, 107, 107, 0.4)",
      
      "&::before": {
        opacity: 1,
      },
    },
  } : {
    color: "rgba(255, 255, 255, 0.9)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(255, 255, 255, 0.05)",
    
    "&:hover": {
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.25)",
      transform: "translateY(-2px)",
    },
  }),
  
  "& .MuiButton-startIcon": {
    marginRight: "8px",
  },
}));

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Logo component={Link} to="/">
          <LogoIcon />
          <LogoText variant="h6">
            Binny's Movies
          </LogoText>
        </Logo>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!user && (
            <NavButton 
              component={Link} 
              to="/login"
              startIcon={<LoginRoundedIcon />}
            >
              Login
            </NavButton>
          )}

          {user?.role === "admin" && (
            <NavButton 
              variant="primary"
              component={Link} 
              to="/add-movie"
              startIcon={<AddCircleOutlineRoundedIcon />}
            >
              Add Movie
            </NavButton>
          )}

          {user && (
            <NavButton 
              onClick={logout}
              startIcon={<LogoutRoundedIcon />}
            >
              Logout
            </NavButton>
          )}
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;