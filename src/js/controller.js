import recipeView from './views/recipeView.js'
import * as model from './modal.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import 'core-js/stable'
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'
import { MODAL_TIMEOUT } from './config.js'

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controlRecipes=async function(){
  try{
const id=window.location.hash.slice(1)
if(!id) return

resultsView.update(model.getSearchResPage())

    recipeView.renderSpinner()
await model.loadRecipe(id)

recipeView.render(model.state.recipe)

bookmarksView.update(model.state.bookmark)

}catch(err){
recipeView.renderError()

}};


const controlSearchResults=async function(){
  try{
const query=searchView.getQuery()
if(!query) return
resultsView.renderSpinner()

    await model.loadSearchResults(query)
//resultsView.render(model.state.search.results)
resultsView.render(model.getSearchResPage(1))
paginationView.render(model.state.search)
  }catch(err){
console.log(err)
  }
}

controlSearchResults()
const controlPagination=function(gotoPage){
  resultsView.render(model.getSearchResPage(gotoPage))
  paginationView.render(model.state.search)
  }

const controlServings=function(newServings){
  model.updateServings(newServings)
  recipeView.update(model.state.recipe)
}

const controlAddbookMark=function(){
if(!model.state.recipe.bookmarked)
model.addBookmark(model.state.recipe)
else
model.deleteBookMark(model.state.recipe.id)

recipeView.update(model.state.recipe)
bookmarksView.render(model.state.bookmark)
}

const controlBookmarks=function(){

bookmarksView.render(model.state.bookmark)

}

const controlAddRecipe=async function(newRecipe){
  try{
        addRecipeView.renderSpinner()
        await model.uploadRecipe(newRecipe)
        console.log(model.state.recipe)
        recipeView.render(model.state.recipe)
        addRecipeView.renderMessage()  
        bookmarksView.render(model.state.bookmark)

        window.history.pushState(null,'',`#${model.state.recipe.id}`)
        setTimeout(() => {
                            addRecipeView.toggleWindow()
                          }, MODAL_TIMEOUT*1000);

}catch(err){
console.error(err)
addRecipeView.renderError(err)  }
}


const init =function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
searchView.addHandlerSearch(controlSearchResults)
recipeView.addBookMarkHandler(controlAddbookMark)
addRecipeView.addHandlerUpload(controlAddRecipe)
paginationView.addhandlerClick(controlPagination)
};
init()
