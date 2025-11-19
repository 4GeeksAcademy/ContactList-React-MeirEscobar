import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { updateContacts } from "../services/GetAgenda.js";

export const EditarContacto = () => {

    const { contact_id } = useParams();
    const navigate = useNavigate();
    const { store } = useGlobalReducer();

    const idToEdit = parseInt(contact_id)

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    
    useEffect(() => {
        const contactData = store.listaContactos.find(c => c.id === idToEdit);

        if (contactData) {
            setName(contactData.name || "");
            setAddress(contactData.address || ""); 
            setEmail(contactData.email || "");
            setPhone(contactData.phone || "");
        } else {
            console.warn(`Contacto con ID ${idToEdit} no encontrado en la lista.`);
            navigate('/'); 
        }
        
    }, [idToEdit, store.listaContactos]);

    const saveEdit = async (event) => {
        event.preventDefault(); 

        const updatedContact = { name, address, email, phone };
        
        try {
            await updateContacts(contact_id, updatedContact);
            
            alert("Contacto editado con éxito!");
            navigate('/'); 
        } catch (error) {
            console.error("Error al editar el contacto:", error);
            alert("Error al editar el contacto.");
        }
    };

    return (
        <div className="container mb-5">
        <form onSubmit={saveEdit}>
         <h1 className="display-1 text-center">Editar Contacto</h1>    
         <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre Completo</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="name" placeholder="Escriba su nombre completo"/>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Dirección</label>
                <input value={address} onChange={(e)=>setAddress(e.target.value)}type="text" className="form-control" id="address" placeholder="Escriba su dirección"/>
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Número de teléfono</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)}type="text" className="form-control" id="phone" placeholder="Escriba su número de teléfono"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-Mail</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)}type="text" className="form-control" id="email" placeholder="Escriba su e-mail"/>
            </div>
            <button type="submit" className="btn btn-success d-grid col-6 mx-auto mb-3">
                <p>Editar</p>
            </button>
            <Link to="/"><p className="text-center">Vuelve a la lista de contactos</p></Link>
       </form>
       </div>  
    )}