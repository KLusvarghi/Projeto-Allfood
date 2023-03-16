import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');

  // quando o componente montar em tela ele executa esse escopo
  useEffect(() => {
    // peganso a url fornecia no "localhost:8000"
    // e chamando o axios e utilizando a função "get" e passadno a url fornecisa
    axios
      // Ao fazer o get, podemos passar o tipo da resposta, passando então uma interface que tem como generics  'IRestaurante'
      .get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then((response) => {
        // jogando a resposata dentro o useState 'restaurante' que será exibido para o usuário
        setRestaurantes(response.data.results)
        // e tambem jogando para dentro de 'proximaPagina' a url da proxima página
        setProximaPagina(response.data.next)
        // console.log(proximaPagina); 
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // função responsavel por setar o valor de 'restaurantes', ajuntando os restaurantes da primeira página e os da segunda página
  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
    .then((response) => {
      // Setando o valor de 'restaurantes' novamente, passando os restaurantes já exibidos (da primeira página) junto com os novos requisitados (da proxima página)
      setRestaurantes([...restaurantes, ...response.data.results])
      
      // e tambem jogando para dentro de 'proximaPagina' a url da proxima página (caso tenha), e caso "response.data.next" não tenha, ele será "null"
      // console.log(response.data.next)
      setProximaPagina(response.data.next)

      console.log(restaurantes);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {/* após a requisição, verificamos se 'proximaPagina' existe */}
      {proximaPagina && <button onClick={verMais}> Ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
