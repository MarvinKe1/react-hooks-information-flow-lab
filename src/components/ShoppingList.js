import React from "react";
import Item from "./Item";
import Filter from "./Filter";

function ShoppingList({ items, onCategoryChange, selectedCategory }) {
  
  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="ShoppingList" data-testid="shopping-list">
      <Filter 
        selectedCategory={selectedCategory} 
        onCategoryChange={onCategoryChange} 
      />
      <ul className="Items">
        {filteredItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            category={item.category}
            data-testid={`item-${item.category}`}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
