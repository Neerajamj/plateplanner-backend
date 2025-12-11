import express from "express";
import Recipe from "../models/recipeModel.js";

const router = express.Router();

/**
 * GET /recipes
 * Get all recipes
 * Optional query params later if needed
 */
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (err) {
    console.error("Error fetching recipes", err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

/**
 * GET /recipes/:id
 * Get a single recipe by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    console.error("Error fetching recipe by id", err);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});

/**
 * POST /recipes/add
 * Add a new recipe
 * Body: { title, image, ingredients[], steps[], tags[], cookTime, calories, costLevel }
 */
router.post("/add", async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.json({
      message: "Recipe added successfully",
      recipe: newRecipe,
    });
  } catch (err) {
    console.error("Error adding recipe", err);
    res.status(500).json({ error: "Failed to add recipe" });
  }
});

/**
 * GET /recipes/search/:query
 * Search by title or ingredient name
 */
router.get("/search/:query", async (req, res) => {
  const query = req.params.query;

  try {
    const results = await Recipe.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { "ingredients.name": { $regex: query, $options: "i" } },
      ],
    });

    res.json(results);
  } catch (err) {
    console.error("Error searching recipes", err);
    res.status(500).json({ error: "Search failed" });
  }
});

/**
 * GET /recipes/filter/:tag
 * Filter by tag (veg / vegan / high-protein / budget)
 */
router.get("/filter/tag/:tag", async (req, res) => {
  const tag = req.params.tag;

  try {
    const results = await Recipe.find({
      tags: { $in: [tag] },
    });

    res.json(results);
  } catch (err) {
    console.error("Error filtering recipes by tag", err);
    res.status(500).json({ error: "Filter failed" });
  }
});

export default router;
