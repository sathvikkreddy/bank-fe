import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import BillType from "./BillType";

const Bills = () => {
  return (
    <Routes>
      <Route path="/" element={<BillType/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    // create your own pages by adding new <Route/> by default the path has /yourmodule, just specify page name for path
    // Ex: for life insurance page in insurance add <Route path="/life" element={your component} />
    // do not include full url in path like <Route path="/insurance/life" element={your component} />
  );
};

export default Bills;
