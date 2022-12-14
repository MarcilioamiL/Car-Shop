import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../utils/Erros';

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues[0].message });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { message, httpStatus } = mappedError;
    return res.status(httpStatus).json({ error: message }); // lint teste
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;