import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import Clander from './Clander';
import './News.css';
import userImg from '../assets/Images/userImg.png';
import noImg from '../assets/Images/noImg.png';
import axios from 'axios';

const categories = [
  {
    category: 'general',
    api: 'https://newsapi.org/v2/top-headlines?category=general&country=us&apiKey=cf67774cafc54591939708d2a2ae9885',
  },
  {
    category: 'world',
    api: 'https://newsapi.org/v2/top-headlines?language=en&apiKey=cf67774cafc54591939708d2a2ae9885',
  },
  {
    category: 'business',
    api: 'https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=cf67774cafc54591939708d2a2ae9885',
  },
  {
    category: 'technology',
    api: 'https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=cf67774cafc54591939708d2a2ae9885',
  },
  {
    category: 'entertainment',
    api: 'https://newsapi.org/v2/top-headlines?category=entertainment&country=us&apiKey=cf67774cafc54591939708d2a2ae9885',
  },
  {
    category: 'sports',
    api: 'https://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=cf67774cafc54591939708d2a2ae9885',
  },
  {
    category: 'science',
    api: 'https://newsapi.org/v2/top-headlines?category=science&country=us&apiKey=cf67774cafc54591939708d2a2ae9885',
  },
  {
    category: 'health',
    api: 'https://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=cf67774cafc54591939708d2a2ae9885',
  }
];

const News = () => {
  const [headline, setheadline] = useState(null);
  const [news, setnews] = useState([]);
  const [selectedCategory, setselectedCategory] = useState('general');

  useEffect(() => {
    const fetchNews = async () => {
      const selected = categories.find(cat => cat.category === selectedCategory);
      if (!selected) return;

      try {
        const response = await axios.get(selected.api);
        const fetchedNews = response.data.articles;

        fetchedNews.forEach((article) => {
          if (!article.urlToImage) {
            article.urlToImage = noImg;
          }
        });

        setheadline(fetchedNews[0]);
        setnews(fetchedNews.slice(1, 7));
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  const handelCategoryChange = (e, category) => {
    e.preventDefault();
    setselectedCategory(category);
  };

  useEffect(() => {
    console.log(news);
  }, [news]);

  return (
    <div className='news'>
      <header className='news-header'>
        <h1 className="logo">SOCIAL SPHERE</h1>
        <div className="search-bar">
          <form>
            <input type="text" placeholder='Search News...' />
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
              {categories.map(({ category }) => (
                <a href="#" key={category} className='nav-link' onClick={(e) => handelCategoryChange(e, category)}>
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
              <img src={headline.urlToImage || noImg} alt={headline.title} />
              <h2 className="headline-title">{headline.title}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item">
                <img src={article.urlToImage || noImg} alt={article.title} />
                <h3>{article.title}<i className="i fa-regular fa-bookmark bookmark"></i></h3>
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

