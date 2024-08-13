import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const JobForms: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [latitude, setLatitude] = useState<number | ''>('');
  const [longitude, setLongitude] = useState<number | ''>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (latitude !== '' && longitude !== '') {
      await axios.post(`${process.env.REACT_APP_API_URL}/vagas`, {
        titulo,
        localizacao: { latitude: Number(latitude), longitude: Number(longitude) },
      });
      setTitulo('');
      setLatitude('');
      setLongitude('');
    }
  };

  const position: [number, number] = [Number(latitude) || -15.7801, Number(longitude) || -47.9292];

  return (
    <div className="job-forms">
      <h2>Adicionar Nova Vaga</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="number"
          id="latitude"
          value={latitude}
          onChange={(e) => setLatitude(Number(e.target.value))}
          required
        />
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="number"
          id="longitude"
          value={longitude}
          onChange={(e) => setLongitude(Number(e.target.value))}
          required
        />
        <button type="submit">Adicionar Vaga</button>
      </form>
      <MapContainer center={position} zoom={5} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {latitude !== '' && longitude !== '' && (
          <Marker position={position}>
            <Popup>{titulo}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default JobForms;
