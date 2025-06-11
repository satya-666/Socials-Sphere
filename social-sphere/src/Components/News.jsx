import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import Clander from './Clander';
import './News.css';
import './NewsModal.css';
import userImg from '../assets/Images/userImg.png';
import noImg from '../assets/Images/noImg.png';
import axios from 'axios';
import NewsModal from './NewsModal';
import Bookmarks from './Bookmarks';

const API_KEY = 'cf67774cafc54591939708d2a2ae9885';

const categories = [
  'general',
  'world', // 'world' is handled via a custom domain query
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health',
  'nation'
];

const News = ({onShowBlogs}) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  // Fetch news whenever category or search query changes
  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

      if (selectedCategory && selectedCategory !== 'world') {
        url += `&category=${selectedCategory}`;
      }

      if (searchQuery) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      }

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
    setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleBookmarkClick = (article) => {
    setBookmarks(prevBookmarks => {
      let updatedBookmarks;
      const alreadyBookmarked = prevBookmarks.find((b) => b.title === article.title);

      if (alreadyBookmarked) {
        updatedBookmarks = prevBookmarks.filter((b) => b.title !== article.title);
      } else {
        updatedBookmarks = [...prevBookmarks, article];
      }

      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
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
          <div className="user" onClick={onShowBlogs}>
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
              <a href="#" className='nav-link' onClick={() => setShowBookmarks(true)}>
                Bookmarks <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>

        <div className="news-section">
          {headline && (
            <div className="headline" onClick={() => handleArticleClick(headline)}>
              <img src={headline.urlToImage} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i
                  className={`fa-bookmark bookmark-icon ${
                    bookmarks.some((bookmark) => bookmark.title === headline.title)
                      ? 'fa-solid'
                      : 'fa-regular'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(headline);
                  }}
                ></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div
                key={index}
                className="news-grid-item"
                onClick={() => handleArticleClick(article)}
              >
                <img src={article.urlToImage} alt={article.title} />
                <h3>
                  {article.title}
                  <i
                    className={`fa-bookmark bookmark-icon ${
                      bookmarks.some((bookmark) => bookmark.title === article.title)
                        ? 'fa-solid'
                        : 'fa-regular'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(article);
                    }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>

        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />

        <Bookmarks
          show={showBookmarks}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarks(false)}
          onDeleteBookmark={handleBookmarkClick}
        />

        <div className="my-blogs">My Blog</div>
        <div className="weather-clander">
          <Weather />
          <Clander />
        </div>
      </div>

      <footer className='news-footer'>
        <p>
          <span>Social Sphere</span>
        </p>
        <p>&copy; All Right Reserved. By Satya</p>
      </footer>
    </div>
  );
};

export default News;
