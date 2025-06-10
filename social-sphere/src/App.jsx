import React from 'react'
import News from './Components/News'
import Blogs from './Components/Blogs'
import './index.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
const App = () => {
  return (
    <div className='container'>
      <div className="social-sphere-app">
      {/* <News /> */}
      <Blogs />

      </div>
    </div>
  )
}

export default App
