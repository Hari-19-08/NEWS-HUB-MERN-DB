import React, { useState, useEffect } from 'react';
import Nav from '../components/topNav';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home() {
    const [book, setBook] = useState(null); // Initialize to null
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getAllBooks();
    }, [id]); // Add id as a dependency

    const getAllBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/singlebooks/${id}`);
            setBook(response.data); // Ensure response.data is assigned correctly
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    if (!book) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <Nav />
            <div className='outer'>
                <div className='book2'>
                    <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                        <img src={book.image} alt='Book' className='image2' />
                        <div className='name2 mt-4 h3'><b>{book.name}</b></div>
                        <div className='description2 w-75 mt-4' >{book.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
