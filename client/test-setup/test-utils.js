import React, {Fragment} from 'react';
import {render as rtl} from '@testing-library/react';

export const render = (ui, options) => {
  const Wrapper = ({children}) => <Fragment>{children}</Fragment>;

  return rtl(ui, {wrapper: Wrapper, ...options});
};
