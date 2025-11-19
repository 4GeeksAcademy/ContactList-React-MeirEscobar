import { useEffect, useState, useRef } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {  newAgenda, deleteContacts, getAgenda, getContactos } from "../services/GetAgenda.js";
import { useNavigate } from "react-router-dom";


export const Home = () => {

	const {store, dispatch} = useGlobalReducer()
	const {listaAgendas} = store
	const {listaContactos} = store
	const [contactToDelete, setContactToDelete] = useState(null);

	const modalRef = useRef(null);

	useEffect (() => {
		getAgenda(dispatch)
	}, [dispatch]);

		useEffect(() => {
			const condicional = async() =>{
			if (listaAgendas && listaAgendas.length > 0){
				const existe = listaAgendas.some((agenda) =>agenda.slug==='MeirEscobar')
				if (existe === false){
					await newAgenda()
				}
					await getContactos(dispatch)
			}	
			}
		condicional()	
		}, [listaAgendas, dispatch]);


	const navigate = useNavigate()
	const navegacion = (ruta, id = null) => {
		const finalRuta =id !== null ? ruta.replace(':contact_id', id) : ruta;
		navigate(finalRuta);
	}

	const handleDeleteContact = async () => {
        if (!contactToDelete) return;
        try {
            await deleteContacts(contactToDelete);
            alert("Contacto eliminado con éxito!");
			
			const modalElement = modalRef.current;
        	if (modalElement) {
            const modal = new window.bootstrap.Modal(modalElement);
            modal.hide(); 

            document.querySelector('.modal-backdrop')?.remove();
        }
            await getContactos(dispatch); 

            setContactToDelete(null);

        } catch (error) {
            console.error("Error al eliminar el contacto:", error);
            alert("Error al eliminar el contacto. Revisa la consola.");
        }
    }


	return (
		<div className="container mt-5 mb-5 fullscreen">
			<div className="text-center">
			<h1 className="display-1 gap-2">Contactos</h1>
			</div>		
			{listaContactos && listaContactos.map((contact) => (
			<div key={contact.id} className="card mb-3 shadow-sm bg-light">
				<div className="row g-0">
					<div className="col-md-4 col-xl-3">
						<img src={rigoImageUrl} class="rounded-circle"></img>
					</div>
					<div className="col-md-8 col-xl-9">
						<div className="d-flex justify-content-end p-2 p-md-4">
							<button className="btn btn-outline-success me-1 me-md-2" type="button" onClick={()=>navegacion('/contacts/:contact_id', contact.id)}>
								<p>EDITAR</p>
							</button>
							<button className="btn btn-outline-danger" type="button" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" onClick={()=>setContactToDelete(contact.id)}>
								<p>BORRAR</p>
							</button>
						</div>
						<div className="modal fade" id="confirmDeleteModal" tabIndex="-1" ref={modalRef} aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
								<div className="modal-header">
									<h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar {contact.name}</h1>
									<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div className="modal-body">
									<p className="text-body-primary">Estas a punto de eliminar a {contact.name}. ¿Estas segur@?</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
									<button type="button" className="btn btn-danger" onClick={handleDeleteContact}>Si</button>
								</div>
								</div>
							</div>
						</div>

						<div className="card-body">
							<h3 className="card-title mb-2">{contact.name}</h3>
							<p className="card-text text-body-primary fs-5">Calle: {contact.address}</p>
							<p className="card-text text-body-primary fs-5">Numero de telefono: {contact.phone}</p>
							<p className="card-text text-body-primary fs-5 mb-4">Correo: {contact.email}</p>
						</div>
					</div>

				</div>
			</div>
			))}
		</div>
			
	);
}; 