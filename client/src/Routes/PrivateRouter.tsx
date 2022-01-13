import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sales from "../Pages/Sales";

const PrivateRoutes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sales />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
