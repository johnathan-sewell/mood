import uuid from 'uuid';

function urlContainsUserId() {
    return window.location.hash.length > 0;
};

function navigateToNewUserUrl() {
    window.location.href = `${window.location.origin}/#${uuid.v4()}`;
};

export default () => {
    if(!urlContainsUserId()) {
        navigateToNewUserUrl();
    }
}
