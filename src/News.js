import React, { useState, useEffect } from 'react';

const News = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('us'); // Default country is 'us'
  const [loading, setLoading] = useState(false); // Added loading state to indicate data fetching

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, selectedCountry]); // Fetch news whenever the selected category or country changes

  const fetchNews = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=8d9290791edb4faebf47f38a5e269e0b`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`; // Add category parameter to the URL
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles);
        setFilteredNews(data.articles);
      } else {
        setNews([]);
        setFilteredNews([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]);
      setFilteredNews([]);
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    filterNews(searchTerm, selectedCategory);
  };

  const filterNews = (searchTerm, category) => {
    let filteredArticles = news;
    if (searchTerm) {
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category) {
      filteredArticles = filteredArticles.filter(article =>
        article.category && article.category.toLowerCase() === category.toLowerCase()
      );
    }
    setFilteredNews(filteredArticles);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="container mt-5">
      <input
        type="text"
        placeholder="Search news..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className=" mb-3">
      <button onClick={() => handleCategoryChange('')} className={`btn m-2 ${selectedCategory === '' ? 'btn-primary' : 'btn-secondary'}`}>All</button>
        <button onClick={() => handleCategoryChange('business')} className={`btn m-2 ${selectedCategory === 'business' ? 'btn-primary' : 'btn-secondary'}`}>Business</button>
        <button onClick={() => handleCategoryChange('entertainment')} className={`btn  m-2 ${selectedCategory === 'entertainment' ? 'btn-primary' : 'btn-secondary'}`}>Entertainment</button>
        <button onClick={() => handleCategoryChange('general')} className={`btn m-2 ${selectedCategory === 'general' ? 'btn-primary' : 'btn-secondary'}`}>General</button>
        <button onClick={() => handleCategoryChange('health')} className={`btn m-2 ${selectedCategory === 'health' ? 'btn-primary' : 'btn-secondary'}`}>Health</button>
        <button onClick={() => handleCategoryChange('science')} className={`btn m-2 ${selectedCategory === 'science' ? 'btn-primary' : 'btn-secondary'}`}>Science</button>
        <button onClick={() => handleCategoryChange('sports')} className={`btn m-2 ${selectedCategory === 'sports' ? 'btn-primary' : 'btn-secondary'}`}>Sports</button>
        <button onClick={() => handleCategoryChange('technology')} className={`btn m-2 ${selectedCategory === 'technology' ? 'btn-primary' : 'btn-secondary'}`}>Technology</button>
         
      </div>

      <div className="mb-3">
        <button onClick={() => handleCountryChange('us')} className={`btn m-2 ${selectedCountry === 'us' ? 'btn-primary' : 'btn-secondary'}`}>US</button>
        <button onClick={() => handleCountryChange('in')} className={`btn m-2 ${selectedCountry === 'in' ? 'btn-primary' : 'btn-secondary'}`}>India</button>
        
      </div>
      <div className="row">
        {filteredNews.map((article, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow">
              <img src={article.urlToImage} className="card-img-top" alt={article.title} />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
