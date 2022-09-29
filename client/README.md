# Full Stack Web Application Idea

The layout for this was inspired by the following UI Design here:
https://www.behance.net/gallery/85516221/Dashboard-Design

I thought about going further but left the project as is. The UI Architecture as
it stands can render N number of pages to the center container, given there is
routing logic in place. This can be done with React Router or simply rendering
components based off of state with Redux or Context.

As of now, Dashboard would be considered a 'Home Page' so to speak if you were
to go this route.

## One last note on routing and a scalable way to architect the UI for it

The sidebar would contain routes or actions that would trigger these route based
state updates and you would replace Dashboard with a page controller. I like way
because then your entire routing architecture could be configuration driven.

## Running this locally without relying on the Azure API in case it does go down (In the case that I delete the resource and subscription in Azure) and you stumble upon this repository.

If you want to run this locally and don't want to have to hit the backend
services which are hosted on Azure you can simply run start:mock and you will be
able to hit mock API routes served with Node/Express.js

```
npm run setup
npm run start:mock
```
