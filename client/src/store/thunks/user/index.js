/* eslint-disable @typescript-eslint/no-unused-vars */
import UserService from 'Services/user';
import {updateUserContactPreferences} from 'store/reducers/user';

/**
 * Retrieves and updates the action summary based off of the users location,
 * unless a location is provided.
 */
export const refreshUserContactPreferences =
  () => async (dispatch, getState) => {
    const userContactPreferences =
      await UserService.fetchUserContactPreferences();

    dispatch(updateUserContactPreferences(userContactPreferences));
  };
