import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, updateUserProfile } from "../../store/reducers/User";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const Form = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const [isProfileDisabled, setIsProfileDisabled] = useState(true);
  const { isAuthenticated, isLoading, user, message, error } = useSelector(
    (state) => state.authReducier
  );

  const handleFormSubmit = (values, actions) => {
    if (isAuthenticated) {
      dispatch(updateUserProfile(values));
      actions.resetForm({ values: initialValues });
      navigate("/account");
    } else {
      toast.error("You must be authenticated to update your profile.");
    }
  };

  const handleInputChange = (values) => {
    const isEmpty = !values.firstName || !values.lastName ;
    setIsProfileDisabled(isEmpty);
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
                email: user?.email || "", // Prepopulate email if available
                firstName: user?.firstName || "", // Prepopulate email if available
                lastName: user?.lastName || "", // Prepopulate email if available


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
                  <Box display="grid" gap="20px">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(values);
                      }}
                      value={values.firstName}
                      name="firstName"
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(values);
                      }}
                      value={values.lastName}
                      name="lastName"
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
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
