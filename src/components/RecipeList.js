import "./RecipeList.css";
import { Link } from "react-router-dom";
import React from "react";

export default function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return (
      <div className="error">
        <p>No recipes found</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className="card" key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipe/${recipe.id}`}>Cook this</Link>
        </div>
      ))}
    </div>
  );
}
