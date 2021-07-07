import icons from 'url:../../img/icons.svg';

import View from './View.js'
class bookmarksView extends View{

_parentEl=document.querySelector('.bookmarks__list')
_errorMessage='No bookmarks yet.Find a new recipe and bookmark it.'
_message='';


addHandlerRender(handler){

    window.addEventListener('load',handler)
}

_generateMarkUp(){

    return this._data.map(this._generateMarkUpPreview).join('')

}

_generateMarkUpPreview(result){
const id=window.location.hash.slice(1)
    return     `
    <li class="preview">
    <a class="preview__link ${result.id===id?'preview__link--active':''}" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
        <div class="preview__user-generated ${result.key?'':'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
  
      </div>
      </div>
    </a>
  </li>
 
    
    `
    
}
}
export default new bookmarksView()