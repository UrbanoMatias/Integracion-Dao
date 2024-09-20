import mongoose from "mongoose";

let Schema = mongoose.Schema;

export default class Course {
  constructor(data) {
    this.data = data;
  }
  static get model() {
    return "Course";
  }
  static get schema() {
    return {
      courseName: { type: String, required: true, unique: true },
      bookId: { type: Schema.Types.ObjectId, ref: "Books", require: true },
      teacherId: { type: Schema.Types.ObjectId, ref: "User", require: true },
      asignature: {
        type: Schema.Types.ObjectId,
        ref: "Asignature",
        require: true,
      },
      period: { type: Date }, //cuando devuelvo las fechas debo cambiarle el formato,investigar el tema de fechas
      startDate: { type: Date },
    };
  }
}
