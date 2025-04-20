class Utils {
  static emptyElement(element) {
    element.innerHTML = "";
  }

  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }

  static showLoading(element) {
    this.showElement(element);
  }

  static hideLoading(element) {
    this.hideElement(element);
  }

  static sleep(response) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response);
      }, 1000),
    ); // bisa diubah ke 3000 kalau mau delay lebih lama
  }
}

export default Utils;
