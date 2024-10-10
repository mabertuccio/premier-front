class Storage {
  static setTeams(teams) {
    localStorage.setItem('teams', JSON.stringify(teams));
  }

  static getTeams() {
    return JSON.parse(localStorage.getItem('teams'));
  }
}

export default Storage;
