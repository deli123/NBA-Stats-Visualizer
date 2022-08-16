import Chart from "chart.js/auto";

const labels = ["January", "February", "March", "April", "May", "June"];

const dataset1 = {
  label: "Dataset 1",
  backgroundColor: "rgb(255, 99, 132)",
  borderColor: "rgb(255, 99, 132)",
  data: [0, 10, 5, 2, 45, 45],
};

const dataset2 = {
  label: "Dataset 2",
  backgroundColor: "rgb(255, 99, 132)",
  borderColor: "rgb(255, 99, 132)",
  data: [0, 10, 5, 2, 20, 30, 45].reverse(),
};

const data = {
  labels: [],
  datasets: [],
};

const config = {
  type: "line",
  data: data,
  options: {
    // responsive: true,
    maintainAspectRatio: true,
  },
};

const CATEGORIES = {
  points: "pts",
  assists: "ast",
  rebounds: "reb",
  steals: "stl",
  blocks: "blk",
  minutes: "min",
};

export class Graph {
  constructor(context, category) {
    const config = {
      type: "line",
      data: [],
      options: {
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `Season average for ${category}`,
          },
        },
      },
    };

    this.chart = new Chart(context, config);
    this.category = category;
    this.years;
  }

  getYears = (seasonStart, seasonEnd) => {
    const seasons = [];

    for (let i = seasonStart; i <= seasonEnd; i++) {
      seasons.push(i.toString());
    }

    return seasons;
  };

  getData = async (id, seasonStart, seasonEnd, category) => {
    let abbrev = CATEGORIES[category];
    const data = [];
    let i = seasonStart;
    for (let i = seasonStart; i <= seasonEnd; i++) {
      let url = `https://www.balldontlie.io/api/v1/season_averages?season=${i}&player_ids[]=${id}`;
      let obj;
      let res = await fetch(url);
      obj = await res.json();
      data.push(obj.data[0][abbrev]);
    }

    // console.log(abbrev, data);
    return data;
  };

  // because addData() calls the async getData() function,
  // this function also has to be async
  addData = async (userInput, category, color) => {
    const [playerId, playerName, seasonStart, seasonEnd] = userInput;
    // console.log("addData: ", playerId, playerName, seasonStart, seasonEnd);
    this.years = this.getYears(seasonStart, seasonEnd);
    // console.log("seasons: ", this.years);
    
    const data = await this.getData(playerId, seasonStart, seasonEnd, category);
    
    console.log(`${category}: `, data);

    if (category === "minutes") {
        for (let i = 0; i < data.length; i++) {
            data[i] = this.convertMinsToDecimal(data[i]);
        }
        console.log(data);
    }

    const dataset = {
      label: playerName,
      backgroundColor: color,
      borderColor: color,
      data: data,
    };

    this.chart.data.labels = this.years;
    this.chart.data.datasets.push(dataset);
    this.chart.update();
  };

  convertMinsToDecimal = (minutes) => {
    let mins = minutes.split(":");
    for (let i = 0; i < mins.length; i++) {
        mins[i] = parseInt(mins[i]);
    }
    let decimal = mins[0] + (mins[1] / 60);
    return decimal;
  }
}
