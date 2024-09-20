export default class Book {
  constructor(data) {
    this.data = data;
  }
  static get model() {
    return "Books";
  }
  static get schema() {
    return {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    };
  }
}
