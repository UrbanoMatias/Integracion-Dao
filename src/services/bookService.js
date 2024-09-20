import Book from "../model/Books.js";
import GenericQueries from "./gerenicQueries.js";

export default class BookService extends GenericQueries {
  constructor(dao) {
    super(dao, Book.model);
  }
}
