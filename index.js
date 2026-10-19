//RESUELVE TUS EJERCICIOS AQUI

// 1.
async function getAllBreeds() {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    return Object.keys(data.message);
}

// 2.
async function getRandomDog() {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await res.json();
    return data.message;
}

// 3.
async function getAllImagesByBreed(breed = 'komondor') {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await res.json();
    return data.message;
}

// 4.
async function getAllImagesByBreed2(breed) {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await res.json();
    return data.message;
}

// 5.
async function getGitHubUserProfile(username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profile = await res.json();
    return profile;
}

// 6.
async function printGithubUserProfile(username) {
    const profile = await getGitHubUserProfile(username);
    const user = { img: profile.avatar_url, name: profile.name };

    const section = document.createElement('section');
    section.innerHTML = `
        <img src="${user.img}" alt="${user.name}">
        <h1>${user.name}</h1>
    `;
    document.body.appendChild(section);

    return user;
}

// 7.
async function getAndPrintGitHubUserProfile(username) {
    const profile = await getGitHubUserProfile(username);

    const card = `<section>
    <img src="${profile.avatar_url}" alt="${profile.name}">
    <h1>${profile.name}</h1>
    <p>Public repos: ${profile.public_repos}</p>
</section>`;

    document.body.insertAdjacentHTML('beforeend', card);

    return card;
}

// 8.
window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'GitHub username';

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Buscar';

    searchButton.addEventListener('click', () => {
        const username = searchInput.value.trim();
        if (username) getAndPrintGitHubUserProfile(username);
    });

    document.body.appendChild(searchInput);
    document.body.appendChild(searchButton);
});

// 9.
async function fetchGithubUsers(userNames) {
    const promises = userNames.map(name =>
        fetch(`https://api.github.com/users/${name}`).then(res => res.json())
    );
    const users = await Promise.all(promises);

    users.forEach(user => {
        console.log('Repo url:', user.html_url);
        console.log('Name:', user.name);
    });

    return users;
}
