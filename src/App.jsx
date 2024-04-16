import { useState } from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="*" element={<Index />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
