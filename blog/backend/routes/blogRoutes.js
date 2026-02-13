const express = require('express');
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/blogs/saved
// @desc    Get user's saved blogs
// @access  Private
router.get('/saved', protect, async (req, res) => {
    try {
        const blogs = await Blog.find({ savedBy: req.user._id })
            .populate('author', 'username')
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        console.error('Get saved blogs error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/blogs/my
// @desc    Get current user's blogs
// @access  Private
router.get('/my', protect, async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id })
            .populate('author', 'username')
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        console.error('Get my blogs error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/blogs/:id
// @desc    Get single blog
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username email');

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        console.error('Get blog error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/blogs
// @desc    Create new blog
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { title, content } = req.body;

        const blog = await Blog.create({
            title,
            content,
            author: req.user._id
        });

        await blog.populate('author', 'username');

        res.status(201).json(blog);
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Private (owner only)
router.put('/:id', protect, async (req, res) => {
    try {
        const { title, content } = req.body;

        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check ownership
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this blog' });
        }

        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content, updatedAt: Date.now() },
            { new: true, runValidators: true }
        ).populate('author', 'username');

        res.json(blog);
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Private (owner only)
router.delete('/:id', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check ownership
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this blog' });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/blogs/:id/save
// @desc    Toggle save blog
// @access  Private
router.post('/:id/save', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const userId = req.user._id.toString();
        const savedIndex = blog.savedBy.findIndex(id => id.toString() === userId);

        if (savedIndex > -1) {
            // Already saved, remove from saved
            blog.savedBy.splice(savedIndex, 1);
        } else {
            // Not saved, add to saved
            blog.savedBy.push(req.user._id);
        }

        await blog.save();

        res.json({
            saved: savedIndex === -1,
            message: savedIndex > -1 ? 'Blog unsaved' : 'Blog saved'
        });
    } catch (error) {
        console.error('Toggle save error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
