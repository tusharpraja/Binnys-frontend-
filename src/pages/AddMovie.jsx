import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { 
  Container, 
  TextField, 
  Button, 
  Box, 
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';

const PageContainer = styled(Container)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)",
  paddingTop: "60px",
  paddingBottom: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FormCard = styled(Paper)({
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "24px",
  padding: "48px",
  maxWidth: "700px",
  width: "100%",
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

const FormHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "40px",
});

const FormIcon = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  height: "80px",
  borderRadius: "20px",
  background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
  marginBottom: "24px",
  boxShadow: "0 10px 30px rgba(255, 107, 107, 0.3)",
  
  "& svg": {
    fontSize: "2.5rem",
    color: "#fff",
  },
});

const FormTitle = styled(Box)({
  fontFamily: "'Outfit', sans-serif",
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

const FormSubtitle = styled(Box)({
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1rem",
  color: "rgba(255, 255, 255, 0.6)",
  fontWeight: 300,
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontFamily: "'Outfit', sans-serif",
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
    fontFamily: "'Outfit', sans-serif",
    fontSize: "1rem",
    
    "&.Mui-focused": {
      color: "#4ECDC4",
    },
    
    "&.Mui-error": {
      color: "#FF6B6B",
    },
  },
  
  "& .MuiFormHelperText-root": {
    fontFamily: "'Outfit', sans-serif",
    marginLeft: "4px",
  },
});

const PosterPreview = styled(Box)({
  marginTop: "16px",
  marginBottom: "24px",
  borderRadius: "12px",
  overflow: "hidden",
  border: "2px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(255, 255, 255, 0.03)",
  height: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const PreviewPlaceholder = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  color: "rgba(255, 255, 255, 0.3)",
  
  "& svg": {
    fontSize: "4rem",
  },
});

const SubmitButton = styled(Button)({
  fontFamily: "'Outfit', sans-serif",
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
  marginTop: "16px",
  
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
  fontFamily: "'Outfit', sans-serif",
  
  "&.MuiAlert-standardError": {
    background: "rgba(255, 107, 107, 0.1)",
    border: "1px solid rgba(255, 107, 107, 0.3)",
    color: "#fff",
    
    "& .MuiAlert-icon": {
      color: "#FF6B6B",
    },
  },
});

const AddMovie = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    duration: "",
    poster: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [posterPreview, setPosterPreview] = useState("");

  const validateForm = () => {
    const errors = {};
    
    if (!movie.title || movie.title.trim().length === 0) {
      errors.title = "Title is required";
    } else if (movie.title.length > 100) {
      errors.title = "Title must be less than 100 characters";
    }
    
    if (!movie.description || movie.description.trim().length === 0) {
      errors.description = "Description is required";
    } else if (movie.description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    }
    
    if (!movie.rating) {
      errors.rating = "Rating is required";
    } else if (isNaN(movie.rating) || parseFloat(movie.rating) < 0 || parseFloat(movie.rating) > 10) {
      errors.rating = "Rating must be between 0 and 10";
    }
    
    if (!movie.duration) {
      errors.duration = "Duration is required";
    } else if (isNaN(movie.duration) || parseInt(movie.duration) < 1) {
      errors.duration = "Duration must be a positive number";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      setError("Please fix the errors below");
      return;
    }
    
    setLoading(true);
    
    try {
      await api.post("/movies", {
        ...movie,
        rating: parseFloat(movie.rating),
        duration: parseInt(movie.duration)
      });
      
      setShowSuccess(true);
      
      // Reset form
      setMovie({
        title: "",
        description: "",
        rating: "",
        duration: "",
        poster: ""
      });
      setPosterPreview("");
      
      // Navigate to home after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (err) {
      console.error("Add movie error:", err);
      
      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message === "Network Error") {
        setError("Cannot connect to server. Please check your connection.");
      } else {
        setError("Failed to add movie. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setMovie({ ...movie, [field]: value });
    setFieldErrors({ ...fieldErrors, [field]: "" });
    
    // Update poster preview
    if (field === "poster") {
      setPosterPreview(value);
    }
  };

  return (
    <PageContainer maxWidth="md">
      <FormCard elevation={0}>
        <FormHeader>
          <FormIcon>
            <MovieCreationRoundedIcon />
          </FormIcon>
          <FormTitle>Add New Movie</FormTitle>
          <FormSubtitle>Expand your collection with another masterpiece</FormSubtitle>
        </FormHeader>

        {error && (
          <StyledAlert severity="error" onClose={() => setError("")}>
            {error}
          </StyledAlert>
        )}

        <form onSubmit={handleSubmit}>
          <StyledTextField 
            label="Movie Title" 
            fullWidth 
            margin="normal"
            value={movie.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            error={!!fieldErrors.title}
            helperText={fieldErrors.title}
            disabled={loading}
            placeholder="e.g., The Shawshank Redemption"
          />

          <StyledTextField 
            label="Poster URL (optional)" 
            fullWidth 
            margin="normal"
            value={movie.poster}
            onChange={(e) => handleInputChange("poster", e.target.value)}
            disabled={loading}
            placeholder="https://example.com/poster.jpg"
          />

          {posterPreview && (
            <PosterPreview>
              <img 
                src={posterPreview} 
                alt="Poster preview"
                onError={() => setPosterPreview("")}
              />
            </PosterPreview>
          )}

          {!posterPreview && (
            <PosterPreview>
              <PreviewPlaceholder>
                <ImageRoundedIcon />
                <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem" }}>
                  Poster preview will appear here
                </Typography>
              </PreviewPlaceholder>
            </PosterPreview>
          )}

          <StyledTextField 
            label="Description" 
            fullWidth 
            margin="normal"
            multiline
            rows={4}
            value={movie.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            error={!!fieldErrors.description}
            helperText={fieldErrors.description}
            disabled={loading}
            placeholder="Enter a compelling description of the movie..."
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <StyledTextField 
              label="Rating" 
              fullWidth 
              margin="normal"
              type="number"
              value={movie.rating}
              onChange={(e) => handleInputChange("rating", e.target.value)}
              error={!!fieldErrors.rating}
              helperText={fieldErrors.rating || "Rating from 0 to 10"}
              disabled={loading}
              inputProps={{ 
                step: "0.1", 
                min: "0", 
                max: "10" 
              }}
              placeholder="8.5"
            />

            <StyledTextField 
              label="Duration (minutes)" 
              fullWidth 
              margin="normal"
              type="number"
              value={movie.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              error={!!fieldErrors.duration}
              helperText={fieldErrors.duration}
              disabled={loading}
              inputProps={{ min: "1" }}
              placeholder="120"
            />
          </Box>

          <SubmitButton 
            variant="contained" 
            fullWidth 
            type="submit"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <AddCircleOutlineRoundedIcon />}
          >
            {loading ? "Adding Movie..." : "Add Movie to Collection"}
          </SubmitButton>
        </form>
      </FormCard>

      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            background: "rgba(150, 206, 180, 0.2)",
            border: "1px solid rgba(150, 206, 180, 0.4)",
            color: "#fff",
            borderRadius: "12px",
            fontFamily: "'Outfit', sans-serif",
            "& .MuiAlert-icon": {
              color: "#96CEB4",
            },
          }}
          icon={<CheckCircleRoundedIcon />}
        >
          Movie added successfully! Redirecting...
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default AddMovie;