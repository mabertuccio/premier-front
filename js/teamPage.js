import { handleActionClick } from './handleActions.js';
import Storage from './storage.js';

class TeamPage {
  renderTeamPage() {
    const teamId = this.getTeamIdFromUrl();
    const team = this.getTeamById(teamId);

    this.renderHeader(team);
    this.renderTeamTable(team);
  }

  getTeamIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  getTeamById(id) {
    const teams = Storage.getTeams();
    return teams.find((team) => team.id == id);
  }

  renderHeader(team) {
    const $header = document.getElementById('team-header');

    const $crestContainer = document.createElement('div');
    $crestContainer.classList.add(
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'my-3'
    );

    const $crestImage = document.createElement('img');
    $crestImage.src = team.crest;
    $crestImage.classList.add('crest', 'img-fluid');

    $crestContainer.appendChild($crestImage);
    $header.appendChild($crestContainer);
  }

  renderTeamTable(team) {
    const $tableTeamBody = document.getElementById('team-table');

    // ID Row
    const $idRow = document.createElement('tr');

    const $idKey = document.createElement('td');
    $idKey.innerText = 'ID';

    const $idValue = document.createElement('td');
    $idValue.innerText = team.id;

    $idRow.appendChild($idKey);
    $idRow.appendChild($idValue);

    $tableTeamBody.appendChild($idRow);

    // Name Row
    const $nameRow = document.createElement('tr');

    const $nameKey = document.createElement('td');
    $nameKey.innerText = 'Name';

    const $nameValue = document.createElement('td');
    $nameValue.innerText = team.name;

    $nameRow.appendChild($nameKey);
    $nameRow.appendChild($nameValue);

    $tableTeamBody.appendChild($nameRow);

    // Venue Row
    const $venueRow = document.createElement('tr');

    const $venueKey = document.createElement('td');
    $venueKey.innerText = 'Venue';

    const $venueValue = document.createElement('td');
    $venueValue.innerText = team.venue;

    $venueRow.appendChild($venueKey);
    $venueRow.appendChild($venueValue);

    $tableTeamBody.appendChild($venueRow);

    // Address Row
    const $addressRow = document.createElement('tr');

    const $addressKey = document.createElement('td');
    $addressKey.innerText = 'Address';

    const $addressValue = document.createElement('td');
    $addressValue.innerText = team.address;

    $addressRow.appendChild($addressKey);
    $addressRow.appendChild($addressValue);

    $tableTeamBody.appendChild($addressRow);

    // Country Row
    const $countryRow = document.createElement('tr');

    const $countryKey = document.createElement('td');
    $countryKey.innerText = 'Country';

    const $countryValue = document.createElement('td');
    $countryValue.innerText = team.country;

    $countryRow.appendChild($countryKey);
    $countryRow.appendChild($countryValue);
    $tableTeamBody.appendChild($countryRow);

    // Actions Row
    const $actionsRow = document.createElement('tr');

    const $actionsKey = document.createElement('td');
    $actionsKey.innerText = 'Actions';

    const $actionsValue = document.createElement('td');

    const buttons = ['Edit', 'Delete'];
    const buttonsColors = {
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
      $actionsValue.appendChild($button);
    });

    $actionsRow.appendChild($actionsKey);
    $actionsRow.appendChild($actionsValue);

    $tableTeamBody.appendChild($actionsRow);
  }
}

export default TeamPage;
