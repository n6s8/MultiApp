import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Recipes.module.css";

interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strYoutube: string;
    [key: string]: string | null;
}

export default function Recipes() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    const fetchRecipes = async (query: string) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            console.log(data);
            setRecipes(data.meals || []);
        } catch (error) {
            console.error("Error fetching recipes", error);
        }
    };

    const addToFavorites = (recipe: Recipe) => {
        setFavorites((prev) => [...prev, recipe]);
    };

    useEffect(() => {
        fetchRecipes("");
    }, []);

    return (
        <div className={styles.main}>
            <h1>Recipe Finder</h1>
            <input
                type="text"
                placeholder="Search for a recipe..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => {
                fetchRecipes(search);
            }}>Search
            </button>
            <button onClick={() => {
                navigate("/");
            }}>Back to Home
            </button>
            <div className={styles.mails}>

                <div className={styles.recipes}>
                    <h2>Searching</h2>
                    {recipes.map((recipe) => (
                        <div key={recipe.idMeal} className={styles.recipeCard}>
                            <img src={recipe.strMealThumb} alt="Meal"/>
                            <h3>{recipe.strMeal}</h3>
                            <p>Ingredients:</p>
                            <ul>
                                {Array.from({length: 20}, (_, i) => recipe[`strIngredient${i + 1}`])
                                    .filter(ingredient => ingredient && ingredient.trim() !== "")
                                    .map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                            </ul>
                            <p>
                                YouTube link: <a href={recipe.strYoutube} target="_blank">Video</a>
                            </p>
                            <button style={{cursor: "pointer"}} onClick={() => addToFavorites(recipe)}>Add to
                                Favorites
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.selected}>
                    <h2>Favorites</h2>
                    <div className={styles.favorites}>
                        {favorites.map((recipe) => (
                            <div key={recipe.idMeal} className={styles.recipeCard}>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
                                <h3>{recipe.strMeal}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};