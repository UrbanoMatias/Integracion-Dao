import { bookService } from "../services/index.js";

const getBook = async (req, res) => {
  let id = req.params.id;
  let book = await bookService.getBy({ _id: id });
  res.send(book);
};

const getBooks = async (req, res) => {
  let books = await bookService.getAll();
  res.send(books);
};

const craeteBook = async (req, res) => {
  let { title, description } = req.body;
  let result = await bookService.insert({ title, description });
  res.send(result);
};

export default {
  getBook,
  getBooks,
  craeteBook,
};
