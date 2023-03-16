import { Button } from '@mui/material';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// importando a instancia do axios
import http from '../../../../http';
import IRestaurante from '../../../../interfaces/IRestaurante';

const AdministacaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  // quando o componente montar em tela
  useEffect(() => {
    // fazendo um GET e com a resposta passando o data para dentro de setRestaurantes
    // ao invés de usar o axios, usamos o 'http' que é o nome da constante que criamos uma instancia de 'axios'
    http
      .get<IRestaurante[]>('restaurantes/')
      .then((response) => {
        // passando a lista de restaurante que existe
        // console.log(response.data)
        setRestaurantes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const excluir = (restauranteAhSerExcluido: IRestaurante) => {
    // usando o método HTTP do tipo DELETE, e passando o id do restaurante a ser excluido
    http.delete(`restaurantes/${restauranteAhSerExcluido.id}/`).then(() => {
      // Atribuindo a 'listaRestaurante', todos os restaurantes que tenham o id diferente do restaurante a ser excluido
      const novaListaRestaurantes = restaurantes.filter(
        (restaurante) => restaurante.id !== restauranteAhSerExcluido.id,
      );
      setRestaurantes([...novaListaRestaurantes]);
    });
  };

  return (
    // exibindo a lista de restaurantes
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Editar</TableCell>
          <TableCell>Excluir</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {restaurantes.map((restaurante) => (
          <TableRow key={restaurante.id}>
            <TableCell>{restaurante.nome}</TableCell>
            {/* fazendo com que cada item tenha um link que levará para a página especifica do restaurante para administradores */}
            <TableCell>
              [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
              ]
            </TableCell>
            <TableCell>
              {/* o variant="outlined" irá colocar bordas em volta do botao */}
              <Button
                variant="outlined"
                color="error"
                // ao click, ele chamará a função excluir passando 'restaurante' como parametro, que será o clicado
                onClick={() => excluir(restaurante)}
              >
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdministacaoRestaurantes;
