import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const clickedBtn = e.target.closest('.btn--inline');
      if (!clickedBtn) return;
      const pageNum = +clickedBtn.dataset.pageno;
      handler(pageNum);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const currentPage = this._data.page;

    if (numPages > 1) {
      if (currentPage === 1) {
        return `
            <button data-pageno="${
              currentPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button> 
        `;
      } else if (currentPage === numPages) {
        return `
            <button data-pageno="${
              currentPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>${currentPage - 1}</span>
            </button>
        `;
      } else {
        return `
            <button data-pageno="${
              currentPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>${currentPage - 1}</span>
            </button>
            <button data-pageno="${
              currentPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button> 
        `;
      }
    } else {
      return ``;
    }
  }
}

export default new PaginationView();
