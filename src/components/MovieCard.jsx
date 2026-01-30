import { Card, CardContent, Typography, Box, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

const StyledCard = styled(Card)({
  height: "520px",
  width: "100%",
  background: "rgba(20, 20, 25, 0.8)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)",
    opacity: 0,
    transition: "opacity 0.4s ease",
    zIndex: 1,
  },
  
  "&:hover": {
    transform: "translateY(-6px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(78, 205, 196, 0.15)",
    
    "&::before": {
      opacity: 1,
    },
    
    "& .poster-overlay": {
      opacity: 1,
    },
    
    "& .play-button": {
      opacity: 1,
      transform: "translate(-50%, -50%) scale(1)",
    },
    
    "& .action-buttons": {
      opacity: 1,
    },
    
    "& .movie-poster, & .gradient-poster": {
      transform: "scale(1.05)",
    },
  },
});

const PosterContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "320px",
  overflow: "hidden",
  borderRadius: "16px 16px 0 0",
  flexShrink: 0,
  background: "#1a1a20",
});

const MoviePoster = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
});

const GradientPoster = styled(Box)(({ gradient }) => ({
  width: "100%",
  height: "100%",
  background: gradient,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
  },
}));

const PosterLetter = styled(Typography)({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 900,
  fontSize: "8rem",
  color: "rgba(255, 255, 255, 0.25)",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "8px",
  zIndex: 1,
  lineHeight: 1,
  userSelect: "none",
});

const PosterOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(20, 20, 25, 0.9) 0%, rgba(20, 20, 25, 0.3) 50%, transparent 80%)",
  opacity: 0,
  transition: "opacity 0.4s ease",
  zIndex: 2,
});

const PlayButton = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) scale(0.8)",
  opacity: 0,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  zIndex: 3,
  pointerEvents: "none",
  
  "& svg": {
    fontSize: "4rem",
    color: "#fff",
    filter: "drop-shadow(0 0 20px rgba(78, 205, 196, 0.8))",
  },
});

const ActionButtons = styled(Box)({
  position: "absolute",
  top: "14px",
  left: "14px",
  display: "flex",
  gap: "8px",
  opacity: 0,
  transition: "all 0.3s ease",
  zIndex: 4,
});

const ActionButton = styled(IconButton)(({ color }) => ({
  background: color === 'edit' 
    ? "rgba(78, 205, 196, 0.9)" 
    : "rgba(255, 107, 107, 0.9)",
  backdropFilter: "blur(10px)",
  color: "#fff",
  width: "36px",
  height: "36px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.3s ease",
  
  "&:hover": {
    background: color === 'edit'
      ? "rgba(78, 205, 196, 1)"
      : "rgba(255, 50, 50, 1)",
    transform: "scale(1.1)",
    boxShadow: color === 'edit'
      ? "0 4px 20px rgba(78, 205, 196, 0.6)"
      : "0 4px 20px rgba(255, 107, 107, 0.6)",
  },
  
  "& svg": {
    fontSize: "1.1rem",
  },
}));

const RatingBadge = styled(Box)({
  position: "absolute",
  top: "14px",
  right: "14px",
  background: "rgba(20, 20, 25, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "8px",
  padding: "5px 10px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  border: "1px solid rgba(255, 215, 0, 0.3)",
  zIndex: 3,
  
  "& svg": {
    fontSize: "1rem",
    color: "#FFD700",
  },
});

const RatingText = styled(Typography)({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: "0.9rem",
  color: "#FFD700",
  lineHeight: 1,
});

const ContentArea = styled(CardContent)({
  padding: "18px",
  height: "200px",
  position: "relative",
  zIndex: 2,
  background: "rgba(20, 20, 25, 0.9)",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
});

const MovieTitle = styled(Typography)({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: "1.25rem",
  color: "#fff",
  marginBottom: "8px",
  lineHeight: 1.3,
  height: "3.25rem",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

const MovieDescription = styled(Typography)({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.6)",
  fontSize: "0.85rem",
  lineHeight: 1.5,
  height: "3.825rem",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  marginBottom: "12px",
});

const MetaInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "auto",
  paddingTop: "12px",
  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
});

