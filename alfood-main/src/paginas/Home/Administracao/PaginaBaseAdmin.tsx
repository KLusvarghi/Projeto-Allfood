import {
  Button,
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  Paper,
} from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';

const PaginaBaseAdmin = () => {
  // sendo outro component do MUI, sendo um tipo de container
  return (
    <>
      {/* sendo um nav do componente MUI */}
      {/* para que ele  fique estárico no topo da tela */}
      <AppBar position="static">
        {/* o maxWidth é para que ele comporte telas frnades e segurando a barra de navegação lá em cima */}
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            {/* e essa box irá servir para preencher o restante da largura diponivel na tela*/}
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {/* sendo o "my" uma margin vertical, eixo 'y' */}
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: 'white' }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Restaurante
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos">
                <Button sx={{ my: 2, color: 'white' }}>
                  Pratos
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/novo">
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Prato
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        {/* sendo o tipo "lg" fica mais contigo e não pegando a tela toda */}
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          {/* sendo 'p' um padding */}
          <Paper sx={{ p: 2 }}>
            <Outlet />
            {/* Dizendo ao react aonde ele irá renderizar as rotas filhas */}
            {/* aqui vai o conteudo */}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PaginaBaseAdmin;
