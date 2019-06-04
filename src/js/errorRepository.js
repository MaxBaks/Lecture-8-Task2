export default class ErrorRepository {
  constructor() {
    this.errors = new Map();
    this.errors.set(1, 'В команде не может быть больше 5 персонажей!');
    this.errors.set(2, 'В команде уже есть такой персонаж!');
  }

  getError(code) {
    if (this.errors.has(code)) {
      return Error(this.errors.get(code));
    }

    return Error('Unknown Error');
  }
}
