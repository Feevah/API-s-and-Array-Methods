const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUser();
getRandomUser();

// FGetch random user and  wealth

async function getRandomUser() {
	const res = await fetch('https://randomuser.me/api');
	const data = await res.json();

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		picture: `${user.picture.medium}`,
		money: Math.floor(Math.random() * 1000000)
	};

	addData(newUser);
}

//Double the wealth

function doubleMoney() {
	data = data.map((user) => {
		return { ...user, money: user.money * 2 };
	});

	updateDOM();
}

//Who is the richest?

function sortRichest() {
	data.sort((a, b) => b.money - a.money);

	updateDOM();
}

//Filter only Millionaires

function onlyMillionaires() {
	data = data.filter((user) => user.money > 1000000);
	updateDOM();
}

//Get total wealth
function calculateTotal() {
	const wealth = data.reduce((acc, user) => (acc += user.money), 0);

	const wealthEl = document.createElement('div');
	wealth.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
	main.appendChild(wealthEl);
}

// Add new object to data Array

function addData(obj) {
	data.push(obj);

	updateDOM();
}

// Update Dom
function updateDOM(provideData = data) {
	//Clear Main Div

	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

	provideData.forEach(function(item) {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong> <img src="${item.picture}"> ${formatMoney(item.money)}`;
		main.appendChild(element);
	});
}

// Format number as money

function formatMoney(number) {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
}

// Event Listener

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortRichest);
showMillionairesBtn.addEventListener('click', onlyMillionaires);
calculateWealthBtn.addEventListener('click', calculateTotal);
