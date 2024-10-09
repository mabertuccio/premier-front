import Storage from './storage.js';
import { handleActionClick } from './handleActions.js';

class HomePage {
  constructor() {
    this.teams = Storage.getTeams();
  }

  render() {
    console.log(this.teams);
    this.updateTable();
    this.updateTeamsQuantity();
  }

  updateTable() {
    const $tableBody = document.getElementById('table-home');

    this.teams.forEach((team) => {
      console.log(team);
      const newRow = this.renderTeam(team);
      $tableBody.appendChild(newRow);
    });
  }

  renderTeam(team) {
    const $tr = document.createElement('tr');

    // Crest
    const $tdCrest = document.createElement('td');
    const $crestImage = document.createElement('img');
    $crestImage.src = team.crest;
    $crestImage.classList = 'crest';
    $tdCrest.appendChild($crestImage);

    // Country
    const $tdCountry = document.createElement('td');
    $tdCountry.innerText = team.country;

    // Actions
    const $tdActions = document.createElement('td');
    const $actionsDiv = document.createElement('div');
    $actionsDiv.classList = 'btn-group';
    $actionsDiv.role = 'group';
    $actionsDiv.ariaLabel = 'Actions';

    // Buttons
    const buttons = ['View', 'Edit', 'Delete'];
    const buttonsColors = {
      view: 'primary',
      edit: 'warning',
      delete: 'danger',
    };
    buttons.forEach((action) => {
      buttonsColors[action];
      const $button = document.createElement('button');
      $button.type = 'button';
      $button.value = action;
      $button.dataset.id = team.id;
      $button.classList = `btn btn-${
        buttonsColors[action.toLocaleLowerCase()]
      }`;
      $button.innerText = action;
      $button.addEventListener('click', handleActionClick);
      $actionsDiv.appendChild($button);
    });

    $tdActions.appendChild($actionsDiv);
    $tr.appendChild($tdCrest);
    $tr.appendChild($tdCountry);
    $tr.appendChild($tdActions);

    return $tr;
  }

  updateTeamsQuantity() {
    const $teamsQuantity = document.getElementById('teams-quantity');
    $teamsQuantity.innerText = this.teams.length;
  }
}

export default HomePage;
