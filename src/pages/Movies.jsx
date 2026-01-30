import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import MovieCard from "../components/MovieCard";
import {
  Grid,
  Container,
  TextField,
  MenuItem,
  Pagination,
  Box,
  InputAdornment,
  Fade,
  CircularProgress,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

const PageWrapper = styled(Box)({
  minHeight: "100vh",
  background: "#0a0a0f",
  position: "relative",
  
  "&::before": {
    content: '""',
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(78, 205, 196, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(69, 183, 209, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
});

const PageContainer = styled(Container)({
  position: "relative",
  zIndex: 1,
  paddingTop: "40px",
  paddingBottom: "80px",
});

const HeroSection = styled(Box)({
  textAlign: "center",
  marginBottom: "60px",
  position: "relative",
  padding: "60px 20px",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%)",
    filter: "blur(60px)",
    pointerEvents: "none",
    zIndex: -1,
  },
});

const HeroTitle = styled(Box)({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 900,
  fontSize: "4.5rem",
  background: "linear-gradient(135deg, #ffffff 0%, #FF6B6B 50%, #4ECDC4 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: "20px",
  letterSpacing: "-2px",
  lineHeight: 1.1,
  position: "relative",
  
  "@media (max-width: 960px)": {
    fontSize: "3rem",
  },
  
  "@media (max-width: 600px)": {
    fontSize: "2.2rem",
    letterSpacing: "-1px",
  },
});

const HeroSubtitle = styled(Box)({
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1.3rem",
  color: "rgba(255, 255, 255, 0.6)",
  fontWeight: 300,
  marginBottom: "16px",
  letterSpacing: "1px",
  
  "@media (max-width: 600px)": {
    fontSize: "1rem",
  },
});

const StatsBar = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "32px",
  flexWrap: "wrap",
  marginTop: "32px",
});

const StatItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 24px",
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  borderRadius: "50px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease",
  
  "&:hover": {
    background: "rgba(255, 255, 255, 0.08)",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  },
  
  "& svg": {
    fontSize: "1.5rem",
    color: "#4ECDC4",
  },
});

const StatText = styled(Box)({
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.95rem",
  color: "rgba(255, 255, 255, 0.9)",
  fontWeight: 500,
});

const FilterBar = styled(Box)({
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(30px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
  padding: "32px",
  marginBottom: "48px",
  position: "relative",
  overflow: "hidden",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, transparent, #FF6B6B 30%, #4ECDC4 70%, transparent)",
    opacity: 0.5,
  },
  
  "&:hover": {
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },
});

const FilterHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "24px",
  
  "& svg": {
    fontSize: "1.5rem",
    color: "#4ECDC4",
  },
});

const FilterTitle = styled(Box)({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: "1.2rem",
  color: "#fff",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontFamily: "'Outfit', sans-serif",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
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
  },
  
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "'Outfit', sans-serif",
    
    "&.Mui-focused": {
      color: "#4ECDC4",
    },
  },
  
  "& .MuiInputAdornment-root svg": {
    color: "rgba(255, 255, 255, 0.5)",
  },
  
  "& .MuiSelect-icon": {
    color: "rgba(255, 255, 255, 0.5)",
  },
});

const SearchButton = styled(Button)({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  padding: "14px 32px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
  color: "#fff",
  border: "none",
  transition: "all 0.3s ease",
  
  "&:hover": {
    background: "linear-gradient(135deg, #4ECDC4, #FF6B6B)",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 30px rgba(255, 107, 107, 0.4)",
  },
});

const GridContainer = styled(Box)({
  position: "relative",
});

const SectionTitle = styled(Box)({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: "1.8rem",
  color: "#fff",
  marginBottom: "32px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  
  "&::after": {
    content: '""',
    flex: 1,
    height: "2px",
    background: "linear-gradient(to right, rgba(255, 107, 107, 0.3), transparent)",
  },
});

const StyledPagination = styled(Pagination)({
  display: "flex",
  justifyContent: "center",
  marginTop: "60px",
  
  "& .MuiPaginationItem-root": {
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    minWidth: "40px",
    height: "40px",
    
    "&:hover": {
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.25)",
      transform: "scale(1.1)",
    },
    
    "&.Mui-selected": {
      background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
      color: "#fff",
      border: "none",
      fontWeight: 700,
      boxShadow: "0 8px 24px rgba(255, 107, 107, 0.4)",
      
      "&:hover": {
        background: "linear-gradient(135deg, #4ECDC4, #FF6B6B)",
      },
    },
  },
});

const LoadingContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "500px",
  gap: "24px",
});

const LoadingText = styled(Box)({
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1.2rem",
  color: "rgba(255, 255, 255, 0.6)",
  fontWeight: 400,
});

const EmptyState = styled(Box)({
  textAlign: "center",
  padding: "80px 20px",
  
  "& svg": {
    fontSize: "6rem",
    color: "rgba(255, 255, 255, 0.2)",
    marginBottom: "24px",
  },
});

