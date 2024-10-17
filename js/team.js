class Team {
  constructor({ id, shortName, crestUrl, venue, address, area }) {
    this.id = id;
    this.name = shortName;
    this.crest = crestUrl;
    this.venue = venue;
    this.address = address;
    this.country = area.name;
  }
}

class ProcessData {
  static fromAPIData(data) {
    return data.map((teamData) => new Team(teamData));
  }
}

export { Team, ProcessData };
