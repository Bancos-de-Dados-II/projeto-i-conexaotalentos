import React from 'react';
import JobList from './components/jobList';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Styles/App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1> Nossas Vagas Disponíveis</h1>
      <JobList />
    </div>
  );
};

export default App;
