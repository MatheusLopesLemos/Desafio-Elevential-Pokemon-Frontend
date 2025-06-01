import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CadastroPokemon from './pages/CadastroPokemon';
import CadastroTipo from './pages/CadastroTipo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro-pokemon" element={<CadastroPokemon />} />
      <Route path="/cadastro-tipo" element={<CadastroTipo />} />
    </Routes>
  );
}

export default App;
