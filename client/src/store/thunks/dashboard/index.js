/* eslint-disable @typescript-eslint/no-unused-vars */
import {convertDateToDayEntryKey} from 'utils/date-utils';
import {updateSelectedDay} from 'store/reducers/dashboard';
import {selectUserContactPreferences} from 'store/selectors/user';

export const refreshSelectedDay = date => (dispatch, getState) => {
  const state = getState();
  const userContactPreferences = selectUserContactPreferences(state);

  const dateEntryKey = convertDateToDayEntryKey(date);

  dispatch(updateSelectedDay(dateEntryKey));
};
