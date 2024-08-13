import React from 'react';
import VagaList from './components/jobList';
import VagaFormulario from './components/jobForms';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Conexo de Talentos</h1>
      <VagaList />
      <VagaFormulario />
    </div>
  );
};

export default App;
