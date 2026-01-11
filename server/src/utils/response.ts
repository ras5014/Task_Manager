import { Response } from "express";

export const successResponse = (
  res: Response,
  data: any,
  statusCode: number = 200,
  message: string = "Request was successful"
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number = 500,
  message: string = "An error occured"
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
