import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../store/reducers/User";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  // Media query for responsive design
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Redux state
  const { isLoading, user, message, error } = useSelector(
    (state) => state.authReducier
  );

  const handleChangeMode = () => {
    navigate("/"); // Navigate to the root page
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearMessage());
    }
  }, [message, error, dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
          p={3}
        >
          <Paper
            elevation={6}
            sx={{
              width: isNonMobile ? "50%" : "90%",
              padding: 4,
              borderRadius: "12px",
              backgroundColor: "transparent",
            }}
          >
            <Stack direction="column" alignItems="center" spacing={2}>
              <Avatar
                src={user?.avatar?.url || "/default-avatar.png"}
                alt={user?.name || "User Avatar"}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  border: "2px solid #1976d2",
                }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                {user?.firstName  || "User Name"}{user?.lastName  || "User Name"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                {user?.email || "user@example.com"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Joined On: {user?.createdAt?.substr(0, 10) || "N/A"}
              </Typography>
              <Box mt={3} width="100%">
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Link
                    to="/form"
                    style={{
                      color: "#fff",
                      backgroundColor: "#1976d2",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      textAlign: "center",
                      fontWeight: "bold",
                      flex: 1,
                      textDecoration: "none",
                    }}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/UpdatePassword"
                    style={{
                      color: "#fff",
                      backgroundColor: "#f44336",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      textAlign: "center",
                      fontWeight: "bold",
                      flex: 1,
                      textDecoration: "none",
                    }}
                  >
                    Change Password
                  </Link>
                </Stack>
                <Button
                  onClick={handleChangeMode}
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                >
                  View Dashboard
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default UserProfile;
