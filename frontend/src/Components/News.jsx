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
import BlogsModal from './BlogsModal';
import { useAuth } from "./authcontext";
import { staticNews } from './staticNews';

const API_KEY = 'da1e10a00423e24726010658371a3ca1';


const categories = [
  'general',
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health',
  'world',
  'nation'
];

// Available countries for dropdown
const countries = [
  { code: 'us', name: 'United States' },
  { code: 'in', name: 'India' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'au', name: 'Australia' },
  { code: 'ca', name: 'Canada' }
];

const News = ({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) => {
  const [headline, setHeadline] = useState(null);
  const { logout, user } = useAuth();
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);

  // Country selection
  const [country, setCountry] = useState('us');

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  // Fetch news whenever category, search, country, or page changes
  useEffect(() => {
    const fetchNews = async () => {
      let url = '';

      if (searchQuery) {
        // Search endpoint
        url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=en&country=${country}&max=10&page=${page}&apikey=${API_KEY}`;
      } else if (selectedCategory === 'world') {
        // World category
        url = `https://gnews.io/api/v4/top-headlines?topic=world&lang=en&country=${country}&max=10&page=${page}&apikey=${API_KEY}`;
      } else if (selectedCategory === 'nation') {
        // Nation fallback → search by country keyword
        url = `https://gnews.io/api/v4/search?q=${country}&lang=en&max=10&page=${page}&apikey=${API_KEY}`;
      } else {
        // Other categories
        url = `https://gnews.io/api/v4/top-headlines?topic=${selectedCategory}&lang=en&country=${country}&max=10&page=${page}&apikey=${API_KEY}`;
      }

      try {
        const response = await axios.get(url);
        const articles = response.data.articles.map(article => ({
          ...article,
          image: article.image || noImg
        }));

        if (page === 1) {
          // Reset on first page
          setHeadline(articles[0] || null);
          setNews(articles.slice(1, 7));
        } else {
          // Append for "Load More"
          setNews(prev => [...prev, ...articles]);
        }
      } catch (error) {
        console.error('Failed to fetch news, switching to static mode:', error);
        // Fallback to static news
        if (page === 1) {
          setHeadline(staticNews[0]);
          setNews(staticNews.slice(1));
        }
        // If page > 1, maybe just don't append anything or show a message? 
        // For now, simpler to just load static on first page error.
      }
    };

    fetchNews();
  }, [selectedCategory, searchQuery, country, page]);

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
    setSearchQuery('');
    setPage(1); // reset pagination
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(1); // reset pagination
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

  const handelBlogClick = (blog) => {
    setSelectedPost(blog);
    setShowBlogModal(true);
  };

  const closeBlogModal = () => {
    setShowBlogModal(false);
    setSelectedPost(null);
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
        <button
          onClick={logout}
          style={{
            borderRadius: '10px',
            padding: '5px',
            backgroundColor: 'black',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </header>

      <div className="news-content">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={userImg} alt="User" />
            <p>{user?.displayName}</p>
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

            {/* Country Dropdown */}
            <div className="country-filter">
              <h2 style={{ fontSize: "14px", marginTop: "15px" }}>Country</h2>
              <select value={country} onChange={(e) => { setCountry(e.target.value); setPage(1); }}>
                {countries.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>
          </nav>
        </div>

        <div className="news-section">
          {headline && (
            <div className="headline" onClick={() => handleArticleClick(headline)}>
              <img src={headline.image} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i
                  className={`fa-bookmark bookmark-icon ${bookmarks.some((bookmark) => bookmark.title === headline.title)
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
                <img src={article.image} alt={article.title} />
                <h3>
                  {article.title}
                  <i
                    className={`fa-bookmark bookmark-icon ${bookmarks.some((bookmark) => bookmark.title === article.title)
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

          {/* Load More button */}
          {news.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#222',
                  color: '#fff',
                  cursor: 'pointer'
                }}
                onClick={() => setPage(prev => prev + 1)}
              >
                Load More
              </button>
            </div>
          )}
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

        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            {blogs.map((blog, index) => (
              <div className="blog-post" onClick={() => handelBlogClick(blog)} key={index}>
                <img src={blog.image || noImg} alt={blog.title} />
                <h3>{blog.title}</h3>
                <div className="post-button">
                  <button className="edit-post" onClick={() => onEditBlog(blog)}>
                    <i className='bx bxs-edit'></i>
                  </button>
                  <button
                    className="delete-post"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDeleteBlog(blog);
                    }}
                  >
                    <i className='bx bxs-x-circle'></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedPost && showBlogModal && (
            <BlogsModal show={showBlogModal} blog={selectedPost} onClose={closeBlogModal} />
          )}
        </div>

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
