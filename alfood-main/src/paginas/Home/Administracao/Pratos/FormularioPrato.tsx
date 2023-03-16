import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// importando a instancia do axios
import http from '../../../../http';
import IPrato from '../../../../interfaces/IPrato';
import IRestaurante from '../../../../interfaces/IRestaurante';
import ITag from '../../../../interfaces/ITag';

const FormularioPrato = () => {
  // estado para capturar o nome do restaurante
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');

  // sendo as tags um array de ITag, que começa com um array vazio
  const [tags, setTags] = useState<ITag[]>([]);
  // sendo esse estado para o select, tendo o valor de string
  const [tag, setTag] = useState('');

  const [imagem, setImagem] = useState<File | null>(null);

  // sendo o estado que irá carregar os restaurantes
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  // sendo a mesma coisa que o estado 'tag' apenas para exibir no select
  const [restaurante, setRestaurante] = useState('');

  // para que não de erro ao setar o valor de "setImagem" passando a imagem que o usuário passar ou não passar, verificamos nessa contate se o valor existe priemiro
  const selecioanrArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    // caso o length seja maior que 0, quer dizer que existe um arquivo
    // ai sim nos setamos o valor de 'setImagem'
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  // pegando acesso a todos os parametros da url "http://localhost:3000/admin/pratos/:id" que no caso queremos pegar o id
  let parametros = useParams();

  // como se tem duas maneiras de acessar esse mesmo componente, ou com '/novo' ou com '/2' que seria o id, para cada caso vamos fazer uma requisição HTTP diferente,
  // um sendo o post (enviar), que seria para enviar um novo prato e o outro o put (atualizar), para atualizar o nome do prato por exemplo
  console.log(parametros.id);

  // Se a gente observear lá na API "/v2/tags/", podemos ver que só tem o método GET, que é para apenas essa ocasição, para ao o adm adiconar uma novo prato, ele tenha uma lista limitada de tags para selecionar
  // e teremos que ao component montar, ele acessar e extrair essas tags da Api
  useEffect(() => {
    http
      .get<{ tags: ITag[] }>('tags/')
      .then((response) => setTags(response.data.tags));
    http
      .get<IRestaurante[]>('restaurantes/')
      // colocando apenas 'response.data' por que for reparar na API, podemos ver que ele já retorna a array de objetos
      .then((response) => setRestaurantes(response.data));
  }, []);

  // caso os parametros mudem, quero que execute novamente
  useEffect(() => {
    // caso parametros.id exista ele executa
    if (parametros.id) {
      // fazendo uma requisição GET do determinado prato com seu id
      // e passando o para setNomePrato o nome do prato que bate com o id que está como parametro na url

      // ao invés de usar o axios, usamos o 'http' que é o nome da constante que criamos uma instancia de 'axios'
      http.get<IPrato>(`pratos/${parametros.id}/`).then((response) => {
        console.log(response);
        setNomePrato(response.data.nome);
        setDescricao(response.data.descricao);
        setTag(response.data.tag);
      });
    }
  }, [parametros]);

  // função responsavel por fazer um POST a API
  // recebendo o event e passando seu tipo, para que possamos previnir o reload padrão ao submeter um formulário
  // Porem, nossa Api recebe um arquivi binário

  const aoSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // enviando uma classe chamada formData, podendo adinar nele o que precisamos e inclusive o arquivo
    // como o 'FormData' é uma classe javascript, não precisamos importar ela
    const formData = new FormData();

    // usando o método 'append' para adicionar
    // sendo do lado esquerdo o nome do campo e em seguida o valor
    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);
    // e caso exista o data, ele manda o arquivo
    if (imagem) formData.append('imagem', imagem);

    // caso o parametro exista, quer dizer que é para editar o prato
    if (parametros.id) {
      http
        .put(`pratos/${parametros.id}/`, {
          // passando um json com o nome do restaurante
          nome: nomePrato,
          tag: tag,
          descricao: descricao,
          restaurante: parametros.id
        })
        // não é necessário, apenas exibindo um alert
        .then(() => alert('Prato atualizado com sucesso!'));
    }else {

      
      // Neste caso iremos ter que ter um cabeçalho diferente, tendo que indicar o que estamos enviando para o backend
    // então vamos utilizar o 'request'
    // abrindo um objeto e colocando as propriedades, sendo a primeira a url, em seguida o método, depois o cabeçalho
    http
      .request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          // para esse tipo especifico o 'content-type' é o 'multipart/form-data' e não um json
          'Content-Type': 'multipart/form-data',
        },
        // e passando o formData em sim, que chama 'data
        data: formData,
      })
      // me retornando um promessa como todos os outros métodos http, assim tendo o 'then'
      .then(() => {
        // limpando o formulário
        setDescricao('');
        setImagem(null);
        setNomePrato('');
        setRestaurante('');
        setTag('');
        alert('Prato capturado com sucesso!');
      })
      .catch((error) => console.log(error));
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
        Formulário de Pratos
      </Typography>
      <Box component="form" onSubmit={aoSubmitForm} sx={{ width: '100%' }}>
        <TextField
          value={nomePrato}
          onChange={(e) => setNomePrato(e.target.value)}
          label="Nome do Prato"
          variant="standard"
          // ocupandado a largura total
          fullWidth
          required //sendo obrigatório
          margin="dense" // para dar uma margin entre os "textfild's"
        />

        <TextField
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          label="Descricao do Prato"
          variant="standard"
          // ocupandado a largura total
          fullWidth
          required //sendo obrigatório
          margin="dense" // para dar uma margin entre os "textfild's"
        />

        {/* Sendo o nome do component 'select' no MUI "FormControl" */}
        <FormControl margin="dense" fullWidth>
          {/* sendo a label: */}
          {/* tendo esse id para fazer referencia ao select */}
          <InputLabel id="select-tag">Tag</InputLabel>

          {/* usando o select de fato */}
          {/* sendo o value o nosso estado 'tag' */}
          <Select
            labelId="select-tag"
            value={tag}
            // passando o valor para 'tags' ao mudar
            onChange={(event) => setTag(event.target.value)}
          >
            {/* e fazendo um map pelas tag exibindo o "menuItem" */}
            {tags.map((tag) => (
              // cada menuIem tendo um value, que é o valor ao selecionar
              <MenuItem key={tag.id} value={tag.value}>
                {/* sendo a descrição do item em si, que é o que irá aparecer para o usuário */}
                {/* sendo o 'value' o nome da propriedade que está na api, não tem relação com nada mais */}
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          {/* sendo a label: */}
          {/* tendo esse id para fazer referencia ao select */}
          <InputLabel id="select-restaurante">Restaunte</InputLabel>

          {/* usando o select de fato */}
          {/* sendo o value o nosso estado 'tag' */}
          <Select
            labelId="select-tag"
            value={restaurante}
            // passando o valor para 'tags' ao mudar
            onChange={(event) => setRestaurante(event.target.value)}
          >
            {/* e fazendo um map pelas tag exibindo o "menuItem" */}
            {restaurantes.map((restaurante) => (
              // cada menuIem tendo um value, que é o valor ao selecionar
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {/* sendo a descrição do item em si, que é o que irá aparecer para o usuário */}
                {/* sendo o 'value' o nome da propriedade que está na api, não tem relação com nada mais */}
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* input para enviar imagem, sendo do tipo opcional para o usuário */}
        {/* e para resolver o erro de poder ou não existir o arquivo, chamamos a função 'selecioanrArquivo' para resolver isso */}
        <input type="file" name="" id="" onChange={selecioanrArquivo} />

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

export default FormularioPrato;
