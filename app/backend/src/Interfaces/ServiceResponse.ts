export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
'success' | 'badRequest' | 'notFound' | 'unauthorized' ;

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'success',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
