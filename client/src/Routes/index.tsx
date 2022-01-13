import { useContext } from "react";
import AuthContext from "../Contexts/Auth/AuthContext";
import PrivateRoutes from "./PrivateRouter";
import PublicRoutes from "./PublicRouter";

const Routes = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
