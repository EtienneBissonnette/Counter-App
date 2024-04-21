import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Counter from "./pages/Counter";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Counter />}></Route>
    </Routes>
  );
}

export default App;
