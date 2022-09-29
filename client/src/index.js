import React, {StrictMode} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createStore from 'store';
import Application from 'components/base/Application/Application.component';
import Services from 'Services';

const rootElement = document.getElementById('app');

const fs-web-application = () => {
  const store = createStore;

  Services.setBaseUrls({
    serviceBaseUrl: SERVICE_BASE_URL,
  });

  return (
    <Provider store={store}>
      <StrictMode>
        <Application />
      </StrictMode>
    </Provider>
  );
};

render(<fs-web-application />, rootElement);
