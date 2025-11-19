import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createContact } from "../services/GetAgenda";
import { useNavigate } from "react-router-dom";

export const NuevoContacto = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    
    
   const navigate = useNavigate()
  
   
    const contact = {
        "name":name,
        "address":address,
        "email":email,
        "phone":phone
    }
    
    const saveContact = async (event) => {
    event.preventDefault(); 

    try {
        await createContact(contact);
        alert("Contacto guardado con éxito!");

        setName("");
        setAddress("");
        setEmail("");
        setPhone("");

        navigate('/'); 
    } catch (error) {
        console.error("Error al guardar el contacto:", error);
        alert("Error al guardar el contacto.");
    }
    }
 
    

console.log(contact);


    return (
        <div className="container fullscreen">
        <form onSubmit={saveContact}>
         <h1 className="display-1 text-center">Nuevo Contacto</h1>    
         <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">Nombre</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="name" autoComplete="off"/>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label fw-bold">Dirección</label>
                <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" className="form-control" id="address" autoComplete="off" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-bold">Número de teléfono</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" className="form-control" id="phone" autoComplete="off" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">E-Mail</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" id="email" autoComplete="off" />
            </div>
            <button className="btn btn-success d-grid col-6 mx-auto mb-3" type="submit">
                <p className="bi bi-person-add d-grid mx-auto">Añadir nuevo contacto</p>
            </button>
            <Link to="/"><p className="text-center">Lista de contactos</p></Link>
       </form>
       </div>  
    )}