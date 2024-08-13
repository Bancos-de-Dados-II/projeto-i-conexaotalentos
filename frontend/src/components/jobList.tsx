import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Job {
  id: number;
  titulo: string;
  localizacao: {
    latitude: number;
    longitude: number;
  };
}

// Componente para centralizar o mapa
const CenterMap: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/vagas`);
      setJobs(response.data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      <h2>Vagas Disponíveis</h2>
      <MapContainer center={[-15.7801, -47.9292]} zoom={5} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CenterMap center={[-15.7801, -47.9292]} />
        {jobs.map((job) => (
          <Marker key={job.id} position={[job.localizacao.latitude, job.localizacao.longitude]}>
            <Popup>{job.titulo}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default JobList;
