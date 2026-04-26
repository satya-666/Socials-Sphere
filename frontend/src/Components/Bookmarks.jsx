import React from 'react'
import './Modal.css';
import './Bookmarks.css';

import demoimage from '../assets/Images/noImg.png';
const Bookmarks = ({show, bookmarks, onClose, onSelectArticle, onDeleteBookmark}) => {
    if (!show) {
        return null;
    }
  return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <span className="close-button" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </span>
            <h2 className="bookmarks-heading">Bookmark News</h2>
            <div className="bookmarks-list">
                {bookmarks.map((article, index) => (<div className="bookmark-items" key={index} onClick={() => onSelectArticle(article)}>
                    <img src={article.urlToImage || demoimage} alt={article.title} />
                    <h3>{article.title}</h3>
            <span className="delete-button" onClick={(e) => {
                e.stopPropagation();
                onDeleteBookmark(article);}}>
                <i className="fa-regular fa-circle-xmark"></i>
            </span>
                </div>))}
                

        
            </div>
        </div>
    </div>
  )
}

export default Bookmarks
