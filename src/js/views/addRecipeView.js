import View from './View';

class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _modal = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpenModal = document.querySelector('.nav__btn--add-recipe');
  _btnCloseModal = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowModal();
    this._addHandlerCloseModal();
  }

  _addHandlerShowModal() {
    this._btnOpenModal.addEventListener('click', this.toggleModal.bind(this));
  }

  _addHandlerCloseModal() {
    this._btnCloseModal.addEventListener('click', this.toggleModal.bind(this));
  }

  _addHandlerSubmit(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  toggleModal() {
    this._overlay.classList.toggle('hidden');
    this._modal.classList.toggle('hidden');
  }

  _generateMarkup() {}
}

export default new addRecipeView();
