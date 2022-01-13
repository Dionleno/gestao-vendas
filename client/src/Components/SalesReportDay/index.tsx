import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
interface SalesProps {
  open: boolean;
  handleClose: () => void;
  itens: Array<any>;
}

interface ReportsList {
  money: number;
  debito: number;
  credito: number;
  total: number;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  p: 4,
};

const SalesReportDay = (props: SalesProps) => {
  const [reports, setReports] = useState({
    credito: 0,
    debito: 0,
    money: 0,
    total: 0,
  } as ReportsList);

  useEffect(() => {
    const inputValue = {
      credito: 0,
      debito: 0,
      money: 0,
      total: 0,
    };

    props.itens.map((i) => {
      if (i.type === 1) {
        inputValue.money += i.amount;
      } else if (i.type === 2) {
        inputValue.debito += i.amount;
      } else if (i.type === 3) {
        inputValue.credito += i.amount;
      }
      inputValue.total += i.amount;
    });

    setReports(inputValue);
  }, [props.itens]);

  return (
    <Modal
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Relatório de vendas diária:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <TableRow key={"money"}>
                  <TableCell component="th" scope="row">
                    Dinheiro
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {reports.money.toLocaleString("pt-BR", {
                      currency: "BRL",
                      style: "currency",
                    })}
                  </TableCell>
                </TableRow>
                <TableRow key={"debito"}>
                  <TableCell component="th" scope="row">
                    C. Débito
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {reports.debito.toLocaleString("pt-BR", {
                      currency: "BRL",
                      style: "currency",
                    })}
                  </TableCell>
                </TableRow>
                <TableRow key={"credito"}>
                  <TableCell component="th" scope="row">
                    C. Crédito
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {reports.credito.toLocaleString("pt-BR", {
                      currency: "BRL",
                      style: "currency",
                    })}
                  </TableCell>
                </TableRow>
                <TableRow key={"total"}>
                  <TableCell component="th" scope="row">
                    Total
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {reports.total.toLocaleString("pt-BR", {
                      currency: "BRL",
                      style: "currency",
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Typography>
      </Box>
    </Modal>
  );
};
export default SalesReportDay;