const MetaChip = styled(Chip)({
  background: "rgba(78, 205, 196, 0.1)",
  border: "1px solid rgba(78, 205, 196, 0.2)",
  color: "rgba(255, 255, 255, 0.8)",
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 500,
  fontSize: "0.75rem",
  height: "26px",
  
  "& .MuiChip-icon": {
    color: "#4ECDC4",
    fontSize: "0.9rem",
    marginLeft: "4px",
  },
  
  "& .MuiChip-label": {
    padding: "0 8px",
  },
});

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    background: "rgba(20, 20, 25, 0.98)",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6)",
    maxWidth: "550px",
    width: "100%",
  },
});

const DialogHeader = styled(DialogTitle)({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  paddingBottom: "8px",
  
  "& svg": {
    fontSize: "2rem",
  },
});

const DialogText = styled(DialogContent)({
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1rem",
  color: "rgba(255, 255, 255, 0.7)",
  lineHeight: 1.6,
});

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  
  "& .MuiOutlinedInput-root": {
    fontFamily: "'Outfit', sans-serif",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    color: "#fff",
    
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.15)",
    },
    
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.25)",
    },
    
    "&.Mui-focused fieldset": {
      borderColor: "#4ECDC4",
      borderWidth: "2px",
    },
  },
  
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "'Outfit', sans-serif",
    
    "&.Mui-focused": {
      color: "#4ECDC4",
    },
  },
});

const DialogButtonContainer = styled(DialogActions)({
  padding: "16px 24px",
  gap: "12px",
});

