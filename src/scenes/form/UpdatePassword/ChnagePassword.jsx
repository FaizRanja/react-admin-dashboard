import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { Header } from "../../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, updatePassword, updateUserProfile } from "../../../store/reducers/User";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Initial form values
const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

// Validation Schema
const validationSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
const navigate=useNavigate()

  // State to manage button disabled state
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Redux state
  const { isAuthenticated, isLoading, message, error } = useSelector(
    (state) => state.authReducier // Fixed typo in reducer name
  );

  const handleFormSubmit = (values, actions) => {
    if (isAuthenticated) {
      dispatch(updatePassword(values));
      actions.resetForm({ values: initialValues });
      navigate("/account")
    } else {
      toast.error("You must be authenticated to update your password.");
    }
  };

  const handleInputChange = (values) => {
    const isEmpty =
      !values.oldPassword || !values.newPassword || !values.confirmPassword;
    setIsButtonDisabled(isEmpty);
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
            // bgcolor="#ffffff"
          >
            <Header title="Change Password" subtitle="Secure your account" />
            <Formik
              initialValues={initialValues}
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
              }) => {
                handleInputChange(values);
                return (
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
                      Update Password
                    </Typography>
                    <Box display="grid" gap="20px">
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="password"
                        label="Old Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.oldPassword}
                        name="oldPassword"
                        error={Boolean(touched.oldPassword && errors.oldPassword)}
                        helperText={touched.oldPassword && errors.oldPassword}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="password"
                        label="New Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.newPassword}
                        name="newPassword"
                        error={Boolean(touched.newPassword && errors.newPassword)}
                        helperText={touched.newPassword && errors.newPassword}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="password"
                        label="Confirm Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.confirmPassword}
                        name="confirmPassword"
                        error={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                      />
                    </Box>
                    <Box display="flex" justifyContent="center" mt={4}>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="large"
                        disabled={isButtonDisabled}
                      >
                        Update Password
                      </Button>
                    </Box>
                  </form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChangePassword;
