/* eslint-disable no-undef*/
import moment from 'moment';
import userSession from './userSession';

const currentUserSession = userSession(window);

moment.updateLocale(moment.locale(), {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    lastWeek: '[Last] ddd',
    sameElse: 'L',
  },
});

// const dummyData = [];
// for (let i = 100; i >= 0; i--) {
//   const random = Math.random();
//   dummyData.push({
//     date: moment().subtract(i, 'days'),
//     userId: '06c02293-37de-4109-b622-3363a4741c28',
//     mood: random <= .3 ? 'happy' : (random >= .6 ? 'unhappy' : 'neither'),
//   });
// }

function renderMoods(data) {
  const el = document.querySelector('.js-heat-map');
  const viewData = data.concat().sort().reverse();

  const heatmapFragment = viewData.reduce((fragment, dataItem, index) => {
    const moodEl = document.createElement('div');
    moodEl.className = 'heatmap__block';
    if (dataItem.mood === 'happy') {
      moodEl.className += ' heatmap__block--happy';
      moodEl.title = 'Happy';
    } else if (dataItem.mood === 'unhappy') {
      moodEl.className += ' heatmap__block--unhappy';
      moodEl.title = 'Unhappy';
    } else {
      moodEl.title = 'Niether Happy nor Unhappy';
    }

    if (index < 7) {
      moodEl.innerText = moment(dataItem.date).calendar();
    } else {
      moodEl.innerHTML = moment(dataItem.date).format('MMM Do');
    }
    fragment.appendChild(moodEl);
    return fragment;
  }, document.createDocumentFragment());

  el.innerHTML = '';
  el.appendChild(heatmapFragment);
}

function fetchMoodHistory() {
  const userId = currentUserSession.getUserId(window.location);
  const request = new Request(`https://jss136j961.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/moods`, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

  return window.fetch(request)
  .then(r => r.json());
}

function updateMood(mood) {
  const userId = currentUserSession.getUserId(window.location);
  const request = new Request(`https://jss136j961.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/moods`, {
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      date: moment().format('YYYY-MM-DD'),
      mood,
    }),
  });

  return window.fetch(request)
  .then(r => r.json());
}

function handleFetchError(err) {
  console.log(err); // eslint-disable-line no-console
}

document.querySelectorAll('input[name="mood"]').forEach((el) => {
  el.addEventListener('change', (e) => { // eslint-disable-line no-undef
    e.preventDefault();

    updateMood(event.target.value)
    .then(fetchMoodHistory)
    .then(renderMoods)
    .catch(handleFetchError);
  }, false);
});

fetchMoodHistory()
  .then(renderMoods)
  .catch(handleFetchError);
