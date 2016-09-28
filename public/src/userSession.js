/* eslint-disable import/prefer-default-export */
import uuid from 'uuid';

function userIdExists(location) {
  return location.hash.length > 0;
}

const ensureUserSession = (windowLocation) => {
  if (!userIdExists(windowLocation)) {
    windowLocation.href = `${windowLocation.origin}/#${uuid.v4()}`; // eslint-disable-line no-param-reassign
  }
};

export function getUserIdFromLocation(location) {
  return location.hash.replace(/^#\/?|\/$/g, '').split('/').pop();
}

export default function startUserSession(window) {
  ensureUserSession(window.location);
  window.addEventListener('hashchange', () => ensureUserSession(window.location), false);

  return {
    getUserId: () => getUserIdFromLocation(window.location),
  };
}
