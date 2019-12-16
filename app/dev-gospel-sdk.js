const f = t => {
  Object.keys(t).forEach(e => sessionStorage.setItem(e, t[e]));
};

const gospelInfo = ''; // INSERT YOUR SESSIONSTORAGE HERE

if (gospelInfo !== '') {
  f(JSON.parse(gospelInfo));
}
