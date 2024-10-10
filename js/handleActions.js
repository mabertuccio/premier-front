import API from './api.js';
import Storage from './storage.js';
import { ProcessData } from './team.js';

export function handleActionClick(e) {
  console.log(e.target.id);
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
    default:
      console.log('Error');
  }
}

function handleViewButtonClick(e) {
  const teamId = e.target.dataset.id;
  window.location.href = `team.html?id=${teamId}`;
}

function handleEditButtonClick(e) {
  console.log(e);
}

async function handleDeleteButtonClick(e) {
  const teamId = e.target.dataset.id;

  const api = new API();
  const request = await api.handleRequest('DELETE', `api/teams/${teamId}`);
  console.log(request);

  const deletedTeam = document.getElementById(teamId);
  deletedTeam.remove();

  const newData = await api.handleRequest('GET', 'api/teams');
  const teams = ProcessData.fromAPIData(newData);
  Storage.setTeams(teams);
}
