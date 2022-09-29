import {convertDateToDayEntryKey} from 'utils/date-utils';

/**
 * @internal
 */
const INITIAL_STATE = {
  selectedDay: convertDateToDayEntryKey(new Date()),
};

/**
 * Actions
 * -------
 *
 * @internal
 */
const UPDATE_SELECTED_DAY = 'UPDATE_SELECTED_DAY';

/**
 * Reducer
 * -------
 */
export default function dashboard(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.selectedDay,
      };
    default:
      return state;
  }
}

/**
 * Action creators
 * ---------------
 */
export const updateSelectedDay = selectedDay => ({
  type: UPDATE_SELECTED_DAY,
  selectedDay,
});
