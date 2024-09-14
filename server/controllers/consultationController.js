import { StatusCodes } from "http-status-codes";
import Consultation from "../models/Consultation.js";

export const getUserConsultations = async (req, res) => {
  const consultations = await Consultation.find({ user: req.params.id });

  res.status(StatusCodes.OK).json(consultations);
};

export const updateConsultation = async (req, res) => {
  const { state } = req.body;
  await Consultation.findByIdAndUpdate(req.params.id, { state: state });

  res.status(StatusCodes.OK).json();
};

export const deleteConsultation = async (req, res) => {
  await Consultation.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json();
};

export const createConsultation= async (req, res) => {
  await Consultation.create({ ...req.body, user: req.user._id });

  res.status(StatusCodes.CREATED).json();
};

export const getConsultation = async (req, res) => {
  const item = await Consultation.findById(req.params.id);
  res.status(StatusCodes.OK).json(item);
};

export const getAllConsultations = async (req, res) => {
  const page = parseInt(req.query.pageIndex) || 0;
  const size = parseInt(req.query.pageSize) || 10;
  const search = req.query.search || "";

  const query = {
    $or: [{ name: { $regex: search } }, { email: { $regex: search } }],
  };

  const total = await Consultation.countDocuments(query);
  const items = await Consultation.find(query)
    .skip(page * size)
    .limit(size)
    .populate({ path: "user" });

  res
    .status(StatusCodes.OK)
    .json({ data: items, meta: { totalRowCount: total } });
};
