import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const res = await axios.get(`/api/blogs/${id}`);
            setBlog(res.data);
            // Check if current user has saved this blog
            if (user && res.data.savedBy) {
                setIsSaved(res.data.savedBy.includes(user._id));
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setSaving(true);
        try {
            const res = await axios.post(`/api/blogs/${id}/save`);
            setIsSaved(res.data.saved);
        } catch (error) {
            console.error('Error saving blog:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this blog?')) {
            return;
        }

        setDeleting(true);
        try {
            await axios.delete(`/api/blogs/${id}`);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert(error.response?.data?.message || 'Failed to delete blog');
        } finally {
            setDeleting(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isOwner = user && blog && blog.author?._id === user._id;

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="container">
                <div className="empty-state">
                    <h3>Blog not found</h3>
                    <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container fade-in">
            <div className="blog-detail">
                <div className="blog-detail-header">
                    <h1 className="blog-detail-title">{blog.title}</h1>
                    <div className="blog-detail-meta">
                        <span>
                            By <span className="blog-detail-author">{blog.author?.username || 'Unknown'}</span>
                        </span>
                        <span>•</span>
                        <span>{formatDate(blog.createdAt)}</span>
                        {blog.updatedAt !== blog.createdAt && (
                            <>
                                <span>•</span>
                                <span>Updated {formatDate(blog.updatedAt)}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="blog-detail-content">
                    {blog.content}
                </div>

                <div className="blog-detail-actions">
                    <button
                        onClick={handleSave}
                        className={`btn btn-secondary save-btn ${isSaved ? 'saved' : ''}`}
                        disabled={saving}
                    >
                        {isSaved ? '★ Saved' : '☆ Save'}
                    </button>

                    {isOwner && (
                        <>
                            <Link to={`/edit-blog/${blog._id}`} className="btn btn-secondary">
                                Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="btn btn-danger"
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </>
                    )}

                    <Link to="/dashboard" className="btn btn-ghost" style={{ marginLeft: 'auto' }}>
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
