import React, { useState } from "react";
import "./Profilecard.css";
import axios from 'axios';

function Profilecard() {
  // Sample data for cards
  const cardData = [
    {
      title: "Arishta and Asava ",
      description:
        "Ahiphenasava is used for the treatment of severe diarrhea. It helps to reduce the frequency of loose stools in cholera.",
      keyIngredients: ["Rectified Spirit", "Nagarmotha", "Indrayava","Shuddha Ahiphena"],
      learnMoreLink: "https://www.ayurtimes.com/asava-arishta/",
    },
    {
        title: "Ahiphenasava",
        description:
          "All Arishta and Asava preparations improve digestion and metabolism in the body.",
        keyIngredients: ["Dhataki", "flowers", "sugar"],
        learnMoreLink: "https://www.ayurtimes.com/asava-arishta/",
      },
      {
        title: "Arishta and Asava 1",
        description:
          "All Arishta and Asava preparations improve digestion and metabolism in the body.",
        keyIngredients: ["Dhataki", "flowers", "sugar"],
        learnMoreLink: "https://www.ayurtimes.com/asava-arishta/",
      },
      {
        title: "Arishta and Asava 1",
        description:
          "All Arishta and Asava preparations improve digestion and metabolism in the body.",
        keyIngredients: ["Dhataki", "flowers", "sugar"],
        learnMoreLink: "https://www.ayurtimes.com/asava-arishta/",
      },
    {
      title: "Arishta and Asava 2",
      description:
        "All Arishta and Asava preparations improve digestion and metabolism in the body.",
      keyIngredients: ["Dhataki", "flowers", "sugar"],
      learnMoreLink: "https://www.ayurtimes.com/asava-arishta/",
    },
    // Add more card data here...
  ];

  // State for the search query and selected option
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("Disease");

  // Function to handle input changes
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle dropdown option changes
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Function to filter cards based on the search query and selected option
  const handleSearchClick = () => {
    // Implement your search logic here based on the searchQuery and selectedOption
    // For now, let's just console.log the searchQuery and selectedOption
    console.log("Search query:", searchQuery);
    console.log("Selected option:", selectedOption);
    // axi_query = "http://127.0.0.1:5000/query/"+{selectedOption}+"/"+{searchQuery}
    axios.get("http://127.0.0.1:5000/query/"+selectedOption+"/"+searchQuery).then(function (response) {
        console.log(response);
        // and give back to website
  }).catch(function (error) {
    console.log(error, 'error');
    if (error.status === 401) {
        alert("Invalid credentials");
    }
});
  }

  return (
    <div className="App">
      {/* Input search bar */}
      <div className="empty"></div>
      <h1 className="bhashan">Heal with Ayurveda</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder={`Search for ${selectedOption}...`}
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="search-input"
        />
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="search-dropdown"
        >
          <option value="Disease">Search for Disease</option>
          <option value="Medicine">Search for Medicine</option>
        </select>
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      <div className="container">
        {cardData.map((card, index) => (
          <article className="card" key={index}>
            <div className="content">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <b>Key ingredients</b>
              <ul className="chips">
                {card.keyIngredients.map((ingredient, i) => (
                  <li className="chip" key={i}>
                    {ingredient}
                  </li>
                ))}
              </ul>
              <div className="action-buttons">
                <a href="#book-a-mentor" title="Book a lector">
                  Book a lector
                </a>
                <a href={card.learnMoreLink} title="Learn More">
                  Learn More...
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Profilecard;