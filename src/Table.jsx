import { useEffect, useState } from 'react'

export default function Table() {
    const [datos, setDatos] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editBook, setEditBook] = useState({ title: '', year: '', isbn: '', id: '' })

    useEffect(() => {
        fetch('http://localhost:8000/api/books')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch((error) => {
                console.error('Error:', error)
            })
    }, [])

    function borrar(id) {
        fetch(`http://localhost:8000/api/books/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert('Libro eliminado con éxito')
                setDatos(datos.filter(dato => dato.id !== id))
            })
            .catch((error) => {
                alert('Error al eliminar el libro')
            })
    }

    function handleModalOpen(book) {
        setEditBook(book) 
        setShowModal(true) 
    }

    function handleModalClose() {
        setShowModal(false)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setEditBook({ ...editBook, [name]: value }) 
    }

    function actualizar(e) {
        e.preventDefault()

        fetch(`http://localhost:8000/api/books/${editBook.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editBook)
        })
            .then(response => response.json())
            .then(data => {
                alert('Libro actualizado con éxito')
                setDatos(datos.map(dato => (dato.id === editBook.id ? editBook : dato)))
                handleModalClose() 
            })
            .catch((error) => {
                alert('Error al actualizar el libro')
            })
    }

    return (
        <div>
            <h2>Listado de libros</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Año</th>
                        <th>ISBN</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato, index) => (
                        <tr key={index}>
                            <td>{dato.title}</td>
                            <td>{dato.year}</td>
                            <td>{dato.isbn}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => borrar(dato.id)}>Borrar</button>
                                <button className="btn btn-warning" onClick={() => handleModalOpen(dato)}>Actualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Actualizar Libro</h5>
                                <button type="button" className="close" onClick={handleModalClose}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={actualizar}>
                                    <div className="form-group">
                                        <label htmlFor="title">Título</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="title" 
                                            name="title" 
                                            value={editBook.title} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="year">Año</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="year" 
                                            name="year" 
                                            value={editBook.year} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="isbn">ISBN</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="isbn" 
                                            name="isbn" 
                                            value={editBook.isbn} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
