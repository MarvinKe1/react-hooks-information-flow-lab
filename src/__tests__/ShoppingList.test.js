import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ShoppingList from "../components/ShoppingList";
import userEvent from "@testing-library/user-event";

const testData = [
  { id: 1, name: "Yogurt", category: "Dairy" },
  { id: 2, name: "Pomegranate", category: "Produce" },
  { id: 3, name: "Lettuce", category: "Produce" },
  { id: 4, name: "String Cheese", category: "Dairy" },
  { id: 5, name: "Cookies", category: "Dessert" },
];

test("displays all items when initially rendered", () => {
  const mockOnCategoryChange = jest.fn();
  const { container } = render(
    <ShoppingList
      items={testData}
      selectedCategory="All"
      onCategoryChange={mockOnCategoryChange}
    />
  );
  expect(container.querySelector(".Items").children).toHaveLength(
    testData.length
  );
});

test("displays only items that match the selected category", async () => {
  const user = userEvent.setup();
  let selectedCategory = "All";
  const handleCategoryChange = jest.fn((e) => {
    selectedCategory = e.target.value;
    rerenderComponent(); 
  });

  const { container, rerender } = render(
    <ShoppingList
      items={testData}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
    />
  );

  const rerenderComponent = () => {
    rerender(
      <ShoppingList
        items={testData}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
    );
  };

  
  await user.selectOptions(screen.getByRole("combobox"), "Dairy");
  expect(container.querySelector(".Items").children).toHaveLength(2);

  
  await user.selectOptions(screen.getByRole("combobox"), "Dessert");
  expect(container.querySelector(".Items").children).toHaveLength(1);
});

