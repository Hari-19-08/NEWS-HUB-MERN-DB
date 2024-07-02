import React, { useState, useEffect } from 'react';
import Nav from '../components/adminNav';
import axios from 'axios';
import '../styles/home.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Home() {
    const [books, setBooks] = useState([]);
    const [val, setvalue] = useState({ image: '' });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/alluser');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const DeleteBook = async (id) => {
        try {
            const deletebk = await axios.post(`http://localhost:5000/deleteuser/${id}/`);
            if (deletebk.data) {
                window.location.reload();
            } else {
                alert("Delete failed");
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const EditBooks = async (id) => {
        try {
            const create = await axios.post(`http://localhost:5000/edituser/${id}`, val);
            if (create.data) {
                window.location.reload();
            } else {
                alert("Edit failed");
            }
        } catch (error) {
            console.error('Error editing book:', error);
        }
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setvalue({ ...val, image: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <Nav />
            <div className='outer'>
                {Array.isArray(books) && books.map((book, index) => (
                    <div className='book' key={index}>
                        <div className='d-flex mt-2 mb-2'>
                            
                            <button onClick={() => { DeleteBook(book._id) }}>Delete</button>
                        </div>
                        <div className='name'>{book.id}</div>
                        <div className='description'>{book.name}</div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
