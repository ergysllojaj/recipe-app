import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { useRef } from "react";
import { useState } from "react";
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, method, cookingTime, ingredients);
    postData({
      title,
      method,
      cookingTime: cookingTime + " minutes",
      ingredients,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title"> Create a Recipe </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients</span>
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            ref={ingredientInput}
          />
          <button className="btn" onClick={handleAdd}>
            Add
          </button>
        </label>
        <p>
          Current Ingredients:
          {ingredients.map((i) => (
            <em key={i}> {i}, </em>
          ))}
        </p>
        <label>
          <span>Method</span>
          <textarea
            type="text"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Cooking Time</span>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
