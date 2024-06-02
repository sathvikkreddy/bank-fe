import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../NotFound';
import Goldloan from './Goldloan';
import LoanHome from './LoanHome';
import PersonalLoan from './PersonalLoan';
import Profile from './Profile';
import LoanDetails from './LoanDetails';
import LoanHistory from './LoanHistory';

const Loan = () => {
  return (
    <Routes>
      <Route path="/" element={<LoanHome />} />
      <Route path="/Goldloan" element={<Goldloan />} />
      <Route path="/Personalloan" element={<PersonalLoan />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/LoanDetails/:loanId" element={<LoanDetails />} />
      <Route path="/history" element={<LoanHistory />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Loan;
