import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuthorAnalytics = () => {
    const [data, setData] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;


    useEffect(() => {
        axios.get(`${BASE_URL}/api/blogs/blog_dashboard/`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching analytics data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Author Analytics</h1>
            {data.map((author, index) => (
                <div key={index} className="author-card">
                    <h2>{author.author}</h2>
                    <p>Total Blogs: {author.total_blogs}</p>
                    <p>Total Likes: {author.total_likes}</p>
                    <p>Total Comments: {author.total_comments}</p>
                    <h3>Blogs:</h3>
                    {author.blogs.map(blog => (
                        <div key={blog.id} className="blog-card">
                            <h4>{blog.title}</h4>
                            <p>Likes: {blog.likes}</p>
                            <p>Comments: {blog.comments}</p>
                            <h5>Comments Details:</h5>
                            {blog.comments_details.map(comment => (
                                <div key={comment.id}>
                                    <p>{comment.content} by {comment.author__username}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AuthorAnalytics;
