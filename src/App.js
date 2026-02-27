import {  Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import CreateProfile from "./components/Profile";
import CreateLecture from "./components/CreateLecture";

function App() {
  return (
    
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Profile as Separate Full Page */}
        <Route path="/profile" element={<CreateProfile />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create-lecture" element={<CreateLecture />} />

      </Routes>
  );
}

export default App;
