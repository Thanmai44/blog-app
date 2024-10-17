import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editBlogId, setEditBlogId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/get-all-blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Failed to fetch blogs', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const createBlog = async () => {
    try {
      const newBlog = { title, content };
      await axios.post('/create-blog', newBlog);
      setTitle('');
      setContent('');
      fetchBlogs();
    } catch (error) {
      console.error('Failed to create blog', error);
    }
  };

  const updateBlog = async (id) => {
    try {
      const updatedBlog = { title: editTitle, content: editContent };
      await axios.put(`/update-blog/${id}`, updatedBlog);
      setEditBlogId(null);
      fetchBlogs();
    } catch (error) {
      console.error('Failed to update blog', error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/delete-blog/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error('Failed to delete blog', error);
    }
  };

  return (
    <div>
      <h1>Blog Management</h1>
      <div>
        <h2>Create a New Blog</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={createBlog}>Create Blog</button>
      </div>

      <div>
        <h2>All Blogs</h2>
        {blogs.map((blog) => (
          <div key={blog._id} className="blog">
            {editBlogId === blog._id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit Title"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Edit Content"
                />
                <button onClick={() => updateBlog(blog._id)}>Save</button>
              </div>
            ) : (
              <div>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <button onClick={() => deleteBlog(blog._id)}>Delete</button>
                <button
                  onClick={() => {
                    setEditBlogId(blog._id);
                    setEditTitle(blog.title);
                    setEditContent(blog.content);
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
