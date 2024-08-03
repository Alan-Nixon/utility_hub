import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ToastContainer } from "react-toast";


function App() {

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
