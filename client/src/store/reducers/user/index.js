/**
 * @internal
 */
const INITIAL_STATE = {
  userContactPreferences: {},
};

/**
 * Actions
 * -------
 *
 * @internal
 */
const UPDATE_USER_CONTACT_PREFERENCES = 'UPDATE_USER_CONTACT_PREFERENCES';

/**
 * Reducer
 * -------
 */
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_USER_CONTACT_PREFERENCES:
      return {
        ...state,
        userContactPreferences: action.userContactPreferences,
      };
    default:
      return state;
  }
}

/**
 * Action creators
 * ---------------
 */
export const updateUserContactPreferences = userContactPreferences => ({
  type: UPDATE_USER_CONTACT_PREFERENCES,
  userContactPreferences,
});
