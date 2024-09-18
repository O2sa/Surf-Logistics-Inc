import { StatusCodes } from "http-status-codes";
import Quote from "../models/Quote.js";

export const getUserQuotes = async (req, res) => {
  const page = parseInt(req.query.pageIndex) || 0;
  const size = parseInt(req.query.pageSize) || 10;
  const search = req.query.search;

  let query = { user: req.user._id };

  // If there's a search term, create a query with it
  if (search) {
    query = { ...query, name: { $regex: search, $options: "i" } }; // 'i' for case-insensitive search
  }

  const total = await Quote.countDocuments(query);
  const items = await Quote.find(query)
    .skip(page * size)
    .limit(size)
    .populate({ path: "user" });

  res
    .status(StatusCodes.OK)
    .json({ data: items, meta: { totalRowCount: total } });
};

export const updateQuote = async (req, res) => {
  const { price } = req.body;
  await Quote.findByIdAndUpdate(req.params.id, { price: price });

  res.status(StatusCodes.OK).json();
};

export const createQuote = async (req, res) => {
  await Quote.create({ ...req.body, user: req.user._id });

  res.status(StatusCodes.CREATED).json();
};
export const getQuote = async (req, res) => {
  const item = await Quote.findById(req.params.id);

  res.status(StatusCodes.OK).json(item);
};

export const deleteQuote = async (req, res) => {
  const { state } = req.body;
  await Quote.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json();
};

export const getAllQuotes = async (req, res) => {
  const page = parseInt(req.query.pageIndex) || 0;
  const size = parseInt(req.query.pageSize) || 10;
  const search = req.query.search;

  let query = {};

  // If there's a search term, create a query with it
  if (search) {
    query = { name: { $regex: search, $options: "i" } }; // 'i' for case-insensitive search
  }

  const total = await Quote.countDocuments(query);
  const items = await Quote.find(query)
    .skip(page * size)
    .limit(size)
    .populate({ path: "user" });

  res
    .status(StatusCodes.OK)
    .json({ data: items, meta: { totalRowCount: total } });
};
