const express = require('express');
const multer = require('multer');
const path = require('path');
let postIdCounter = 1; // Counter for unique IDs
const fs = require('fs')


const routes = express.Router();

// Sample travel posts
const travelPosts = [
    {
        title: "Istanbul Heritage Trail",
        image: "../images/trail.avif",
        content: "Explore the vibrant culture and history of Istanbul, where East meets West.",
        slug: "istanbul-heritage-trail"
    },
    {
        title: "Turkish Extravaganza",
        image: "../images/tr-3.avif",
        content: "Experience the unique landscapes and hot air balloon rides in Cappadocia.",
        slug: "turkish-extravaganza"
    },
    {
        title: "Istanbul Palace",
        image: "../images/palace.avif",
        content: "Explore the vibrant culture and history of Istanbul, where East meets West.",
        slug: "istanbul-palace"
    },
    {
        title: "Antalya",
        image: "../images/antalya.webp",
        content: "Enjoy the beautiful beaches and rich history of Antalya.",
        slug: "antalya"
    },
    {
        title: "Ankara",
        image: "../images/ankara.jpg",
        content: "Explore the capital city of Turkey, rich in culture and history.",
        slug: "istanbul-ankara"
    },
    {
        title: "Pamukkale",
        image: "../images/pamukkale.jpg",
        content: "Visit the stunning terraces of Pamukkale, known for its thermal springs.",
        slug: "pamukkale"
    },
];

// Array to hold blog posts
const posts = [];

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Route for the dashboard (blog page)
routes.get('/blog', (req, res) => {
    res.render('blog', { posts }); // Render the blog page with the posts array
});

// Handle adding a new post
routes.post('/add', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file.path; // Get the path of the uploaded image

    // Create a new post object
    const newPost = {
        id: postIdCounter++, // Increment the counter for each new post
        title,
        image,
        content,
        slug: title.toLowerCase().replace(/ /g, '-') // Create a slug from the title
    };

    // Add the new post to the posts array
    posts.push(newPost);

    // Redirect to the blog page to display the new post
    res.redirect('/blog');
});

// Route for individual travel post
routes.get('/travel/:slug', (req, res) => {
    const slug = req.params.slug;
    const post = travelPosts.find(p => p.slug === slug); // Find the post by slug
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render('post', { post }); // Render the travel post detail view
});

// Route for individual blog post
routes.get('/blog/:slug', (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(p => p.slug === slug); // Find the post by slug
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render('post', { post }); // Render the blog post detail view
});


// Other routes
const { loginpage, registerpage, registeruser, loginuser, travel, eat, relax, add, deletedata } = require('../controllers/authController');

routes.get('/', loginpage);
routes.get('/register', registerpage);
routes.post('/registeruser', registeruser);
routes.post('/loginuser', loginuser);
routes.get('/travel', travel);
routes.get('/eat', eat);
routes.get('/relax', relax);
routes.get('/add', add);
// routes.get('/delete',deletedata);

routes.get('/deleteData', async (req, res) => {
    try {
        const id = parseInt(req.query.deleteid); // Get the ID from the query parameters

        // Find the index of the post to delete
        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex !== -1) {
            // Remove the image file from the server
            fs.unlinkSync(posts[postIndex].image); // Ensure the path is correct

            // Remove the post from the array
            posts.splice(postIndex, 1);
        }

        res.redirect('/blog'); // Redirect back to the blog page
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting post');
    }
});

// Route to get the edit form
routes.get('/edit/:slug', (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(p => p.slug === slug); // Find the post by slug
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render('edit', { post }); // Render the edit view with the post data
});

// Route to handle the update
routes.post('/edit/:slug', upload.single('image'), (req, res) => {
    const slug = req.params.slug;
    const postIndex = posts.findIndex(p => p.slug === slug); // Find the post index

    if (postIndex === -1) {
        return res.status(404).send('Post not found');
    }

    const { title, content } = req.body;
    const updatedPost = {
        ...posts[postIndex], // Keep existing data
        title,
        content,
        slug: title.toLowerCase().replace(/ /g, '-') // Update slug
    };

    // If a new image is uploaded, update the image path
    if (req.file) {
        // Remove the old image file from the server
        fs.unlinkSync(posts[postIndex].image); // Ensure the path is correct
        updatedPost.image = req.file.path; // Update image path
    }

    // Update the post in the array
    posts[postIndex] = updatedPost;

    res.redirect('/blog'); // Redirect to the blog page
});

module.exports = routes;