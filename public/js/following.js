const getDataFromAPI = name => { // this is all broken, gotta fix it somehow.
    resultDiv.innerHTML = `<div class="col-12 my-3"><h1>Looking for ${name}'s Twitch ID...</h1></div>`;
    fetch(`https://api.twitch.tv/kraken/users?login=${name}`, {
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': clientID
        }
    })
    .then(res => res.json())
    .then(usersData => {
        if (usersData && usersData.users && usersData.users[0]) {
            const user = usersData.users[0];
            const followList = [];
            resultDiv.innerHTML = `<div class="col-12 my-3"><h1>Looking for ${user.display_name}'s following list...`;
            const getFollowingBatch = page => {
                fetch(`https://api.twitch.tv/kraken/users/${user._id}/follows/channels?limit=100&offset=${100 * page}&sortby=last_broadcast`, {
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Client-ID': clientID
                }
                })
                .then(res => res.json())
                .then(followersData => {
                    if (followersData && followersData.follows) {
                        if (followersData._total) {
                            followersData.follows.forEach(follow => {
                                followList.push({
                                    logo: follow.channel.logo,
                                    display_name: follow.channel.display_name,
                                    name: follow.channel.name,
                                    created_at: follow.created_at.replace('T', '<br>').replace('Z', '')
                                });
                            });
                            resultDiv.innerHTML = `<div class="col-12 my-3"><h1>${user.display_name} is following ${followList.length} people:`;
                            followList.sort((a, b) => {
                                return a.created_at < b.created_at ? 1:-1;
                            });
                            followList.forEach(follow => {
                                resultDiv.insertAdjacentHTML('beforeend', 
                                `<div class="col-sm-12 col-md-6 col-lg-3 my-3">
                                    <a class="text-white" href="https://twitch.tv/${follow.name}" target="_blank">
                                        <div class="card bg-grey following-card">
                                            <img class="card-img-top" src="${follow.logo}">
                                            <div class="card-body">
                                                <h3>${follow.display_name}</h3>
                                                <h4>Followed on:<br>${follow.created_at.replace('T', '<br>').replace('Z', '')}</h4>
                                            </div>
                                        </div>
                                    </a>
                                </div>`);
                            });
                            console.log(followList);
                            if (followersData.follows.length) getFollowingBatch(page + 1);
                        } else {
                            resultDiv.innerHTML = `<div class="col-12 my-3"><h1>${user.display_name} is not following anyone.</h1></div>`;
                        }
                    }
                });
            };
            getFollowingBatch(0);
        } else {
            resultDiv.innerHTML = `<div class="col-12 my-3"><h1>Couldn't find that user. Did you type their name correctly?</h1></div>`;
        }
    });
};