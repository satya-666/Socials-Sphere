import React, { useEffect, useState } from 'react';
import News from './Components/News'
import Blogs from './Components/Blogs'
import './index.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
const App = () => {
  const [showNews, setShowNews] = React.useState(true);
  const [showBlogs, setShowBlogs] = React.useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectPost, setSelectPost] = useState(null);
  const[isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || []
    setBlogs(savedBlogs)
  },[])

  const handeleCreateBlog = (newBlog, isEdit,) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEdit ? prevBlogs.map((blog) =>(blog === selectPost ? newBlog : blog)) : [...prevBlogs, newBlog]
      localStorage.setItem('blogs',JSON.stringify(updatedBlogs))
      return updatedBlogs
    });
    setIsEditing(false);
    setSelectPost(null);
  }
  const handleEditBlog = (blog) => {
    setSelectPost(blog);
    setIsEditing(true);
    setShowBlogs(true);
    setShowNews(false);
  }

  const handelDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== blogToDelete);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  }
  const handleBackToNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectPost(null);
  }
  return (
    <div className='container'>
      <div className="social-sphere-app">
        {showNews && 
        <News 
        onShowBlogs={handleShowBlogs} 
        blogs={blogs}
        onEditBlog={handleEditBlog} 
        onDeleteBlog={handelDeleteBlog}
        />}
        {showBlogs && 
        <Blogs 
        onBack={handleBackToNews} 
        onCreateBlog={handeleCreateBlog}
        editPost={selectPost} 
        isEditing={isEditing}
        />}
      </div>
    </div>
  )
}

export default App
