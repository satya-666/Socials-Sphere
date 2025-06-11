import React, { useState } from 'react';
import News from './Components/News'
import Blogs from './Components/Blogs'
import './index.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
const App = () => {
  const [showNews, setShowNews] = React.useState(true);
  const [showBlogs, setShowBlogs] = React.useState(false);
  const [blogs, setBlogs] = useState([]);

  const handeleCreateBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  }

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  }
  const handleBackToNews = () => {
    setShowNews(true);
    setShowBlogs(false);
  }
  return (
    <div className='container'>
      <div className="social-sphere-app">
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs}
        />}
        {showBlogs && <Blogs onBack={handleBackToNews} onCreateBlog={handeleCreateBlog}
        />}
      </div>
    </div>
  )
}

export default App