const CancelButton = styled(Button)({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  padding: "10px 24px",
  borderRadius: "10px",
  color: "rgba(255, 255, 255, 0.8)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  
  "&:hover": {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
});

const ConfirmButton = styled(Button)(({ variant }) => ({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: "1rem",
  textTransform: "none",
  padding: "10px 24px",
  borderRadius: "10px",
  background: variant === 'delete'
    ? "linear-gradient(135deg, #FF6B6B, #FF4757)"
    : "linear-gradient(135deg, #4ECDC4, #45B7D1)",
  color: "#fff",
  
  "&:hover": {
    background: variant === 'delete'
      ? "linear-gradient(135deg, #FF4757, #FF3838)"
      : "linear-gradient(135deg, #45B7D1, #4ECDC4)",
    boxShadow: variant === 'delete'
      ? "0 8px 24px rgba(255, 107, 107, 0.4)"
      : "0 8px 24px rgba(78, 205, 196, 0.4)",
  },
}));

const gradientSchemes = [
  ['#667eea', '#764ba2'], ['#f093fb', '#f5576c'], ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'], ['#fa709a', '#fee140'], ['#30cfd0', '#330867'],
  ['#ff9a9e', '#fecfef'], ['#ffecd2', '#fcb69f'], ['#a1c4fd', '#c2e9fb'],
  ['#d299c2', '#fef9d7'], ['#e0c3fc', '#8ec5fc'], ['#f8b500', '#fceabb'],
];

const generatePosterGradient = (title) => {
  if (!title) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  const index = title.charCodeAt(0) % gradientSchemes.length;
  const [color1, color2] = gradientSchemes[index];
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};

const MovieCard = ({ movie, onDelete, onUpdate }) => {
  const { isAdmin } = useContext(AuthContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    title: movie.title || "",
    description: movie.description || "",
    rating: movie.rating || "",
    duration: movie.duration || "",
    poster: movie.poster || "",
  });
  
  const posterUrl = movie.poster || movie.image || null;
  const gradient = generatePosterGradient(movie.title);
  const firstLetter = movie.title?.charAt(0)?.toUpperCase() || "?";

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditForm({
      title: movie.title || "",
      description: movie.description || "",
      rating: movie.rating || "",
      duration: movie.duration || "",
      poster: movie.poster || "",
    });
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  };

  const handleConfirmEdit = async () => {
    setSaving(true);
    try {
      const res = await api.put(`/movies/${movie._id}`, {
        ...editForm,
        rating: parseFloat(editForm.rating),
        duration: parseInt(editForm.duration),
      });
      setOpenEditDialog(false);
      if (onUpdate) {
        onUpdate(res.data);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update movie. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/movies/${movie._id}`);
      setOpenDeleteDialog(false);
      if (onDelete) {
        onDelete(movie._id);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Failed to delete movie. Please try again.");
    } finally {
      setDeleting(false);
    }
  };
  
  return (
    <>
      <StyledCard>
        <PosterContainer>
          {posterUrl ? (
            <MoviePoster 
              className="movie-poster"
              src={posterUrl}
              alt={`${movie.title} poster`}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <GradientPoster className="gradient-poster" gradient={gradient}>
              <PosterLetter>{firstLetter}</PosterLetter>
            </GradientPoster>
          )}
          
          <PosterOverlay className="poster-overlay" />
          
          <PlayButton className="play-button">
            <PlayCircleFilledRoundedIcon />
          </PlayButton>
          
          {isAdmin && isAdmin() && (
            <ActionButtons className="action-buttons">
              <ActionButton 
                color="edit"
                onClick={handleEditClick}
                aria-label="Edit movie"
              >
                <EditRoundedIcon />
              </ActionButton>
              <ActionButton 
                color="delete"
                onClick={handleDeleteClick}
                aria-label="Delete movie"
              >
                <DeleteRoundedIcon />
              </ActionButton>
            </ActionButtons>
          )}
          
          <RatingBadge>
            <StarRoundedIcon />
            <RatingText>
              {movie.rating ? Number(movie.rating).toFixed(1) : "N/A"}
            </RatingText>
          </RatingBadge>
        </PosterContainer>
        
        <ContentArea>
          <MovieTitle>{movie.title || "Untitled"}</MovieTitle>
          <MovieDescription>
            {movie.description || "No description available."}
          </MovieDescription>
          <MetaInfo>
            <MetaChip
              icon={<AccessTimeRoundedIcon />}
              label={`${movie.duration || 0} min`}
              size="small"
            />
            {movie.releaseDate && (
              <MetaChip
                icon={<CalendarTodayRoundedIcon />}
                label={new Date(movie.releaseDate).getFullYear()}
                size="small"
              />
            )}
          </MetaInfo>
        </ContentArea>
      </StyledCard>

      {/* Edit Dialog */}
      <StyledDialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogHeader>
          <EditRoundedIcon sx={{ color: "#4ECDC4" }} />
          Edit Movie
        </DialogHeader>
        <DialogContent>
          <StyledTextField
            label="Title"
            fullWidth
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          />
          <StyledTextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
          />
          <StyledTextField
            label="Poster URL"
            fullWidth
            value={editForm.poster}
            onChange={(e) => setEditForm({ ...editForm, poster: e.target.value })}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <StyledTextField
              label="Rating (0-10)"
              type="number"
              value={editForm.rating}
              onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
              inputProps={{ step: "0.1", min: "0", max: "10" }}
              sx={{ flex: 1 }}
            />
            <StyledTextField
              label="Duration (min)"
              type="number"
              value={editForm.duration}
              onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
              inputProps={{ min: "1" }}
              sx={{ flex: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogButtonContainer>
          <CancelButton onClick={() => setOpenEditDialog(false)} disabled={saving}>
            Cancel
          </CancelButton>
          <ConfirmButton variant="save" onClick={handleConfirmEdit} disabled={saving} startIcon={<SaveRoundedIcon />}>
            {saving ? "Saving..." : "Save Changes"}
          </ConfirmButton>
        </DialogButtonContainer>
      </StyledDialog>

      {/* Delete Dialog */}
      <StyledDialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogHeader>
          <WarningRoundedIcon sx={{ color: "#FF6B6B" }} />
          Delete Movie?
        </DialogHeader>
        <DialogContent>
          Are you sure you want to delete <strong>"{movie.title}"</strong>? This action cannot be undone.
        </DialogContent>
        <DialogButtonContainer>
          <CancelButton onClick={() => setOpenDeleteDialog(false)} disabled={deleting}>
            Cancel
          </CancelButton>
          <ConfirmButton variant="delete" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </ConfirmButton>
        </DialogButtonContainer>
      </StyledDialog>
    </>
  );
};

export default MovieCard;