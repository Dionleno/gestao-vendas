 
import axios from "axios";
import { ValidateResponse } from "../apiResponse";

export const getSalesApi = async () => {
  return ValidateResponse(() =>
    axios.get(`sales`).catch(
      (error: any) => error.response
    )
  );
};

export const postCreateSalesApi = async (body: any) => {
  return ValidateResponse(() =>
    axios.post(`sales`, body).catch(
      (error: any) => error.response
    )
  );
};

export const deleteSalesApi = async (saleId: string) => {
  return ValidateResponse(() =>
    axios.delete(`sales/${saleId}`).catch(
      (error: any) => error.response
    )
  );
};
