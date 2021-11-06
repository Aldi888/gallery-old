import logo from './logo.svg';
import './App.css';
import * as C from './App.styles';

const App = () => {
  return (
    <C.Container>
  
        <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      </div>
<C.Area>
<C.Header>Galeria de Fotos</C.Header>

    {
      /* Area de Upload */
    }

    { /*Lista de Fotos */}

</C.Area>
   
    </C.Container>
  );
}

export default App;
