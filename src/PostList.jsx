import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
        setSearchResults(response.data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchResults(posts); 
    } else {
      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredPosts);
    }
  };

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search by title or body..."
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Найти</button>
      </div>
      <ul className="post-list">
        {searchResults.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
