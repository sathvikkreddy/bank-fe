import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import MainInsurance from "./insurance";
import LifeInsurance from "./Life-Insurance";
import HealthInsurance from "./Health-Insurance"
import VehicleInsurance from "./Vehicle-Insurance";
import CollisionPlanForm from "./CollisionInsurance";
import ComprehensivePlanForm from "./ComprehensiveInsurance";
import LiabilityPlanForm from "./LiabilityInsurance";


const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<MainInsurance/>} />
      <Route path="/life" element={<LifeInsurance/>} />
      <Route path="health/" element={<HealthInsurance/>} />
      <Route path="/vehicle" element={<VehicleInsurance/>} />
      <Route path="/LiabilityInsurance" element={<LiabilityPlanForm/>}/>
      <Route path="/ComprehensiveInsurance" element={<ComprehensivePlanForm/>}/>
      <Route path="/CollisionInsurance" element={<CollisionPlanForm/>}/>

      <Route path="*" element={<NotFound />} />
    </Routes>
    // create your own pages by adding new <Route/> by default the path has /yourmodule, just specify page name for path
    // Ex: for life insurance page in insurance add <Route path="/life" element={your component} />
    // do not include full url in path like <Route path="/insurance/life" element={your component} />
  );
};

export default Index;