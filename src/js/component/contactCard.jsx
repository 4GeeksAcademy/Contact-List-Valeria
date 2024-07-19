import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt, faLocationDot, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Contact = () => {
    const { store, actions } = useContext(Context);
    const [id, setId] = useState("");

    function deleteOneContact(element) {
        setId(element);
    }

    function confirmDelete() {
        actions.deleteContact(id);
    }

    function idUpdateContact(id, name, address, phone, email) {
        actions.setIdForUpdate(id, name, address, phone, email);
    }

    const imageUrl = "https://pathrise-website-guide-wp.s3.us-west-1.amazonaws.com/guides/wp-content/uploads/2022/01/14151342/4GeeksAcademyLogo-500x474.jpg";

    return (
        <div>
            {store.Contacts.length === 0 && <span className="m-5 p-5">No hay contactos agregados</span>}
            {store.Contacts.map((contact) => (
                <div key={contact.id} className="row border rounded m-2">
                    <div className="col-3 col-lg-2 p-2 mx-4 my-auto">
                        <img src={imageUrl} className="card-img rounded-circle" alt="Contact" />
                    </div>
                    <div className="col p-2 my-auto">
                        <div className="row d-flex">
                            <div className="col-12 py-3">
                                <h5 className="pt-2">{contact.name}</h5>
                            </div>
                            <div className="col text-secondary">
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon className="pe-2" icon={faLocationDot} />
                                    <p className="pt-3">{contact.address}</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon className="pe-2" icon={faPhoneAlt} />
                                    <p className="pt-3">{contact.phone}</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon className="pe-2" icon={faEnvelope} />
                                    <p className="pt-3">{contact.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 p-2 ms-auto me-2 d-flex flex-column align-items-start">
                        <Link to="/updateContact">
                            <button 
                                onClick={() => idUpdateContact(contact.id, contact.name, contact.address, contact.phone, contact.email)}
                                className="btn mb-2 btn-primary"
                            >
                                <FontAwesomeIcon className="px-2" icon={faPencil} />
                            </button>
                        </Link>
                        <button 
                            onClick={() => deleteOneContact(contact.id)}
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            <FontAwesomeIcon className="px-2" icon={faTrash} />
                        </button>
                    </div>
                </div>
            ))}

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmación de Eliminación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Estás seguro de que deseas eliminar este contacto? Esta acción no se puede deshacer.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button 
                                onClick={() => confirmDelete()}
                                type="button" 
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
