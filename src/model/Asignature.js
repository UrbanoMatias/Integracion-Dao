export default class Asignature {
  constructor(data) {
    this.data = data;
  }
  static get model() {
    return "Asignature";
  }
  static get schema() {
    return {
      asignatureName: {
        type: String,
        required: true,
      },
    };
  }
}
