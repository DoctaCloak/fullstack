import React from 'react';
import noop from 'lodash.noop';

export const THEME_CONTEXT = {
  displayMode: '',
  setDisplayMode: noop,
};

export default React.createContext(THEME_CONTEXT);
