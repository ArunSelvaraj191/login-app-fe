import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const LoginComponent = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Field changed: ${name}, New value: ${value}`);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      console.log("Submitting form with data:", form);
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        form
      );

      console.log("Login response ::::", response);
      if (response.status == 200) {
        localStorage.setItem("token", response?.data?.token);
        // navigate("/dashboard", {
        //   state: { userData: response.data.user },
        // });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("error login :::", error);
      toast(error?.response?.data?.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Login Page
      </Typography>
      <Box>
        <TextField
          name="username"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          name="password"
          placeholder="Enter your password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </Box>
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <Box sx={{ mt: 2 }}>
        <Button
          sx={{ mt: 2 }}
          variant="text"
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>
      </Box>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default LoginComponent;
