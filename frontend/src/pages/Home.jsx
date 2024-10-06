import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import notfound from "../assets/notfound.png";
import { GetContent } from "../services/GetContent";
import Loader from "../components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [filters, setFilters] = useState({
    uploaded_date: "",
    category: "",
    name: "",
  });
  const [showFilters, setShowFilters] = useState(false); // State to toggle filters

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await GetContent.fetchAllBlogs();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    // Filter blogs whenever the filters change
    const applyFilters = () => {
      let result = [...blogs];

      if (filters.uploaded_date) {
        const filterDate = new Date(filters.uploaded_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
        result = result.filter(blog => {
          const blogDate = new Date(blog.date_created.split(',')[0]);
          const blogFormattedDate = blogDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
          return blogFormattedDate === filterDate;
        });
      }

      if (filters.category) {
        result = result.filter(blog => blog.category.toLowerCase().includes(filters.category.toLowerCase()));
      }

      if (filters.name) {
        result = result.filter(blog => blog.author_name.toLowerCase().includes(filters.name.toLowerCase()));
      }

      setFilteredBlogs(result);
    };

    applyFilters();
  }, [filters, blogs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      {/* Toggle Button for Filters */}
      <div className="p-4 text-center">
        <button
          onClick={toggleFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Form (Collapsible) */}
      {showFilters && (
        <div className="p-4 mx-auto w-full md:w-3/4 lg:w-1/2 bg-gray-100 rounded-lg shadow-md transition-all duration-500 ease-in-out mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Filter Blogs</h2>
          <form className="space-y-4">
            <div className="mb-4">
              <label htmlFor="uploaded_date" className="block text-sm font-medium text-gray-700">Uploaded Date</label>
              <input
                type="date"
                id="uploaded_date"
                name="uploaded_date"
                value={filters.uploaded_date}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Programming">Programming</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Fashion">Fashion</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Gaming">Gaming</option>
                <option value="Music">Music</option>
                <option value="Movies">Movies</option>
                <option value="TV">TV</option>
                <option value="Books">Books</option>
                <option value="News">News</option>
                <option value="Politics">Politics</option>
                <option value="Science">Science</option>
                <option value="Education">Education</option>
                <option value="History">History</option>
                <option value="Art">Art</option>
                <option value="Design">Design</option>
                <option value="Photography">Photography</option>
                <option value="Economics">Economics</option>
                <option value="Finance">Finance</option>
                <option value="Law">Law</option>
                <option value="Religion">Religion</option>
                <option value="Philosophy">Philosophy</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Author Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </form>
        </div>
      )}

      {/* Loader */}
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

      {/* Blog Display */}
      {!loading && filteredBlogs.length === 0 ? (
        <>
          <p className="text-2xl font-semibold text-center">
            No blog entries found!
          </p>
          <p className="text-primary text-center">
            You can create a blog from your profile tab
          </p>
          <img src={notfound} alt="No blogs found" className="w-1/2 mx-auto" />
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {filteredBlogs.map((blog) => (
            <Blog
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              author_name={blog.author_name}
              author_bio={blog.author_bio}
              author_photo={blog.author_photo}
              date_created={blog.date_created}
              date_updated={blog.date_updated}
              image={blog.image}
              category={blog.category}
              total_likes={blog.total_likes}
              likes={blog.likes}
              reading_time={blog.reading_time}
              comment_count={blog.comment_count}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
