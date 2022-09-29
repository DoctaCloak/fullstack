import {createSelector} from 'reselect';
import {selectSelectedDay} from 'store/selectors/dashboard';

export const selectUserContactPreferences = state =>
  state.user?.userContactPreferences;

export const selectUserContactPreferencesBySelectedDay = createSelector(
  selectSelectedDay,
  selectUserContactPreferences,
  (selectedDay, userContactPreferences) => {
    console.log(userContactPreferences);
    console.log(userContactPreferences[selectedDay]);
    return userContactPreferences[selectedDay];
  },
);
