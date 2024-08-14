import React from 'react';

const JobForms: React.FC = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const titulo = (form.elements.namedItem('titulo') as HTMLInputElement).value;
        const descricao = (form.elements.namedItem('descricao') as HTMLTextAreaElement).value;
        const latitude = (form.elements.namedItem('latitude') as HTMLInputElement).value;
        const longitude = (form.elements.namedItem('longitude') as HTMLInputElement).value;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo,
                    descricao,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                }),
            });

            if (response.ok) {
                form.reset();
                window.location.reload();
            } else {
                console.error('Erro ao salvar a vaga');
            }
        } catch (error) {
            console.error('Erro ao salvar a vaga:', error);
        }
    };

    return (
        <form id="job-form" onSubmit={handleSubmit}>
            <label htmlFor="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" required />

            <label htmlFor="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" required></textarea>

            <label htmlFor="latitude">Latitude:</label>
            <input type="number" id="latitude" name="latitude" step="any" required />

            <label htmlFor="longitude">Longitude:</label>
            <input type="number" id="longitude" name="longitude" step="any" required />

            <button type="submit">Salvar</button>
        </form>
    );
};

export default JobForms;
