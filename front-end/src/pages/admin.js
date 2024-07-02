import React, { useState, useEffect } from 'react';
import Nav from '../components/adminNav';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: auto;
`;

const SearchBar = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    input {
        width: 50%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }
`;

const BookList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`;

const BookItem = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    width: 200px;
    text-align: center;
    background-color: #f9f9f9;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
`;

const ModalHeaderStyled = styled(Modal.Header)`
    background-color: #007bff;
    color: white;
`;

const ModalFooterStyled = styled(Modal.Footer)`
    display: flex;
    justify-content: space-between;

    .btn-secondary {
        background-color: #6c757d;
        border-color: #6c757d;
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
    }
`;

function Home() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

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

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [show, setShow] = useState(true);

    const [val, setvalue] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    const Login = async () => {
        const log = await axios.post(`http://localhost:5000/adminlogin`, val);
        if (log.data === "done") {
            navigate(`/admin/dashboard`);
        } else {
            alert("Enter Valid Details");
        }
    };

    return (
        <div>
            <Nav />
            <Container>
                <SearchBar>
                    <input
                        type='text'
                        placeholder='Search books'
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                </SearchBar>
                <BookList>
                    {filteredBooks.map((book) => (
                        <BookItem key={book.id}>
                            <h3>{book.name}</h3>
                            <p>{book.author}</p>
                        </BookItem>
                    ))}
                </BookList>
            </Container>
            <Modal show={show} onHide={handleClose} animation={false} centered>
                <ModalHeaderStyled closeButton>
                    <Modal.Title>Admin Login</Modal.Title>
                </ModalHeaderStyled>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='formUsername'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                name='id'
                                onChange={input}
                            />
                        </Form.Group>
                        <Form.Group controlId='formPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                onChange={input}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <ModalFooterStyled>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={Login}>
                        Login
                    </Button>
                </ModalFooterStyled>
            </Modal>
        </div>
    );
}

export default Home;
