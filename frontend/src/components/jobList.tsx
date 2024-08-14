import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Job {
    _id: string;
    titulo: string;
    descricao: string;
    latitude: number;
    longitude: number;
}

const JobList: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    const loadJobs = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`);
            const jobs = await response.json();
            setJobs(jobs);
        } catch (error) {
            console.error('Erro ao carregar vagas:', error);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    useEffect(() => {
        jobs.forEach(job => {
            const map = L.map(`map-${job._id}`).setView([job.latitude, job.longitude], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);
            L.marker([job.latitude, job.longitude]).addTo(map);
        });
    }, [jobs]);

    // Configuração do carrossel
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="carousel-container">
            <Slider {...carouselSettings}>
                {jobs.map(job => (
                    <div key={job._id} className="job-item">
                        <h3>{job.titulo}</h3>
                        <p>{job.descricao}</p>
                        <div id={`map-${job._id}`} className="map" style={{ height: '200px', width: '100%' }}></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default JobList;
