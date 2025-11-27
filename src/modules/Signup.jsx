import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupComponent = () => {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  console.log("form ::::", form);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Field changed: ${name}, New value: ${value}`);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    console.log(
      "Submitting form with data:",
      import.meta.env.VITE_API_URL + "/user-route/users",
      form
    );
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/user-route/users",
      form
    );
    console.log("Response ::::", response);
    if (response.status == 200) {
      navigate("/login");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Signup Page
      </Typography>
      <Box>
        <TextField
          name="fullname"
          placeholder="Enter your Fullname"
          value={form.fullname}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
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
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleSignup}>
        Signup
      </Button>
      <Box sx={{ mt: 2 }}>
        <Button
          sx={{ mt: 2 }}
          variant="text"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default SignupComponent;
