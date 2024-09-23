import { useState } from 'react'

export default function Create() {

    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [isbn, setIsbn] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        
        // Obtén los valores del formulario usando los setters
        const newTitle = e.target.title.value
        const newYear = e.target.year.value
        const newIsbn = e.target.ISBN.value

        fetch('http://localhost:8000/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle, year: newYear, isbn: newIsbn })
        })
            .then(response => response.json())
            .then(data => {
                alert('Libro creado con éxito')
                setTitle('')
                setYear('')
                setIsbn('')
                e.target.reset() 
            })
            .catch((error) => {
                alert('Error al crear el libro')
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        name="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
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
                        value={year} 
                        onChange={(e) => setYear(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ISBN">ISBN</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="ISBN" 
                        name="ISBN" 
                        value={isbn} 
                        onChange={(e) => setIsbn(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    )
}
