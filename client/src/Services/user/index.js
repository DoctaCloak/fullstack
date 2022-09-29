import Services from '../';
import {Route, RequestMethod} from 'utils/service';

export default class NotificationService extends Services {
  /**
   * Returns user contact preferences in a maximum of a 5 day period.
   * This means that if a day is a weekend day then it will not be included
   * in the response object.
   */
  static async fetchUserContactPreferences() {
    console.log(this.serviceBaseUrl);
    const route = `${this.serviceBaseUrl}${Route.USER}/getUserContactPreferences`;

    return await this.request(RequestMethod.GET, route, {});
  }
}
