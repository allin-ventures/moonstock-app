import axios from 'axios';
const BASE_URL = 'http://35.197.76.124';


export const submit = async (token) => {
  return axios.post(`${BASE_URL}/cc`, {
    token
  })
}

export const meta = async () => {
  return axios.get(`${BASE_URL}/meta`, {
    headers: {
      Authorization: `Bearer 10`
    }
  })
}

export const next = async () => {
  return axios.get(`${BASE_URL}/next`, {
    headers: {
      Authorization: 'Bearer 5',
    }
  });

  /*return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{
        symbol: 'GOOG',
        prediction: {
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu augue in mi sodales luctus id a leo. Nunc vel elementum metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque id nunc ultrices, mattis ipsum eget, interdum dolor. Etiam tempor nisl et est rhoncus tristique. Mauris pharetra orci ligula, maximus varius neque elementum at. Nunc ut dui sem.

          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce tristique vehicula odio, et volutpat tortor ultricies sed. Nunc sapien lacus, lacinia non turpis id, interdum faucibus turpis. Proin hendrerit metus a mi suscipit, et semper dui hendrerit. Sed in velit non felis lacinia aliquam. Praesent nisl felis, condimentum eu facilisis quis, tempor nec sem. Morbi vehicula leo sit amet tincidunt pretium. Nam porta odio tincidunt enim pellentesque efficitur. Integer ante magna, imperdiet nec mi non, euismod semper lacus.
          `
        }
      }, {
        symbol: 'AAPL',
        prediction: {
          text: 'ass'
        }
      }, {
        symbol: 'MSFT',
        prediction: {
          text: 'ass'
        }
      }, {
        symbol: 'FB',
        prediction: {
          text: 'ass'
        }
      }]);
    }, 5000)
  })*/
}