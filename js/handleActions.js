import API from './api.js';
import Storage from './storage.js';
import { ProcessData } from './team.js';

export function handleActionClick(e) {
  switch (e.target.value) {
    case 'View':
      handleViewButtonClick(e);
      break;
    case 'Edit':
      handleEditButtonClick(e);
      break;
    case 'Delete':
      handleDeleteButtonClick(e);
      break;
    case 'Add':
      handleAddButtonClick();
      break;
    default:
      console.log('Error');
  }
}

function handleViewButtonClick(e) {
  const teamId = e.target.dataset.id;
  window.location.href = `team.html?id=${teamId}`;
}

async function handleEditButtonClick(e) {
  $('#edit-team-modal').modal('show');

  const teamId = e.target.dataset.id;

  const teams = Storage.getTeams();
  const team = teams.find((team) => team.id == teamId);

  const $name = document.getElementById('name');
  $name.value = team.name;

  const $venue = document.getElementById('venue');
  $venue.value = team.venue;

  const $address = document.getElementById('address');
  $address.value = team.address;

  const $country = document.getElementById('country');
  $country.value = team.country;

  document.getElementById('save-btn').onclick = async function () {
    const updatedTeam = {
      ...team,
      area: {
        ...team.area,
        name: document.getElementById('country').value,
      },
      shortName: document.getElementById('name').value,
      venue: document.getElementById('venue').value,
      address: document.getElementById('address').value,
    };
    console.log('Updated Team: ', updatedTeam);

    const api = new API();

    try {
      const request = await api.handleRequest(
        'PUT',
        `api/teams/${teamId}`,
        updatedTeam
      );
      const newData = await api.handleRequest('GET', 'api/teams');
      const teams = ProcessData.fromAPIData(newData);
      Storage.setTeams(teams);

      $('#edit-team-modal').modal('hide');
      window.location.reload();
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };
}

async function handleDeleteButtonClick(e) {
  const teamId = e.target.dataset.id;

  const api = new API();

  try {
    await api.handleRequest('DELETE', `api/teams/${teamId}`);

    const deletedTeam = document.getElementById(teamId);
    if (deletedTeam) {
      deletedTeam.remove();
    }

    const newData = await api.handleRequest('GET', 'api/teams');
    const teams = ProcessData.fromAPIData(newData);
    Storage.setTeams(teams);

    if (
      window.location.href === `http://127.0.0.1:8080/team.html?id=${teamId}`
    ) {
      window.location.href = 'http://127.0.0.1:8080/';
    }
  } catch (error) {
    console.error('Error al eliminar el equipo:', error);
  }
}

async function handleAddButtonClick() {
  $('#add-team-modal').modal('show');

  const name = document.getElementById('add-name').value;
  const shortName = document.getElementById('short-name').value;
  const tla = document.getElementById('TLA').value;
  const crest = document.getElementById('add-crest').value;
  const address = document.getElementById('add-address').value;
  const venue = document.getElementById('add-venue').value;
  const country = document.getElementById('add-country').value;

  document.getElementById('save-add-btn').onclick = async function () {
    const newTeam = {
      area: {
        name: country,
      },
      name: name,
      shortName: shortName,
      tla: tla,
      crest: crest,
      address: address,
      venue: venue,
    };

    console.log('New Team: ', newTeam);

    const api = new API();

    try {
      const request = await api.handleRequest(
        'POST',
        `api/teams/create`,
        newTeam
      );
      console.log(newTeam);

      const newData = await api.handleRequest('GET', 'api/teams');
      const teams = ProcessData.fromAPIData(newData);
      Storage.setTeams(teams);
      $('#add-team-modal').modal('hide');
      //window.location.reload();
    } catch (error) {}
  };
  /*
  

    const api = new API();

    try {
      const request = await api.handleRequest(
        'PUT',
        `api/teams/${teamId}`,
        updatedTeam
      );
      const newData = await api.handleRequest('GET', 'api/teams');
      const teams = ProcessData.fromAPIData(newData);
      Storage.setTeams(teams);

      $('#edit-team-modal').modal('hide');
      window.location.reload();
    } catch (error) {
      console.error('Error updating team:', error);
    }
  */
}

if (window.location.href === 'http://localhost:3000/') {
  const $addBtn = document.getElementById('add-btn');
  $addBtn.addEventListener('click', handleAddButtonClick);
}
