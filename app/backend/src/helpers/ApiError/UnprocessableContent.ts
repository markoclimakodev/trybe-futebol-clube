import ApiError from './ApiError';

export default class UnprocessableContent extends ApiError {
  constructor(message:string) {
    super(message, 422);
  }
}
