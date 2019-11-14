const input = document.querySelector('input');
const content = document.querySelector('.content');
const header = document.querySelector('.header');
const followList = document.querySelector('#followList');
const searchInfo = document.querySelector('.searchInfo');
let channelName;
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
    content.style.top = '0';
    content.style.transform = 'translateY(0)';
    followList.innerHTML = '';
    header.innerHTML = '';
    if (result.data[0]) {
      insertChannelHTML(result.data[0].id, page);
    } else {
      searchInfo.innerHTML = 'CHANNEL "' + name.toUpperCase() + '" COULD NOT BE FOUND';
    }
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
        if (result._total > 0) {
          result.follows.forEach((follow, index) => {
            foundChannels++;
            var html = `
              <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
              <a href="${follow.channel.url}" class="text-white" target="_blank">
                <div class="card primary">
                  <img class="card-img-top" src="${follow.channel.logo}">
                  <div class="card-body">
                    <h4>${follow.channel.display_name}</h4>
                    <h5>Followed on:<br>` + follow.created_at.replace('T', '<br>').replace('Z', '') + `</h5>
                  </div>
                </div>
                </a>
              </div>
            `;

            followList.insertAdjacentHTML('beforeend', html);
          });
        } else {
          followList.innerHTML = '';
          searchInfo.innerHTML = input.value.replace(/ /g, '').toUpperCase() + ' IS NOT FOLLOWING ANYONE';
        }

        if (page < Math.ceil(result._total/100)) {
          page++;
          searchInfo.innerHTML = input.value.toUpperCase() + ' IS FOLLOWING ' + foundChannels + ' PEOPLE:';
          insertChannelHTML(id, page);
        }
      })

}

input.onkeyup = (event) => {
  if (event.which == 13) {
    var name = input.value.replace(/ /g, '');
    if (name != '') {
      findID(name);
    }
  }
}
