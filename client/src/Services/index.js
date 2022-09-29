import {fetcher} from 'utils/service';

export default class Services {
  /**
   * A base URL used for service calls
   *
   * @private
   */
  static serviceBaseUrl = '';

  /**
   * A base URL used for content calls
   */
  static contentBaseUrl = '';

  /**
   * Gets the base URLs for various services used by the application
   */
  static setBaseUrls({serviceBaseUrl}) {
    Services.serviceBaseUrl = serviceBaseUrl;
  }

  static buildErrorResponse(error, request) {
    return {
      request,
      status: error.response?.status || 0,
      message: error.message,
    };
  }

  static async request(method, route, requestConfig = {}) {
    try {
      const {data: response} = await fetcher.request({
        ...requestConfig,
        url: route,
        method,
      });

      return response;
    } catch (error) {
      // TODO: Log to error monitoring service

      const errorResponse = this.buildErrorResponse(error, {
        ...requestConfig,
        url: route,
        method,
      });

      throw errorResponse;
    }
  }
}
