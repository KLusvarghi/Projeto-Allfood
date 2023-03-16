import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministacaoRestaurantes from './paginas/Home/Administracao/Restaurantes/AdministacaoRestaurantes';
import FormularioRestaurante from './paginas/Home/Administracao/Restaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Home/Administracao/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/Home/Administracao/Pratos/AdministracaoPratos';
import FormularioPrato from './paginas/Home/Administracao/Pratos/FormularioPrato';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      {/* ROTA BASE: caminho para uma página padrão de admin */}
      <Route path='/admin' element={<PaginaBaseAdmin/>}>
        <Route path="restaurantes" element={<AdministacaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
        {/* dessa maneira, precisamos colocar a rota aqui para que o browser entenda o caminho que o link da página de "AdministacaoRestaurantes" está fazedno.
        Colocando ":id" assim esse dois ponto irá indicar que esse seguimento é dinâmico*/}
        {/* Assim, toda vez que clicar no <Link/> ele irá jogar para a aba de formulário e setar o nome do restaurante conforme o id link clicado */}

        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos/:id" element={<FormularioPrato />} />

      </Route>
    </Routes>
  );
}

export default App;
