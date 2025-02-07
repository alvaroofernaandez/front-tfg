import React, { useState, useEffect } from "react";

const ActualizarNoticia = ({ id }) => {
    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        imagen: "",
        fecha: ""
    });

    // Cargar los datos actuales de la noticia
    useEffect(() => {
        const obtenerNoticia = async () => {
            try {
                const respuesta = await fetch(`http://127.0.0.1:8000/noticias/${id}/`);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setFormData(datos);
                } else {
                    throw new Error("Error al cargar la noticia.");
                }
            } catch (error) {
                console.error(error);
                alert("No se pudo cargar la noticia.");
            }
        };

        if (id) obtenerNoticia();
    }, [id]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Manejar el envío del formulario
    const actualizar = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch(`http://127.0.0.1:8000/noticias/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (respuesta.ok) {
                console.log("Noticia actualizada:", await respuesta.json());
                alert("Noticia actualizada con éxito.");
                window.location.href = "/Noticias"; // Redirigir a la lista de noticias
            } else {
                throw new Error("Error al actualizar la noticia.");
            }
        } catch (error) {
            console.error(error);
            alert("Error al actualizar la noticia.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Actualizar Noticia</h2>
            <form onSubmit={actualizar}>
                <label htmlFor="titulo" className="block mb-2">Título:</label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full mb-4"
                    required
                />

                <label htmlFor="descripcion" className="block mb-2">Descripción:</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full mb-4"
                    required
                ></textarea>

                <label htmlFor="fecha" className="block mb-2">Fecha:</label>
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha.split("T")[0]} // Mostrar solo la fecha
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full mb-4"
                    required
                />

                <label htmlFor="imagen" className="block mb-2">Imagen URL:</label>
                <input
                    id="imagen"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full mb-4"
                />

                <button
                    type="submit"
                    className="bg-blue-950 text-white rounded-lg p-2 hover:bg-blue-700 transition-colors"
                >
                    Actualizar
                </button>
            </form>
        </div>
    );
};

export default ActualizarNoticia;
