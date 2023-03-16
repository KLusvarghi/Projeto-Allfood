import { TextField, Button, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// importando a instancia do axios
import http from '../../../../http';
import IRestaurante from '../../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
  // estado para capturar o nome do restaurante
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  // pegando acesso a todos os parametros da url "http://localhost:3000/admin/restaurantes/:id" que no caso queremos pegar o id
  const parametros = useParams();

  // como se tem duas maneiras de acessar esse mesmo componente, ou com '/novo' ou com '/2' que seria o id, para cada caso vamos fazer uma requisição HTTP diferente,
  // um sendo o post (enviar), que seria para enviar um novo restaurante e o outro o put (atualizar), para atualizar o nome do restaurante por exemplo
  console.log(parametros.id);

  // caso os parametros mudem, quero que execute novamente
  useEffect(() => {
    // caso parametros.id exista ele executa
    if (parametros.id) {
      // fazendo uma requisição GET do determinado restaurante com seu id
      // e passando o para setNomeRestaurante o nome do restaurante que bate com o id que está como parametro na url

      // ao invés de usar o axios, usamos o 'http' que é o nome da constante que criamos uma instancia de 'axios'
      http
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((response) => setNomeRestaurante(response.data.nome));
    }
  }, [parametros]);

  // função responsavel por fazer um POST a API
  // recebendo o event e passando seu tipo, para que possamos previnir o reload padrão ao submeter um formulário
  const aoSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (parametros.id) {
      // PUT (atualizar dados)
      http
        .put(`restaurantes/${parametros.id}/`, {
          // passando um json com o nome do restaurante
          nome: nomeRestaurante,
        })
        // não é necessário, apenas exibindo um alert
        .then(() => alert('Restaurante atualizado com sucesso!'));
    } else {
      // POST (envia dados)
      http
        .post('restaurantes/', {
          // passando um json com o nome do restaurante
          nome: nomeRestaurante,
        })
        // não é necessário, apenas exibindo um alert
        .then(() => alert('Restaurante cadastrado com sucesso!'));
    }
  };

  // sendo outro component do MUI, sendo um tipo de container
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alingItems: 'center',
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>

      <Box component="form" onSubmit={aoSubmitForm} sx={{ width: '100%' }}>
        <TextField
          value={nomeRestaurante}
          onChange={(e) => setNomeRestaurante(e.target.value)}
          label="Nome do Restaurante"
          variant="standard"
          // ocupandado a largura total
          fullWidth
          required //sendo obrigatório
        />
        <Button
          // sendo o 'sx' um style in line do react
          sx={{ marginTop: 1 }}
          type="submit"
          variant="outlined"
          fullWidth
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
