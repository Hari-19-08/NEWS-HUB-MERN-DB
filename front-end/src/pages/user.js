import React, { useState, useEffect } from 'react';
import Nav from '../components/user';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();
    const { id } = useParams();
    

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching books:', error);
            setLoading(false); 
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
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
            {loading ? ( // Display loading message when loading is true
                <div>Loading...</div>
            ) : (
                <div className='outer'>
                    {filteredBooks.map((book, index) => (
                        <div className='book' key={index}>
                            <div className='book-inner'>
                                <img src={book.image} alt='Book' className='image' />
                                <div className='name'>{book.name}</div>
                                <div className='description'>{book.description.slice(0, 60)} <a href={`/newsusers/${book._id}`} className='see-more'> see more</a></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
