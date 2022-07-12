import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received data object as markup to the DOM or returns the markup only
   * @param {Object | Object[]} data The data/recipe to be rendered
   * @param {boolean} [render=true] if false, the func returns the markup only instead of rendering it
   * @returns {undefined | String}
   * @this {Object} View instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const currentEl = currentElements[i];
      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currentEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currentEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  loadSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(msg = this._errorMsg) {
    const markup = `
          <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${msg}</p>
          </div> 
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccess(msg = this._successMsg) {
    const markup = `
          <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${msg}</p>
          </div> 
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
