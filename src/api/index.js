import axios from "axios";

const candidateId = "364c0b14-5028-4e1d-9230-55e8a7a32029";
const endpoint = "https://challenge.crossmint.io/api";

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
    createPosition(row, column);
  }
};

const createPosition = async (row, column) => {
  const body = {
    row,
    column,
    candidateId,
  }
  try {
    await axios.post(`${endpoint}/polyanets`, body);
  } catch (error) {
    console.log('createPosition error: ', error);
  }
}

export { generatePolyanetCross };
