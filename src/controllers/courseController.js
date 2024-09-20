import { courseService } from "../services/index.js";

const getCourses = async (req, res) => {
  const results = await courseService.getAll();
  res.send(results);
};

const createCourse = async (req, res) => {
  const { courseName, bookId, teacherId, asignature, period, startDate } =
    req.body;
  const result = await courseService.insert({
    courseName,
    bookId,
    teacherId,
    asignature,
    period,
    startDate,
  });
  res.send(result);
};

export default {
  getCourses,
  createCourse,
};
