import axios from "axios";
import { candidateId, endpoint } from "../config";

const crossPositions = [
  [2, 2],
  [2, 8],
  [3, 3],
  [3, 7],
  [4, 4],
  [4, 6],
  [5, 5],
  [6, 4],
  [6, 6],
  [7, 3],
  [7, 7],
  [8, 2],
  [8, 8],
];

const generatePolyanetCross = () => {
  for (let position of crossPositions) {
    console.log(position);
    const [row, column] = position;
    createPolyanetPosition(row, column);
  }
};

const createPolyanetPosition = async (row: number, column: number) => {
  const body = {
    row,
    column,
    candidateId,
  };
  try {
    axios.post(`${endpoint}/polyanets`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("createPolyanetPosition error: ", error);
  }
};

export { generatePolyanetCross, createPolyanetPosition };
