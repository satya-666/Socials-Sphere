import React, { use } from 'react'
import { useState ,useEffect} from 'react';
import Weather from './Weather'
import Clander from './Clander'
import './News.css';
import userImg from '../assets/Images/userImg.png';
import noImg from '../assets/Images/noImg.png';
import worldImg from '../assets/Images/worldImg.png';
import sportsImg from '../assets/Images/SportsImg.png';
import sciencImg from '../assets/Images/sciencImg.png';
import businessImg from '../assets/Images/businessImg.png';
import axios from 'axios';

const categories = ['general', 'world', 'business', 'technology', 'entertainment', 'sports', 'science', 'health', 'nation'];

const News = () => {
    const [headline, setheadline] = useState(null);
    const [news, setnews] = useState([]);
    const [selectedCategory, setselectedCategory] = useState('general');
    useEffect(() => {
        const fetchNews = async () => {
            const url = 'https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=da1e10a00423e24726010658371a3ca1 uhiujiji';
    
            const response = await axios.get(url);
            const fetchedNews = response.data.articles;
            fetchedNews.forEach((article) =>{
                if (!article.image) {
                    article.image = noImg;
                }
            });
            setheadline(fetchedNews[0]);
            setnews(fetchedNews.slice(1, 7));
        };
    
        fetchNews();
    }, [selectedCategory]);

    const handelCategoryChange = (e,category) => {
        e.preventDefault();
        setselectedCategory(category);
    }
    
    useEffect(() => {
        // This effect will run after the 'news' state has been updated
        console.log(news);
    }, [news]); // Add 'news' to the dependency array
  return (
    <div className='news'>
        <header className='news-header'>
            <h1 className="logo">SOCIAL SPHERE</h1>
            <div className="search-bar">
                <form>
                    <input type="text" placeholder='Search News...'/>
                    <button type='submit'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
        </header>
        <div className="news-content">
            <div className="navbar">
                <div className="user">
                    <img src={userImg} alt="User Img" />
                    <p>Satya's Blog</p>
                </div>
                <nav className='categories'>
                    <h1 className="nav-heading">Categories</h1>
                    <div className="nav-links">
                        {categories.map((category) => (
                            <a href="#" key = {category}className='nav-link' onClick={(e) => handelCategoryChange(e, category)}>
                                {category}
                            </a>
                        ))}
                        
                        {/* <a href="#" className='nav-link'>World</a>
                        <a href="#" className='nav-link'>Business</a>
                        <a href="#" className='nav-link'>Technology</a>
                        <a href="#" className='nav-link'>Entertaiment</a>
                        <a href="#" className='nav-link'>Sports</a>
                        <a href="#" className='nav-link'>Science</a>
                        <a href="#" className='nav-link'>Health</a>
                        <a href="#" className='nav-link'>Nation</a>
                        <a href="#" className='nav-link'>Bookmarks <i className="fa-regular fa-bookmark"></i></a> */}

                    </div>
                </nav>
            </div>
            
            <div className="news-section">
                {headline && (
                    <div className="headline">
                    <img src={headline.image || noImg} alt={headline.title} />
                    <h2 className="headline-title">{headline.title}
                        <i className="fa-regular fa-bookmark bookmark"></i>
                    </h2>
                </div>
                )}
                
                <div className="news-grid">
                    {news.map((article, index) => (
                        <div key={index} className="news-grid-item">
                        <img src={article.image || noImg} alt={article.title} />
                        <h3>{article.title}<i className="i fa-regular fa-bookmark bookmark"></i>
                        </h3>
                    </div>
                    ))}
                    
{/* 
                    <div className="news-grid-item">
                        <img src={sportsImg} alt="Tech Image" />
                        <h3>Lorem ipsum dolor <i className="i fa-regular fa-bookmark bookmark"></i>
                        </h3>
                    </div>

                    <div className="news-grid-item">
                        <img src={sciencImg} alt="Tech Image" />
                        <h3>Lorem ipsum dolor <i className="i fa-regular fa-bookmark bookmark"></i>
                        </h3>
                    </div>

                    <div className="news-grid-item">
                        <img src={businessImg} alt="Tech Image" />
                        <h3>Lorem ipsum dolor <i className="i fa-regular fa-bookmark bookmark"></i>
                        </h3>
                    </div>


                    <div className="news-grid-item">
                        <img src={techImg} alt="Tech Image" />
                        <h3>Lorem ipsum dolor <i className="i fa-regular fa-bookmark bookmark"></i>
                        </h3>
                    </div>

                    <div className="news-grid-item">
                        <img src={userImg} alt="Tech Image" />
                        <h3>Lorem ipsum dolor <i className="i fa-regular fa-bookmark bookmark"></i>
                        </h3>
                    </div> */}
                </div>
            </div>
            <div className="my-blogs">My Blog</div>
            <div className="weather-clander">
            <Weather />
            <Clander />
            </div>
        </div>
        <footer className='news-footer'>Footer</footer>
    </div>

  )
}

export default News