const EmptyText = styled(Box)({
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1.5rem",
  color: "rgba(255, 255, 255, 0.5)",
  fontWeight: 500,
  marginBottom: "12px",
});

const EmptySubtext = styled(Box)({
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1rem",
  color: "rgba(255, 255, 255, 0.3)",
  fontWeight: 300,
});

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  // ✅ FETCH MOVIES
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/movies?page=${page}&limit=6`);
      setMovies(res.data.movies || []);
      setTotalPages(res.data.totalPages || 5);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // ✅ HANDLE UPDATE
  const handleMovieUpdate = (updatedMovie) => {
    setMovies(movies.map(movie => 
      movie._id === updatedMovie._id ? updatedMovie : movie
    ));
    setNotification({
      open: true,
      message: "Movie updated successfully!",
      severity: "success"
    });
  };

  // ✅ HANDLE DELETE
  const handleMovieDelete = (movieId) => {
    setMovies(movies.filter(movie => movie._id !== movieId));
    setNotification({
      open: true,
      message: "Movie deleted successfully!",
      severity: "success"
    });
    // Refresh the list
    setTimeout(() => {
      fetchMovies();
    }, 500);
  };

  // ✅ SEARCH
  const handleSearch = async () => {
    if (!search) {
      fetchMovies();
      return;
    }
    setLoading(true);
    try {
      const res = await api.get(`/movies/search?q=${search}`);
      setMovies(res.data || []);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SORT
  const handleSort = async (value) => {
    setSort(value);
    setLoading(true);
    try {
      const res = await api.get(`/movies/sorted?by=${value}`);
      setMovies(res.data || []);
    } catch (error) {
      console.error("Error sorting movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <PageContainer maxWidth="xl">
        <HeroSection>
          <HeroTitle>Discover Cinema</HeroTitle>
          <HeroSubtitle>
            Explore our curated collection of cinematic masterpieces
          </HeroSubtitle>
          
          <StatsBar>
            <StatItem>
              <LocalMoviesRoundedIcon />
              <StatText>{movies.length} Movies Available</StatText>
            </StatItem>
          </StatsBar>
        </HeroSection>

        <FilterBar>
          <FilterHeader>
            <TuneRoundedIcon />
            <FilterTitle>Filter & Search</FilterTitle>
          </FilterHeader>
          
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} md={5}>
              <StyledTextField
                label="Search movies"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledTextField
                select
                label="Sort by"
                fullWidth
                value={sort}
                onChange={(e) => handleSort(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SortRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="releaseDate">Release Date</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
              </StyledTextField>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <SearchButton
                fullWidth
                variant="contained"
                onClick={handleSearch}
                startIcon={<SearchRoundedIcon />}
              >
                Search
              </SearchButton>
            </Grid>
          </Grid>
        </FilterBar>

        <GridContainer>
          <SectionTitle>Featured Movies</SectionTitle>
          
          {loading ? (
            <LoadingContainer>
              <CircularProgress 
                size={70} 
                thickness={2}
                sx={{ 
                  color: "#4ECDC4",
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  },
                }} 
              />
              <LoadingText>Loading amazing movies...</LoadingText>
            </LoadingContainer>
          ) : movies.length === 0 ? (
            <EmptyState>
              <LocalMoviesRoundedIcon />
              <EmptyText>No movies found</EmptyText>
              <EmptySubtext>Try adjusting your search or filters</EmptySubtext>
            </EmptyState>
          ) : (
            <Fade in={!loading} timeout={800}>
              <Grid container spacing={4}>
                {movies.map((movie, index) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    lg={3}
                    key={movie._id}
                    sx={{
                      animation: `fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      "@keyframes fadeInUp": {
                        from: {
                          opacity: 0,
                          transform: "translateY(40px)",
                        },
                        to: {
                          opacity: 1,
                          transform: "translateY(0)",
                        },
                      },
                    }}
                  >
                    <MovieCard 
                      movie={movie} 
                      onDelete={handleMovieDelete}
                      onUpdate={handleMovieUpdate}
                    />
                  </Grid>
                ))}
              </Grid>
            </Fade>
          )}
        </GridContainer>

        {!loading && movies.length > 0 && (
          <StyledPagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            size="large"
            color="primary"
          />
        )}
      </PageContainer>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setNotification({ ...notification, open: false })} 
          severity={notification.severity}
          sx={{ 
            background: notification.severity === 'success'
              ? "rgba(78, 205, 196, 0.15)"
              : "rgba(255, 107, 107, 0.15)",
            border: notification.severity === 'success'
              ? "1px solid rgba(78, 205, 196, 0.3)"
              : "1px solid rgba(255, 107, 107, 0.3)",
            color: "#fff",
            borderRadius: "12px",
            fontFamily: "'Outfit', sans-serif",
            "& .MuiAlert-icon": {
              color: notification.severity === 'success' ? "#4ECDC4" : "#FF6B6B",
            },
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
};

export default Movies;