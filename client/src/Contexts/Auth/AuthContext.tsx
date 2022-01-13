import React, { createContext, useState } from "react";
import AxiosInstance from "../../Api/axiosInstance";
interface AuthContextData {
  signed: boolean;
  user: object | null;
  singIn(): Promise<void>;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  const singIn = async () => {
    setUser({
      name: "Dionleno",
    });
  };
  AxiosInstance();
  return (
    <AuthContext.Provider value={{ signed: true, user, singIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
