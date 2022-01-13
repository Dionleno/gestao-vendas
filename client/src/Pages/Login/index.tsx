import { Container, Grid, Paper, TextField, Box, Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../Contexts/Auth/AuthContext";

const Login = () => {
  const { singIn } = useContext(AuthContext);

  return (
    <Container>
      <Grid container>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <TextField
              id="form-user"
              label="Usuário"
              variant="outlined"
              fullWidth
            />
            <Box mt={2} />
            <TextField
              id="form-password"
              label="Senha"
              variant="outlined"
              fullWidth
              type={"password"}
            />
            <Box mt={2} />
            <Button variant="contained" fullWidth onClick={() => singIn()}>
              Login
            </Button>
          </Paper>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </Container>
  );
};

export default Login;
