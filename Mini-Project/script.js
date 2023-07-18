let text = document.getElementById('text');
let height = document.getElementById('height');
let date = document.getElementById('date');
let gender = document.getElementById('gender');
let nation = document.getElementById('nation');
let dataElem = document.querySelector('.data');
let name = document.querySelector('#name');
let button = document.querySelector('button');

let loadingGifLink = 'https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif'

async function displayDataOnScreen(){
	createLoadingScreen();
	let newData = await fetchData()
	if (newData) {
		createTextElements(newData)
	}
	else{
		displayError()
	}
}

async function fetchData() {
  let randInt = Math.floor(Math.random() * 83) + 1;

  try {
    let response = await fetch(`https://swapi.dev/api/people/${randInt}`);

    if (!response.ok) {
      if (response.status === 404) {
        return false;
      } else {
        throw new Error('Network response was not ok');
      }
    }

    let jsonData = await response.json();

 	let nationResponse = await fetch(jsonData.homeworld);
    let nationData = await nationResponse.json();

    jsonData = {
      newName: jsonData.name,
      newHeight: jsonData.height,
      newDate: jsonData.birth_year,
      newNation: nationData.name,
      newGender: jsonData.gender
    };

    return jsonData;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}



function createLoadingScreen(){
	let checker = document.querySelector('#divElem');
	console.log('from the checker',checker)
	if (checker){
		checker.remove()
	}
	let divElem = document.createElement('div');

	text.style.display = 'none';

	divElem.id = 'divElem';
	divElem.innerText = 'Loading!';

	let gifElem = document.createElement('img');
	gifElem.src = loadingGifLink;
	gifElem.classList.add('gif');

	divElem.appendChild(gifElem);
	dataElem.appendChild(divElem);

}


function createTextElements({newName,newNation,newDate,newGender,newHeight}){
	let divElem = document.querySelector('#divElem');
	divElem.remove()

	text.style.display='block'

	height.textContent = newHeight;
	date.textContent = newDate;
	gender.textContent = newGender;
	nation.textContent = newNation;
	name.textContent = newName;
}

function displayError(){
	let divElem = document.querySelector('#divElem');
	divElem.remove()

	let newDiv = document.createElement('div')
	newDiv.id = 'divElem'
	newDiv.textContent = 'Error!'
	dataElem.appendChild(newDiv);


}
button.addEventListener('click',displayDataOnScreen)