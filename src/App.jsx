import { useState } from "react";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoanIndex from "./pages/Loan/Index";
import BillIndex from "./pages/Bill/Index";
import TransactionsIndex from "./pages/Transaction/Index";
import InsuranceIndex from "./pages/Insurance/Index";
import ProfileIndex from "./pages/Profile/Index";
import HomeIndex from "./pages/Home/Index";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Index />}>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/transactions" element={<TransactionsIndex />} />
        <Route path="/insurance" element={<InsuranceIndex />} />
        <Route path="/insurance/personal" element={<div>{"personal insurance"}</div>} />
        <Route path="/bills" element={<BillIndex />} />
        <Route path="/loan" element={<LoanIndex />} />
        <Route path="/profile" element={<ProfileIndex />} />
      </Route>
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/signin" element={<Signin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
