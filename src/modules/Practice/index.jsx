import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utility/axiosConfig";

const DashboardLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const fullName = location?.state?.userData?.fullname;
  const [user, setUser] = useState(null);
  console.log("user :::", user);
  const handleLogout = () => {
    navigate("/");
  };
  useEffect(() => {
    api
      .get("/protected-dashboard")
      .then((response) => {
        console.log("Response of dashboard :::", response);
        if (response.status == 200) {
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        console.log("Dashboard api error :::", error);
      });
  }, []);
  return (
    <div>
      <div>Welcome to {user?.fullname}</div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        sx={{ mt: 2, mb: 2 }}
        variant="contained"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
      <Button
        sx={{ mt: 2, mb: 2 }}
        variant="contained"
        onClick={() => navigate("/user-list")}
      >
        Go to User List
      </Button>
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        onClick={() => navigate("/name-input")}
      >
        Go to Input
      </Button>
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        onClick={() => navigate("/practice")}
      >
        Go to Practice
      </Button>
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        onClick={() => navigate("/couter-app")}
      >
        Go to Counter
      </Button>
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        onClick={() => navigate("/todo")}
      >
        Todo
      </Button>
    </div>
  );
};

const Practice = ({ count, setCount }) => {
  return (
    <div>
      Practice file
      <button onClick={() => setCount((count) => count - 1)}>
        Dec - count is {count}
      </button>
    </div>
  );
};

const NameInput = () => {
  const [name, setName] = useState("");
  console.log("state of name:", name);
  const handleChange = (event) => {
    console.log("event.target:", event.target.name, event.target.value);
    setName(event.target.value);
  };
  return (
    <>
      <input
        name="fullName"
        type="text"
        placeholder="Enter your name"
        onChange={handleChange}
        value={name}
      />
      <p>Hello {name}</p>
    </>
  );
};

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  console.log("UserList - loading:", userData);
  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => {
  //       console.log("User list response:", response.data);
  //       if (response.data) {
  //         setUserData(response.data);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.log("Error fetching user list:", error);
  //     });
  // }, []);

  useEffect(() => {
    console.log(
      "BE URL :::",
      import.meta.env.VITE_API_URL + "/user-route/users"
    );
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "/user-route/users")
      .then((response) => {
        console.log("response :::", response);
        if (response.status == 200) {
          setUserData(response.data.users);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error :::", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* {loading ? "Loading user list..." : "User list loaded."} */}
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {userData.length > 0 ? (
        <ul>
          {userData.map((user, index) => {
            return (
              <div key={index}>
                {/* <div>Name : {user.name}</div> */}
                <div>User Name : {user.username}</div>
                {/* <div>Email : {user.email}</div> */}
              </div>
            );
          })}
        </ul>
      ) : (
        "No User Records Found"
      )}
    </div>
  );
};

const CounterApp = () => {
  const [count, setCount] = useState(0);

  console.log("count:", count);
  return (
    <div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Inc - count is {count}
        </button>
        <Practice count={count} setCount={setCount} />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export { CounterApp, Dashboard, DashboardLogin, NameInput, Practice, UserList };
