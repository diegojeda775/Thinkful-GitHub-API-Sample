'use strict';

const apiKey = "tPS35K7NsCiLCXmwYhObexAg543hQrFGowGM7zH8GWg=";

const searchURL = 'https://api.github.com/users/';


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // for each video object in the articles
    //array, add a list item to the results
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      <p>${responseJson[i].description}</p>
      </li>`
    )};
  //display the results section
  $('#results').removeClass('hidden');
};

function getRepos(userName) {

  const url = searchURL + userName + '/repos';

  console.log(url);

  const options = {
    headers: {
      "Authorization": apiKey,
      "Accept": "application/vnd.github.v3+json"
    }
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      displayResults(responseJson);
      console.log('1', responseJson);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
      console.log('2', err);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#js-search-term').val();
    getRepos(userName);
  });
}

$(watchForm);
