import { asignatureService } from "../services/index.js";

const getAsignaures = async (req, res) => {
  let result = await asignatureService.getAll();
  res.send(result);
};

const createAsignature = async (req, res) => {
  let { asignatureName } = req.body;
  let result = await asignatureService.insert({ asignatureName });
  res.send(result);
};

export default {
  getAsignaures,
  createAsignature,
};
