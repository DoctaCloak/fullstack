import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from 'contexts/theme';
import './ThemeProvider.module.scss';

const ThemeProvider = ({children, options}) => {
  const [isLightDisplayMode, setIsLightDisplayMode] = useState(true);

  const displayMode = isLightDisplayMode ? 'light' : 'dark';

  const toggleDisplayMode = () => {
    setIsLightDisplayMode(!isLightDisplayMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        isLightDisplayMode,
        toggleDisplayMode,
      }}
    >
      <div className="theme-provider">
        <div
          className={`theme-provider--${displayMode}-mode`}
          style={options.style}
        >
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
  options: PropTypes.object,
};

export default ThemeProvider;
