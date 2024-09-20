import Asignature from "../model/Asignature.js";
import GenericQueries from "./gerenicQueries.js";

export default class AsignatureService extends GenericQueries {
  constructor(dao) {
    super(dao, Asignature.model);
  }
}
