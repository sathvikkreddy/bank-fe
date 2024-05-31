import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import MainInsurance from "./Home";
import LifeInsurance from "./Life-Insurance";
import HealthInsurance from "./Health-Insurance";
import VehicleInsurance from "./Vehicle-Insurance";
import { fetchActiveInsurances } from "../../utils/fetchActiveInsurances";
import { fetchAvailableInsurances } from "../../utils/fetchAvailableInsurances";
import InsuranceDetail from "./InsuranceDetail";

const Index = () => {
  const [activeInsurances, setActiveInsurances] = useState([]);
  const [activeLoading, setActiveLoading] = useState(false);
  const [availableInsurances, setAvailableInsurances] = useState([]);
  const [availableLoading, setAvailableLoading] = useState(false);

  useEffect(() => {
    setActiveLoading(true);
    fetchActiveInsurances().then((activeInsurances) => {
      setActiveLoading(false);
      setAvailableLoading(true);
      setActiveInsurances(activeInsurances);
      fetchAvailableInsurances().then((availableInsurances) => {
        setAvailableInsurances(availableInsurances);
        setAvailableLoading(false);
      });
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainInsurance activeInsurances={activeInsurances} availableInsurances={availableInsurances} setActiveInsurances={setActiveInsurances} activeLoading={activeLoading} availableLoading={availableLoading} setActiveLoading={setActiveLoading} />} />
      <Route path="/life" element={<LifeInsurance />} />
      <Route path="/health" element={<HealthInsurance />} />
      <Route path="/vehicle" element={<VehicleInsurance />} />
      <Route path="/:id" element={<InsuranceDetail activeInsurances={activeInsurances} activeLoading={activeLoading} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    // create your own pages by adding new <Route/> by default the path has /yourmodule, just specify page name for path
    // Ex: for life insurance page in insurance add <Route path="/life" element={your component} />
    // do not include full url in path like <Route path="/insurance/life" element={your component} />
  );
};

export default Index;
