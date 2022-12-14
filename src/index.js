import { Graph } from "./scripts/graph";
import * as PlayerForm from "./scripts/add_player";

const playerForm = document.querySelector(".player-form");
const randomForm = document.querySelector(".random-form");
PlayerForm.createSeasonsDropdown();
playerForm.addEventListener("submit", PlayerForm.addPlayer);
randomForm.addEventListener("submit", PlayerForm.addRandomPlayer);

// load popup window right after the website loads
window.addEventListener("load", () => {
  setTimeout(function open(event) {
    document.querySelector(".popup").style.display = "block";
  }, 1);
});

let popUp = document.querySelector(".popup");
// close popup window by clicking the 'X' button
document.querySelector("#close").addEventListener("click", () => {
  popUp.style.display = "none";
});

const ctxPoints = document.getElementById("points").getContext("2d");
const ctxAssists = document.getElementById("assists").getContext("2d");
const ctxRebounds = document.getElementById("rebounds").getContext("2d");
const ctxBlocks = document.getElementById("blocks").getContext("2d");
const ctxSteals = document.getElementById("steals").getContext("2d");
const ctxMinutes = document.getElementById("minutes").getContext("2d");

let points = new Graph(ctxPoints, "points");
let assists = new Graph(ctxAssists, "assists");
let rebounds = new Graph(ctxRebounds, "rebounds");
let blocks = new Graph(ctxBlocks, "blocks");
let steals = new Graph(ctxSteals, "steals");
let minutes = new Graph(ctxMinutes, "minutes");

const graphs = [points, assists, rebounds, blocks, steals, minutes];

export const getGraphs = () => {
  return graphs;
};
