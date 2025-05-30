import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import Clander from './Clander';
import './News.css';
import userImg from '../assets/Images/userImg.png';
import noImg from '../assets/Images/noImg.png';
import axios from 'axios';

const API_KEY = 'cf67774cafc54591939708d2a2ae9885';

const categories = [
  'general',
  'world', // NOTE: 'world' is not a valid category in NewsAPI; you can replace it with a custom domain query if needed.
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health'
];

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

      if (selectedCategory && selectedCategory !== 'world') {
        url += `&category=${selectedCategory}`;
      }

      if (searchQuery) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      }

      // Handle custom category like "world" with specific domain
      if (selectedCategory === 'world') {
        url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY}`;
        if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`;
      }

      try {
        const response = await axios.get(url);
        const fetchedNews = response.data.articles.map(article => ({
          ...article,
          urlToImage: article.urlToImage || noImg
        }));

        setHeadline(fetchedNews[0]);
        setNews(fetchedNews.slice(1, 7));
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
    setSearchQuery(''); // Reset search when category changes
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  return (
    <div className='news'>
      <header className='news-header'>
        <h1 className="logo">SOCIAL SPHERE</h1>
        <div className="search-bar">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder='Search News...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type='submit'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>

      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="User" />
            <p>Satya's Blog</p>
          </div>
          <nav className='categories'>
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map(category => (
                <a
                  href="#"
                  key={category}
                  className='nav-link'
                  onClick={(e) => handleCategoryChange(e, category)}
                >
                  {category}
                </a>
              ))}
              <a href="#" className='nav-link'>Bookmarks <i className="fa-regular fa-bookmark"></i></a>
            </div>
          </nav>
        </div>

        <div className="news-section">
          {headline && (
            <div className="headline">
              <img src={headline.urlToImage} alt={headline.title} />
              <h2 className="headline-title">{headline.title}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item">
                <img src={article.urlToImage} alt={article.title} />
                <h3>{article.title}<i className="fa-regular fa-bookmark bookmark"></i></h3>
              </div>
            ))}
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
  );
};

export default News;
