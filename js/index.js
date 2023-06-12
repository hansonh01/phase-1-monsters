const homeUrl = 'http://localhost:3000/';
let page = 1;

const getMonsters = (page) => {
    const monsterContainer = document.getElementById('monster-container');
    fetch(`${homeUrl}monsters/?_limit=50&_page=${page}`,{
        headers: {
            'Content-type':'application/json',
            'Accept':'application/json'
        }
    })
        .then(resp=>resp.json())
        .then(monsters=>{
            document.getElementById('monster-container').innerHTML = '';
            monsters.forEach((monster)=>{
                monsterContainer.appendChild(loadMonsters(monster));
            })
        });
};

const loadMonsters = (monster) => {
    const monsterInfo = document.createElement('div');

    const monsterName = document.createElement('h2');
    monsterName.classList.add('monster-name');
    monsterName.textContent = monster.name;
    monsterInfo.appendChild(monsterName);

    const monsterAge = document.createElement('h4');
    monsterAge.classList.add('monster-age');
    monsterAge.textContent = `Age: ${monster.age}`;
    monsterInfo.appendChild(monsterAge);

    const monsterBio = document.createElement('p');
    monsterBio.classList.add('monster-bio');
    monsterBio.textContent = `Bio: ${monster.description}`;
    monsterInfo.appendChild(monsterBio);

    return monsterInfo;
};

const creatMonsterForm = () => {
    const createMonster = document.getElementById('create-monster');
    const monsterForm = document.createElement('form');
    monsterForm.id = 'monster-form';

    const inputName = document.createElement('input')
    inputName.type = 'text';
    inputName.value = '';
    inputName.placeholder = 'name...';
    inputName.id = 'input-name';
    inputName.class = 'input-text'
    monsterForm.appendChild(inputName);

    const inputAge = document.createElement('input');
    inputAge.type = 'text';
    inputAge.value = '';
    inputAge.placeholder = 'age...';
    inputAge.id = 'input-age';
    inputAge.class = 'input-text'
    monsterForm.appendChild(inputAge);

    const inputDescription = document.createElement('input');
    inputDescription.type = 'text';
    inputDescription.value = '';
    inputDescription.placeholder = 'description...';
    inputDescription.id = 'input-description';
    inputDescription.class = 'input-text'
    monsterForm.appendChild(inputDescription);

    const createButton = document.createElement('button');
    createButton.type = 'submit'
    createButton.id = 'create';
    createButton.textContent = 'Create';
    createButton.class = 'submit';
    monsterForm.appendChild(createButton);

    createMonster.appendChild(monsterForm);

    postMonsters();
};

const postMonsters = () => {
    document.getElementById('monster-form').addEventListener('submit',(e)=>{
        e.preventDefault();
        const monsterContainer = document.getElementById('monster-container');
        const inputName = document.getElementById('input-name').value;
        const inputAge = document.getElementById('input-age').value;
        const inputDescription = document.getElementById('input-description').value;
        fetch(`${homeUrl}monsters`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                'name':inputName,
                'age':inputAge,
                'description':inputDescription
            }) 
        })
            .then(resp=>resp.json())
            .then(monster=>{
                monsterContainer.appendChild(loadMonsters(monster))
            })
        resetForm();
    });
};

const resetForm = () => {
    document.getElementById('monster-form').reset();
};

const navigations = () => {
    let moveForward = document.getElementById('forward');
    let moveBackward = document.getElementById('back');

    moveForward.addEventListener('click',()=>{
        pageForward();
    });
    
    moveBackward.addEventListener('click',()=>{
        pageBackward();
    });
};

const pageForward = () => {
    page++;
    getMonsters(page);
};

const pageBackward = () => {
    if (page > 1) {
        page--;
        getMonsters(page);
    } else {
        alert('Error');
    };
};

const commands = () => {
    getMonsters(page);
    creatMonsterForm();
    navigations();
};

document.addEventListener('DOMContentLoaded',commands);