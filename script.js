const showActivity = document.getElementById('show-activity');
const btnShowActivity = document.getElementById('btn-show-activity');
const form = document.getElementById('form');

let type = document.getElementById('activity');
let participants = document.getElementById('participants');
participants.style.display = "none";
const participantsLabel = document.getElementById('participants-label');
participantsLabel.style.display = "none";

const loader = document.querySelector('.lds-roller');
loader.style.display = "none";

form.addEventListener('change', (e) => {
  e.preventDefault();
  onChangeSelect();
})

function onChangeSelect () {
  if (type.value === 'education' || type.value === 'recreational' ) {
    participants.style.display = "none";
    participantsLabel.style.display = "none";
    participants.value = 1;
  } else {
    participants.style.display = "block";
    participantsLabel.style.display = "block";
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  loader.style.display = "block";
  showActivity.innerHTML = null;
  getActivityFromApi();
})

function getActivityFromApi () {
let activity = null;

fetch(`http://www.boredapi.com/api/activity?type=${type.value}&participants=${participants.value}`)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => activity = data);


  setTimeout(function(){
    loader.style.display = "none";
    participants.style.display = 'block';
    showActivity.innerHTML = activity.activity;
    onChangeSelect();
    }, 1000);
}
