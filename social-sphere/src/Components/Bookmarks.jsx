import React from 'react'
import './Modal.css';
import './Bookmarks.css';

import demoimage from '../assets/Images/noImg.png';
const Bookmarks = () => {
  return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <span className="close-button">
                <i className="fa-solid fa-xmark"></i>
            </span>
            <h2 className="bookmarks-heading">Bookmark News</h2>
            <div className="bookmarks-list">
                <div className="bookmark-items">
                    <img src={demoimage} alt="Demo image" />
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
            <span className="delete-button">
                <i className="fa-regular fa-circle-xmark"></i>
            </span>
                </div>

                <div className="bookmark-items">
                    <img src={demoimage} alt="Demo image" />
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
            <span className="delete-button">
                <i className="fa-regular fa-circle-xmark"></i>
            </span>
                </div>

                <div className="bookmark-items">
                    <img src={demoimage} alt="Demo image" />
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
            <span className="delete-button">
                <i className="fa-regular fa-circle-xmark"></i>
            </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Bookmarks
