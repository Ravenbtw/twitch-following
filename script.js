const input = document.querySelector('input');
const followList = document.querySelector('#followList');
let foundChannels;
let page;

function findID(name) {
  fetch('https://api.twitch.tv/helix/users?login=' + name, {
    headers: {
      'Client-ID': 'cclk5hafv1i7lksfauerry4w7ythu2'
    }
  })
  .then((response) => response.json())
  .then((result) => {
    foundChannels = 0;
    page = 0;
    followList.innerHTML = '';
    followList.insertAdjacentHTML('afterbegin', '<div class="col-12"><p class="display-4">' + name + ' is following:</p></div>');
    insertChannelHTML(result.data[0].id, page);
  })
}

function insertChannelHTML(id, page) {
  fetch('https://api.twitch.tv/kraken/users/' + id + '/follows/channels?limit=100&offset=' + 100*page, {
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'cclk5hafv1i7lksfauerry4w7ythu2'
      }})
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        result.follows.forEach((follow, index) => {
          foundChannels++;
          console.log(foundChannels);
          console.log(follow.channel.display_name);
          var html = `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
            <a href="${follow.channel.url}" class="text-white" target='_blank'>
              <div class="card primary">
                <img class="card-img-top" src="${follow.channel.logo}">
                <div class="card-body">
                  <h4>${follow.channel.display_name}</h4>
                  <h5>Followed on<br>` + follow.created_at.substring(0,10) + `</h5>
                </div>
              </div>
              </a>
            </div>
          `;
          followList.insertAdjacentHTML('beforeend', html);
        })

        if (page < Math.ceil(result._total/100)) {
          console.log(foundChannels, result._total, Math.ceil(result._total/100));
          page++;
          insertChannelHTML(id, page);
        }
      })

}

input.onkeyup = (event) => {
  if (event.which == 13) {
    findID(input.value);
  }
}
