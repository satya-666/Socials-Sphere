import React, { useEffect, useState } from 'react';
import News from './Components/News';
import Blogs from './Components/Blogs';
import './index.css';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from './firebase';
import SignedIn from './Components/signedin';
import SignedOut from './Components/signedout';
import Login from './Components/login';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectPost, setSelectPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(savedBlogs);
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  const handleCreateBlog = (newBlog, isEdit) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEdit
        ? prevBlogs.map((blog) => (blog === selectPost ? newBlog : blog))
        : [...prevBlogs, newBlog];

      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    setIsEditing(false);
    setSelectPost(null);
  };


  const handleEditBlog = (blog) => {
    setSelectPost(blog);
    setIsEditing(true);
    setShowBlogs(true);
    setShowNews(false);
  };

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== blogToDelete);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleBackToNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectPost(null);
  };

  return (
    <>
      <SignedIn>
        <div className='container'>
          <div className='social-sphere-app'>
            {showNews && (
              <News
                onShowBlogs={handleShowBlogs}
                blogs={blogs}
                onEditBlog={handleEditBlog}
                onDeleteBlog={handleDeleteBlog}
              />
            )}
            {showBlogs && (
              <Blogs
                onBack={handleBackToNews}
                onCreateBlog={handleCreateBlog}
                editPost={selectPost}
                isEditing={isEditing}
              />
            )}
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <Login />
      </SignedOut>
    </>
  );
};

export default App;
