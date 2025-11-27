import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginComponent from "./modules/Login";
import {
  CounterApp,
  Dashboard,
  DashboardLogin,
  NameInput,
  Practice,
  UserList,
} from "./modules/Practice";
import SignupComponent from "./modules/Signup";
import Todo from "./modules/Todo";
function App() {
  // useEffect(() => {
  //   console.log("Component did mount");
  // }, []); // component did mount
  // useEffect(() => {
  //   console.log("Component did update - count changed to:", count);
  // }, [count]); // component will update when count changes
  // useEffect(() => {
  //   return () => {
  //     console.log("Component will unmount");
  //   };
  // }, []); // component will unmount

  return (
    <BrowserRouter>
      {/* <UserList />
      <NameInput />
      <Practice />
      <CounterApp /> */}
      <Routes>
        <Route path="/dashboard" element={<DashboardLogin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/name-input" element={<NameInput />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/couter-app" element={<CounterApp />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
