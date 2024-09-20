import Course from "../model/Course.js";
import GenericQueries from "./gerenicQueries.js";

export default class CourseService extends GenericQueries {
  constructor(dao) {
    super(dao, Course.model);
  }
}
