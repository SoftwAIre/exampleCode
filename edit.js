document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#write-about-puppy-btn').addEventListener('click', () => composePuppyShare());
  document.querySelector('#view-all-puppies-btn').addEventListener('click', () => loadPuppyView());

});

function composePuppyShare() {
  // Show compose view and hide other views
  document.querySelector('#see-all-puppies').style.display = 'none';
  document.querySelector('#share-puppy-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#share-puppy-name').value = '';
  document.querySelector('#share-puppy-description').value = '';
}

function loadPuppyView() {
  // Show the mailbox and hide other views
  document.querySelector('#share-puppy-view').style.display = 'none';
  document.querySelector('#see-all-puppies').style.display = 'block';

  fetch('/puppy/see_all')
    .then(response => response.json())
    .then(puppies => {
      document.querySelector('#see-all-puppies').innerHTML = '<h3>See All Puppies</h3>';
      if (puppies.length === 0) {
        document.querySelector('#see-all-puppies').innerHTML += 'No puppies to see yet.';
      }
      puppies.forEach(add_puppy_to_view);
    });
}

// Set up #2
function add_puppy_to_view(puppy) {

  // Create a new element for the puppy
  const row = document.createElement('div');
  row.innerHTML = `<strong>${puppy.name}</strong> <span>${puppy.description}</span>`;

  // Add row to the view
  document.querySelector('#see-all-puppies').append(row);
}


// Set up #3 
function sharePuppy(event) {

  console.log('inside share puppy function')

  // Collect information about puppy from DOM
  const data = {
    subject: document.querySelector('#share-puppy-name').value,
    body: document.querySelector('#share-puppy-description').value
  };

  // Send API request to create new puppy
  fetch('puppy/see_all', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(() => {
      document.querySelector('#share-puppy-name').value = '';
      document.querySelector('#share-puppy-description').value = '';
      loadPuppyView();
    });
  event.preventDefault();
}