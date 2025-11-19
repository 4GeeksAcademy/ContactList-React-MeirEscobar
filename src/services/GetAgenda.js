const urlBase= "https://playground.4geeks.com/contact/agendas/"

const userName= 'MeirEscobar'

export const newAgenda = async () => {
    try {
        const response = await fetch(`${urlBase}${userName}` ,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error (`Error ${response.status}`);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error, no se ha creado agenda", error.message);
    }
};

export const getAgenda = async (dispatch) => {
    try {
        const response = await fetch (`${urlBase}`);
        if(!response.ok) {
            throw new Error (`Èrror ${response.status}`);
        }
        const data = await response.json()
        dispatch ({
            type: "SaveAgendas",
            payload: data.agendas
        });
        return data;
    } catch (error) {
        console.log("Error al cargar las agendas", error.message);
    }
};

export const getContactos = async (dispatch) => {
    try {
        const response = await fetch (`${urlBase}${userName}/contacts`);
        if (!response.ok) {
            throw new Error (`Error ${response.status}`);
        }
        const data = await response.json()
        dispatch ({
            type: "SaveContacts",
            payload: data.contacts
        });
        return data.contacts;
    } catch (error) {
        console.log (`Error al cargar los contactos de: ${userName}`, error.message);
    } 
};

export const createContact = async (contact) => {
    const contactoEnviar = {
        "name":contact.name,
        "address":contact.address,
        "phone":contact.phone,
        "email":contact.email
    }
    try {
        const response = await fetch(`${urlBase}${userName}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactoEnviar)
        });
        if (!response.ok){
            let errorDetails = await response.text();
            throw new Error(`Error al crear contacto Estatus: ${response.status}. Detalles: ${errorDetails.substring(0, 100)}...`)
        }
        const data = await response.json()
        console.log("Contacto creado :D :", contactoEnviar);
        return data;
    } catch (error) {
        console.log(`Error al crear el contacto`, error)
        throw error;
    }
};

export const updateContacts = async (id, contact) => {
    const contactoEnviar = {
        "name":contact.name,
        "address":contact.address,
        "phone":contact.phone,
        "email":contact.email
    }
    try {
        const response = await fetch (`${urlBase}${userName}/contacts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactoEnviar)
        });

        if (!response.ok){
            let errorDetails = await response.text();
            throw new Error(`Error al editar el contacto. Estatus: ${response.status}. Detalles: ${errorDetails.substring(0, 100)}...`)
        }

        return await response.json();

    }catch(error){
        console.log(`Error al editar el contacto`, error)
        throw error;
    }
};

export const deleteContacts = async (id) => {
    try {
        const response = await fetch (`${urlBase}${userName}/contacts/${id}`,{
            method: "DELETE",
        });
        
        if (!response.ok){
            let errorDetails = await response.text();
            throw new Error(`Error al eliminar el contacto. Estatus: ${response.status}. Detalles: ${errorDetails.substring(0, 100)}...`);
        }
        if (response.status === 204) {
            return { message: "Contacto eliminado :c" };
        }
        return await response.json();
    } catch (error) {
        console.log(`Error al eliminar el contacto`, error);
        throw error; 
    }
};