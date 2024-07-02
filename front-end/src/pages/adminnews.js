import React, { useState, useEffect } from 'react';
import Nav from '../components/adminNav';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Home() {
    const [books, setBooks] = useState([]);
    const [val, setValue] = useState({
        image: ''
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const input = (e) => {
        const { name, value } = e.target;
        setValue({ ...val, [name]: value });
    };

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const deleteBook = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/deletebook/${id}`);
            if (response.data) {
                window.location.reload();
            } else {
                alert("Could not delete the book");
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const editBook = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/editbooks/${id}`, val);
            if (response.data) {
                window.location.reload();
            } else {
                alert("Could not edit the book");
            }
        } catch (error) {
            console.error('Error editing book:', error);
        }
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setValue({ ...val, 'image': reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const styles = {
        outer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            padding: '20px',
        },
        book: {
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '20px',
            width: '250px',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            transition: 'transform 0.3s, box-shadow 0.3s',
        },
        bookHover: {
            transform: 'scale(1.05)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        },
        image: {
            width: '100%',
            height: 'auto',
        },
        name: {
            fontWeight: 'bold',
            marginTop: '10px',
        },
        description: {
            marginTop: '10px',
        },
        review: {
            marginTop: '10px',
            textAlign: 'left',
        },
        reviewUser: {
            fontWeight: 'bold',
        },
        reviewComment: {
            marginLeft: '10px',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '10px',
        },
    };

    return (
        <div>
            <Nav />
            <div style={styles.outer}>
                {books.map((book, index) => (
                    <div key={index} style={styles.book}>
                        <div style={styles.buttonGroup}>
                            <button className='me-2' onClick={handleShow}>Edit</button>
                            <button onClick={() => { deleteBook(book._id) }}>Delete</button>
                        </div>
                        <div>
                            <img src={book.image} alt='Book' style={styles.image} />
                        </div>
                        <div style={styles.name}>{book.name}</div>
                        <div style={styles.description}>{book.description}</div>
                        <div style={styles.review}>
                            {book.reviews.map((review, index) => (
                                <div key={index}>
                                    <div style={styles.reviewUser}>{review.user}</div>
                                    <div style={styles.reviewComment}>{review.review}</div>
                                </div>
                            ))}
                        </div>
                        <Modal show={show} onHide={handleClose} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div>
                                        <label>Name</label>
                                        <input name='name' onChange={input} />
                                    </div>
                                    <div>
                                        <label>Description</label>
                                        <input name='description' onChange={input} />
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => { editBook(book._id) }}>
                                    Edit
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
