const getDataFromAPI = name => {
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
            resultDiv.innerHTML = `<div class="col-12 my-3"><h1>Looking for ${user.display_name}'s first followers...`;
            fetch(`https://api.twitch.tv/kraken/channels/${user._id}/follows?limit=100&direction=asc`, {
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Client-ID': clientID
                }
            })
            .then(res => res.json())
            .then(firstFollowers => {
                resultDiv.innerHTML = `<div class="col-12 my-3"><h1>${user.display_name}'s first ${firstFollowers.follows.length} followers:</h1></div>`;
                resultDiv.insertAdjacentHTML('beforeend', `
                <div class="col-12 mb-3">
                    <div class="card bg-grey first-card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-2">
                                    <p>#</p>
                                </div>
                                <div class="col-5">
                                    <p>Name</p>
                                </div>
                                <div class="col-5">
                                    <p>Date</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
                firstFollowers.follows.forEach((follower, index) => {
                    resultDiv.insertAdjacentHTML('beforeend', `
                    <div class="col-12 mb-3">
                        <div class="card bg-grey first-card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-2">
                                        <p>${index + 1}</p>
                                    </div>
                                    <div class="col-5">
                                        <a class="text-purple" href="https://twitch.tv/${follower.user.name}">${follower.user.display_name}</a>
                                    </div>
                                    <div class="col-5">
                                        <p>${follower.created_at.replace('T', ' ').replace('Z', '')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
                });
            });
        } else {
            resultDiv.innerHTML = `<div class="col-12 my-3"><h1>Couldn't find that user. Did you type it right?</h1></div>`;
        }
    });
};