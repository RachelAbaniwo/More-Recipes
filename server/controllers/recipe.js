import recipes from '../models/recipe';
/**
 * @class Recipe
 */
class Recipe {
/**
   * @returns {Object} addRecipe
   * @param {*} req
   * @param {*} res
   */
    static addRecipe(req,res) {
       let newId = recipes.lenght + 1 
       const object = {
                        id: newId,
                        userName: req.body.userName,
                        recipeName: req.body.recipeName,
                        recipeType: req.body.recipeType,
                        ingredients: req.body.ingredients,
                        description: req.body.description,
                        direction: req.body.direction,
                        upvotes: req.body.upvotes,
                        downvotes: req.body.downvotes,
                        favorites: req.body.favorites,

                      }

                      recipes.push(object);
                        return res.json ({
                        message:'success',
                        error:'false'
                      });
                   }
    /**
   * @returns {Object} modifyRecipe
   * @param {*} req
   * @param {*} res
   */

    static modifyRecipe(req,res) {
      
      for (let i = 0; i < recipes.length; i++) {
        
        if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
          recipes[i].userName = req.body.userName;
          recipes[i].recipeName = req.body.recipeName;
          recipes[i].recipeType = req.body.recipeType;
          recipes[i].ingredients = req.body.ingredients;
          recipes[i].description = req.body.description;
          recipes[i].direction = req.body.direction;
          recipes[i].upvotes = req.body.upvotes;
          recipes[i].downvotes = req.body.downvotes;
          recipes[i].favorites = req.body.favorites;
          
          return res.json({
            
            recipes,
            message: 'success',
            error: false
          });
        }
      }
      return res.status(404).json({
        message: 'recipe not found',
        error: true
      });
    }
    /**
   * @returns {Object} deleteRecipe
   * @param {*} req
   * @param {*} res
   */
    static deleteRecipe(req,res) {
      
      for (let i = 0; i < recipes.length; i++) {
        
        if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
          
          recipes.splice(i, 1);
          return res.json({
            message: 'success',
            error: false
          });
        }
      }
      
      return res.status(404).json({
        message: 'recipe not found',
        error: true
      });
    }
    
    /**
   * @returns {Object} getRecipe
   * @param {*} req
   * @param {*} res
   */
    static getRecipe(req, res) {
      
      return res.json({
        recipes
      });
    }
    
  }
    
  export default Recipe;


  