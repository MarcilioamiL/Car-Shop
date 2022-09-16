export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}
  
  type ErrorResponseObject = {
    message: string;
    httpStatus: number
  };
  
export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};
  
export const errorCatalog: ErrorCatalog = {
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  EntityNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
};