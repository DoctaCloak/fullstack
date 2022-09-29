import axios from 'axios';

/**
 * Service axios fetcher
 */
export const fetcher = axios.create({
  timeout: 0,
  responseType: 'json',
  maxRedirects: 0,
});

/**
 * Service route constants
 */
export const Route = {
  USER: '/api/users',
};

export const RequestMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};
