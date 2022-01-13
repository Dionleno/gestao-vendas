import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";

const PublicRoutes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
