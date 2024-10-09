import API from './api.js';
import { ProcessData } from './team.js';
import Storage from './storage.js';
import HomePage from './homePage.js';

async function initialize() {
  const api = new API();
  const data = await api.handleRequest('GET', 'api/teams');
  const teams = ProcessData.fromAPIData(data);
  Storage.setTeams(teams);

  const homePage = new HomePage();
  homePage.render();
}

initialize();
