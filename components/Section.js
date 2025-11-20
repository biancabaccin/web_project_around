export default class Section {
  constructor({ items, renderer }, cardElement) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(cardElement);
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
