import {
  Container,
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteSalesApi,
  getSalesApi,
  postCreateSalesApi,
} from "../../Api/enpoints/ApiSales";
import SalesReportDay from "../../Components/SalesReportDay";
import {
  StyledTableCell,
  StyledTableRow,
  WhiteSelect,
  WhiteTextField,
} from "./style";
import logo from "../../logo.png";
type Inputs = {
  amount: Number;
  type: Number;
};

interface SalesInfo {
  _id: string;
  amount: Number;
  createAt: String;
  type: Number;
  description: string;
}

interface Column {
  id: "amount" | "createAt" | "type" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  {
    id: "amount",
    label: "Valor",
    minWidth: 170,
    format: (value: number) =>
      value.toLocaleString("pt-BR", {
        currency: "BRL",
        style: "currency",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  {
    id: "createAt",
    label: "Data",
    minWidth: 100,
    format: (value: any) =>
      new Date(value).toLocaleString("pt-BR", { timeZone: "UTC" }),
  },
  {
    id: "type",
    label: "Tipo de pagamento",
    minWidth: 170,
    format: (value: number) => {
      switch (value) {
        case 1:
          return "Dinheiro";
        case 2:
          return "C. Débito";
        case 3:
          return "C. Crédito";
        default:
          return "Dinheiro";
      }
    },
  },
  {
    id: "action",
    label: "Remover",
    align: "right",
    minWidth: 100,
  },
];
const customFormat = (value: any) => {
  let sanitizedValue = value.replace(/[^0-9]/, "");
  const decimalCount = 2;

  if (sanitizedValue[0] === "0") {
    sanitizedValue = sanitizedValue.substring(1);
  }

  if (sanitizedValue.length <= decimalCount) {
    return `0,${sanitizedValue.slice(sanitizedValue.length - decimalCount)}`;
  }

  const formattedData =
    sanitizedValue.slice(0, sanitizedValue.length - decimalCount) +
    "," +
    sanitizedValue.slice(sanitizedValue.length - decimalCount);

  return formattedData;
};

const Sales = () => {
  const [paymentType, setPaymentType] = useState<Number>(1);
  const [sales, setSales] = useState<SalesInfo[]>([] as SalesInfo[]);
  const { register, handleSubmit, reset } = useForm();
  const [displayValue, setDisplayValue] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handlerSales = async (data: Inputs) => {
    if (Number(data.amount.toString().replace(",", ".")) < 0.01) {
      alert("Preencha um valor maior que zero!");
      return;
    }

    const response = await postCreateSalesApi({
      amount: data.amount.toString().replace(",", "."),
      createAt: new Date().toISOString(),
      description: "",
      type: data.type || 1,
    });

    setSales([
      {
        _id: response._id,
        amount: Number(data.amount.toString().replace(",", ".")),
        createAt: new Date().toISOString(),
        description: "",
        type: data.type || 1,
      },
      ...sales,
    ]);
    setDisplayValue("");
    setPaymentType(1);

    reset();
  };

  const handlerCurrency = (value: any) => {
    setDisplayValue(customFormat(value));
  };
  const handlerDeleteSales = async (saleId: string) => {
    await deleteSalesApi(saleId);
    setSales([...sales.filter((s) => s._id !== saleId)]);
  };

  useEffect(() => {
    async function getListSales() {
      const response = await getSalesApi();
      setSales([...response]);
    }

    getListSales();
  }, []);

  const handleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <Box
        style={{ background: "#0055a5", padding: 20, margin: 0, color: "#FFF" }}
      >
        <Container maxWidth="lg">
          <SalesReportDay
            open={openModal}
            handleClose={() => handleModal()}
            itens={sales}
          />

          <Grid container spacing={0} style={{ margin: "10px 0" }}>
            <Grid item xs={6}>
              <img src={logo} width="80" />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={() => handleModal()}
                size="small"
                style={{ float: "right" }}
              >
                Relatório
              </Button>
            </Grid>
          </Grid>

          <form onSubmit={handleSubmit(handlerSales)}>
            <Grid container spacing={3}>
              <Grid item md={5}>
                <InputLabel style={{ color: "#FFF" }}>
                  Valor da venda
                </InputLabel>
                <WhiteTextField
                  variant="outlined"
                  inputRef={register}
                  name="amount"
                  autoFocus
                  fullWidth
                  placeholder="Valor da venda"
                  color="secondary"
                  value={displayValue}
                  onChange={(event) => {
                    register({ name: "amount", value: event.target.value });
                    handlerCurrency(event.target.value);
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel style={{ color: "#FFF" }}>
                  Tipo de pagamento
                </InputLabel>
                <FormControl fullWidth>
                  <WhiteSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={paymentType}
                    label="Tipo de pagamento"
                    inputProps={{
                      name: "type",
                      id: "uncontrolled-native",
                    }}
                    onChange={(e: any) => {
                      register({ name: "type", value: e.target.value });
                      setPaymentType(e.target.value);
                    }}
                  >
                    <MenuItem value={1} selected>
                      Dinheiro
                    </MenuItem>
                    <MenuItem value={2}>C. Débito</MenuItem>
                    <MenuItem value={3}>C. Crédito</MenuItem>
                  </WhiteSelect>
                </FormControl>
              </Grid>
              <Grid item md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  type={"submit"}
                  size="large"
                  style={{ marginTop: 30 }}
                >
                  Adicionar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Box mt={2} />

        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((row) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                  >
                    {columns.map((column) => {
                      if (column.id === "action") {
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            <label htmlFor="icon-button-file">
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                onClick={() => handlerDeleteSales(row["_id"])}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </label>
                          </StyledTableCell>
                        );
                      }

                      const value = row[column.id];
                      if (column.id === "createAt") {
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {new Date(value.toString()).toLocaleString("pt-BR")}
                          </StyledTableCell>
                        );
                      }

                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Sales;
