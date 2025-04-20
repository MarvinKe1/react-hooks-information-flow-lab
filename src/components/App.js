import React, { useState } from "react";
import Header from "./Header";
import ShoppingList from "./ShoppingList";
import itemData from "../data/items";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleDarkModeClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const itemsToDisplay = itemData.filter((item) => 
    selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      <Header onDarkModeClick={handleDarkModeClick} />
      <ShoppingList 
        items={itemsToDisplay}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default App;