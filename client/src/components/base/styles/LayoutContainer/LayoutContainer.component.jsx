import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './LayoutContainer.module.scss';

const LayoutContainer = ({children, flex}) => {
  const className = classNames({
    'layout-container': true,
    'layout-container--flex': flex,
  });
  return <div className={className}>{children}</div>;
};

LayoutContainer.propTypes = {
  children: PropTypes.node,
  flex: PropTypes.bool,
};

export default LayoutContainer;
