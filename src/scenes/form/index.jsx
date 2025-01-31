import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  useMediaQuery,
  Avatar,
  IconButton,
} from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, updateUserProfile } from "../../store/reducers/User";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PhotoCamera } from "@mui/icons-material";

const initialValues = {
  Username: "",
  email: "",
  avatar: null,
};

const validationSchema = yup.object().shape({
  Username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const Form = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const [isProfileDisabled, setIsProfileDisabled] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { isAuthenticated, isLoading, user, message, error } = useSelector(
    (state) => state.authReducier
  );

  const handleFormSubmit = (values, actions) => {
    if (isAuthenticated) {
      const formData = new FormData();
      formData.append("Username", values.Username);
      formData.append("email", values.email);
      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }
console.log("formData",formData)
      dispatch(updateUserProfile(formData));
      actions.resetForm({ values: initialValues });
      navigate("/account");
    } else {
      toast.error("You must be authenticated to update your profile.");
    }
  };

  const handleInputChange = (values) => {
    const isEmpty = !values.Username || !values.email;
    setIsProfileDisabled(isEmpty);
  };

  const handleAvatarChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    }
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
          <Box
            width={isNonMobile ? "50%" : "90%"}
            p={4}
            borderRadius="10px"
            boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
          >
            <Header title="Settings" subtitle="Update your settings" />
            <Formik
              initialValues={{
                ...initialValues,
                email: user?.email || "",
                Username: user?.Username || "",
                avatar: user?.avatar?.url || null,
              }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      mb: 3,
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#1976d2",
                    }}
                  >
                    Update Profile
                  </Typography>
                  <Box display="flex" justifyContent="center" mb={3}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="avatar-upload"
                      type="file"
                      onChange={(event) => handleAvatarChange(event, setFieldValue)}
                    />
                    <label htmlFor="avatar-upload">
                      <IconButton color="primary" component="span">
                        <Avatar
                          src={avatarPreview || user?.avatar?.url || null  }
                          sx={{ width: 100, height: 100 }}
                        />
                        <PhotoCamera sx={{ position: "absolute", bottom: 0, right: 0 }} />
                      </IconButton>
                    </label>
                  </Box>
                  <Box display="grid" gap="20px">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Username"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(values);
                      }}
                      value={values.Username}
                      name="Username"
                      error={Boolean(touched.Username && errors.Username)}
                      helperText={touched.Username && errors.Username}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="email"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(values);
                      }}
                      value={values.email}
                      name="email"
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Box>
                  <Box display="flex" justifyContent="center" mt={4}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                      disabled={isProfileDisabled}
                    >
                      Update Profile
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Form;