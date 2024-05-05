import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import { Todo } from './pages/Todo';
import Signup from './pages/Signup';
import { PrivateRoute } from './router/PrivateRoute';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<PrivateRoute><Todo /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
