import React, { useEffect, useState, useContext } from "react";
import Blog from "../components/Blog";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import AuthorAnalytics from "./AuthorAnalytics";

const Profile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const URL = `${BASE_URL}/api/blogs/myblogs/`;
  const [loading, setLoading] = useState(false);
  const { user, authToken } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setLoading(true);
    const getBlogs = async () => {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
      });
      const data = await response.json();
      setBlogs(data);
    };
    getBlogs();
    setLoading(false);
  }, [authToken]);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/profile/${user.user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
      });
      const data = await response.json();
      setProfile(data);
    };
    getProfile();
    setLoading(false);
  }, [authToken]);

  if (!user) {
    return (
      <>
        <h1 className="text-white text-center mt-20">
          You are logged out. Please
          <Link to="/login">
            <span className="text-emerald-600"> Login </span>
          </Link>
          first to view your profile.
        </h1>
      </>
    );
  } else {
    return (
      <>
        <AuthorAnalytics />
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Loader type={"bubbles"} color={"deepskyblue"} />
          </div>
        )}

        <div className="flex flex-wrap md:flex-nowrap justify-around items-center p-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg shadow-xl mb-8">
          <div className="space-y-5 text-center md:text-left text-white">
            <p className="text-4xl font-bold">
              Hi! <span className="text-yellow-300">{profile.username}</span>, welcome to
              <span className="site-logo">
                <span className="text-yellow-300"> C</span>onnect
                <span className="text-yellow-300">W</span>rite
              </span>
            </p>
            <p className="text-lg font-semibold">
              {blogs.length > 0 ? (
                <>
                  You have written{" "}
                  <span className="text-yellow-300">{blogs.length}</span>
                  {blogs.length > 1 ? " blogs" : " blog"} so far.
                </>
              ) : (
                <>
                  You have not written any blogs yet. Write your first blog now!
                </>
              )}
            </p>
            <button className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition duration-300">
              <Link to="/create">Create Blog</Link>
            </button>
          </div>
          <img
            className="max-w-md rounded-full border-4 border-yellow-300 shadow-lg"
            src={`${BASE_URL}${profile.photo}`}
            alt="Profile"
          />
        </div>

        {blogs.length > 0 && (
          <p className="text-3xl font-bold text-center text-white-900 mb-10">
            My Blogs
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-blue-400 p-5 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              <Blog
                id={blog.id}
                title={blog.title}
                content={blog.content}
                author_name={blog.author_name}
                date_created={blog.date_created}
                date_updated={blog.date_updated}
                image={blog.image}
                category={blog.category}
                total_likes={blog.total_likes}
                reading_time={blog.reading_time}
                author_bio={blog.author_bio}
                author_photo={blog.author_photo}
                comment_count={blog.comment_count}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default Profile;
