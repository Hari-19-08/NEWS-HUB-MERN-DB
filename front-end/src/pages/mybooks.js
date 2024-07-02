import React, { useState, useEffect } from 'react';
import Nav from '../components/user';
import axios from 'axios';
import '../styles/home.css';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Home() {
    const [books, setBooks] = useState([]);
    const [val, setvalue] = useState({ image: '' });
    const [show, setShow] = useState(false);
    const [editId, setEditId] = useState(null);
    const { id } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); // State to track loading status
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = (book) => {
        setvalue({ name: book.name, description: book.description });
        setEditId(book._id);
        setShow(true);
    };

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/mybooks/${id}`);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const DeleteBook = async (e) => {
        try {
            const deletebk = await axios.post(`http://localhost:5000/deletebook/${e}/`);
            if (deletebk.data) {
                window.location.reload();
            } else {
                alert("not");
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const EditBooks = async (e) => {
        try {
            const create = await axios.post(`http://localhost:5000/editbooks/${e}`, val);
            if (create.data) {
                window.location.reload();
            } else if (create.data === "done") {
                alert("not");
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

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

         // <div>
        //     <Nav />
        //     <div className='outer'>
        //         {books.map((book, index) => (
        //             <div className='book' key={index}>
        //                 <div className='d-flex mt-2 mb-2'>
        //                     <button className='me-2 edit-btn' onClick={() => handleShow(book)}>Edit</button>
        //                     <button className='delete-btn' onClick={() => DeleteBook(book._id)}>Delete</button>
        //                 </div>
        //                 <img src={book.image} alt='Book' className='image' />
        //                 <div className='name'>{book.name}</div>
        //                 <div className='description'>{book.description}</div>
        //                 <div className='review'>
        //                     {book.reviews.map((review, index) => (
        //                         <div key={index}>
        //                             <div className='review-user'>{review.user}</div>
        //                             <div className='review-comment'>{review.review}</div>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>
        //         ))}
        //     </div>

        //     <Modal show={show} onHide={handleClose} animation={false}>
        //         <Modal.Header closeButton>
        //             <Modal.Title>Edit</Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body>
        //             <div className="modal-content">
        //                 <div className="form-group">
        //                     <label>Image</label>
        //                     <input onChange={handleFileInputChange} type='file' className="form-control" />
        //                 </div>
        //                 <div className="form-group">
        //                     <label>Name</label>
        //                     <input name='name' value={val.name} onChange={input} className="form-control" />
        //                 </div>
        //                 <div className="form-group">
        //                     <label>Description</label>
        //                     <input name='description' value={val.description} onChange={input} className="form-control" />
        //                 </div>
        //             </div>
        //         </Modal.Body>
        //         <Modal.Footer>
        //             <Button variant="secondary" onClick={handleClose}>
        //                 Close
        //             </Button>
        //             <Button variant="primary" onClick={() => EditBooks(editId)}>
        //                 Edit
        //             </Button>
        //         </Modal.Footer>
        //     </Modal>
        // </div>
       
        <div>
            <Nav />
            <div className='search-bar'>
                <input
                    type='text'
                    placeholder='Search news'
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className='search-input'
                />
            </div>
            {books ? ( 
                <div className='outer'>
                    {filteredBooks.map((book, index) => (
                        <div className='book' key={index} >
                            <div className='book-inner'>
                                <div className='d-flex mt-2 mb-2'>
                             <button className='me-2 edit-btn' onClick={() => handleShow(book)}>Edit</button>
                             <button className='delete-btn' onClick={() => DeleteBook(book._id)}>Delete</button>
                         </div>
                                <img src={book.image} alt='Book' className='image' />
                                <div className='name'>{book.name}</div>
                                <div className='description'>{book.description.slice(0, 60)} <a href={`/news/${book._id}`} className='see-more'> see more</a></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                 <Modal.Body>
                     <div className="modal-content">
                         <div className="form-group">
                             <label>Image</label>
                             <input onChange={handleFileInputChange} type='file' className="form-control" />
                         </div>
                         <div className="form-group">
                             <label>Name</label>
                             <input name='name' value={val.name} onChange={input} className="form-control" />
                         </div>
                         <div className="form-group">
                             <label>Description</label>
                             <input name='description' value={val.description} onChange={input} className="form-control" />
                         </div>
                     </div>
                 </Modal.Body>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                         Close
                     </Button>
                     <Button variant="primary" onClick={() => EditBooks(editId)}>
                         Edit
                     </Button>
                 </Modal.Footer>
             </Modal>
        </div>
    );
}

export default Home;
