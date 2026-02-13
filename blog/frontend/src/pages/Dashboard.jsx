import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const { user } = useAuth();

    useEffect(() => {
        fetchBlogs();
    }, [activeTab]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            let endpoint = '/api/blogs';
            if (activeTab === 'my') {
                endpoint = '/api/blogs/my';
            } else if (activeTab === 'saved') {
                endpoint = '/api/blogs/saved';
            }

            const res = await axios.get(endpoint);
            setBlogs(res.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="container fade-in">
            <div className="dashboard-header">
                <div className="page-header">
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Explore and manage your blog posts</p>
                </div>
                <Link to="/add-blog" className="btn btn-primary">
                    + Create New Blog
                </Link>
            </div>

            <div className="dashboard-tabs">
                <button
                    className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    All Blogs
                </button>
                <button
                    className={`tab-btn ${activeTab === 'my' ? 'active' : ''}`}
                    onClick={() => setActiveTab('my')}
                >
                    My Blogs
                </button>
                <button
                    className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
                    onClick={() => setActiveTab('saved')}
                >
                    Saved
                </button>
            </div>

            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            ) : blogs.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📝</div>
                    <h3 className="empty-state-title">
                        {activeTab === 'all' && 'No blogs yet'}
                        {activeTab === 'my' && 'You haven\'t created any blogs'}
                        {activeTab === 'saved' && 'No saved blogs'}
                    </h3>
                    <p>
                        {activeTab === 'all' && 'Be the first to create a blog post!'}
                        {activeTab === 'my' && 'Start writing your first blog post.'}
                        {activeTab === 'saved' && 'Save blogs to read them later.'}
                    </p>
                    {(activeTab === 'all' || activeTab === 'my') && (
                        <Link to="/add-blog" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            Create Blog
                        </Link>
                    )}
                </div>
            ) : (
                <div className="blog-grid">
                    {blogs.map((blog) => (
                        <Link to={`/blog/${blog._id}`} key={blog._id} style={{ textDecoration: 'none' }}>
                            <div className="card">
                                <h3 className="card-title">{blog.title}</h3>
                                <p className="card-content">{blog.content}</p>
                                <div className="card-meta">
                                    <span className="card-author">
                                        By {blog.author?.username || 'Unknown'}
                                    </span>
                                    <span>{formatDate(blog.createdAt)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
