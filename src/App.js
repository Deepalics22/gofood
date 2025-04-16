import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css'; // For default bootstrap CSS
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'; // For bootstrap dark theme
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For bootstrap JS (includes Popper)

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
