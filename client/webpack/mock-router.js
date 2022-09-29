const fs = require('fs');
const path = require('path');
const express = require('express');

/**
 * @internal
 */
const CURRENT_WORKING_DIRECTORY = process.cwd();

require.extensions['.txt'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8');
};

/**
 * A configuration object for method-specific responses.
 *
 * @tyedef IResponseConfig
 * @param {string} path - A relative path to a file with a response payload
 * @param {number} [status] - An optional response status code (default: 200)
 * @param {number} [delay] - An optional response delay in milliseconds (default: 0)
 */

/**
 * A map of request method types to response paths or response config objects.
 *
 * @typedef IResponseConfig
 * @type {Object.<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', string | IResponseConfig>}
 */

/**
 * A mock route configuration object.
 *
 * @typedef IRoute
 * @propery {string} endpoint - The endpoint mock
 * @property {IResponseMap} response - A map of request method types to response paths or response configs
 * @property {number} [delay] - An optional response delay in milliseconds (default: 0)
 * @property {number} [status] - An optional response status code (default: 200)
 */

/**
 * Takes a method-specific response entry from a route object and normalizes
 * it to a resposne config object.
 *
 * @param {string | IResponseConfig} responseEntry
 * @returns {IResponseConfig}
 *
 * @internal
 */
function getResponseConfig(responseEntry) {
  const path =
    typeof responseEntry === 'string' ? responseEntry : responseEntry.path;
  const delay = responseEntry.delay || 0;
  const status = responseEntry.status || 200;

  return {
    path,
    delay,
    status,
  };
}

/**
 * Wires up a mock route using a custom route object and a provided express application.
 *
 * @param {IRoute} route
 * @param {Express.Application} app
 *
 * @internal
 */
function createMockRoute(route, app) {
  const {endpoint, responses = {}} = route;

  const responseMap = Object.keys(responses).reduce((acc, method) => {
    const {
      path: responsePath,
      status,
      delay,
    } = getResponseConfig(responses[method]);
    const response = require(path.join(
      CURRENT_WORKING_DIRECTORY,
      responsePath,
    ));

    acc[method] = {
      response,
      status,
      delay,
    };

    return acc;
  }, {});

  app.use(endpoint, (req, res) => {
    const {method} = req;
    const responseMapEntry = responseMap[method];

    if (!responseMapEntry) {
      // TODO: Log to error monitoring service

      res.status(405).send(null);

      return;
    }

    const {response, delay, status} = responseMapEntry;

    console.log(
      `[Mock Route: ${method} (${status})] Requested route: ${endpoint}`,
    );

    setTimeout(() => {
      const responseData =
        typeof response === 'function' ? response(req) : response;

      res.status(status).send(responseData);
    }, delay);
  });
}

/**
 * Wires up a set of mock routes using a provided Express application instance.
 *
 * @param {IRoute[]} routes
 * @param {Express.Application} app
 */
exports.createMockRoutes = (routes, app) => {
  // Enables req.body on incoming requests
  app.use(express.json());

  for (const route of routes) {
    createMockRoute(route, app);
  }
};
