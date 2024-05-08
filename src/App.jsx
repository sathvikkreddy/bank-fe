import { useState } from "react";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route exact path="*" element={<Index />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
