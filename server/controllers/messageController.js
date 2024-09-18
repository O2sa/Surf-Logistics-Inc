import { StatusCodes } from "http-status-codes";
import Message from "../models/Message.js";

export const updateMessage = async (req, res) => {
  const { price } = req.body;
  await Message.findByIdAndUpdate(req.params.id, { price: price });

  res.status(StatusCodes.OK).json();
};

export const createMessage = async (req, res) => {
  await Message.create({ ...req.body, user: req.user._id });

  res.status(StatusCodes.CREATED).json();
};
export const getMessage = async (req, res) => {
  const item = await Message.findById(req.params.id);

  res.status(StatusCodes.OK).json(item);
};

export const deleteMessage = async (req, res) => {
  const { state } = req.body;
  await Message.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json();
};

export const getAllMessages = async (req, res) => {
  const page = parseInt(req.query.pageIndex) || 0;
  const size = parseInt(req.query.pageSize) || 10;
  const search = req.query.search;

  let query = {};

  // If there's a search term, create a query with it
  if (search) {
    query = { name: { $regex: search, $options: "i" } }; // 'i' for case-insensitive search
  }

  const total = await Message.countDocuments(query);
  const items = await Message.find(query)
    .skip(page * size)
    .limit(size)

  res
    .status(StatusCodes.OK)
    .json({ data: items, meta: { totalRowCount: total } });
};
