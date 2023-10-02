import axios from "axios";
import { candidateId, endpoint } from "../config";
import { createPolyanetPosition } from "../PolyanetCross";

const getGoal = async (): Promise<Array<Array<string>> | undefined> => {
  try {
    const response = await axios.get(`${endpoint}/map/${candidateId}/goal`);
    return response.data.goal;
  } catch (error) {
    console.log("getGoal error: ", error);
  }
};

const createSoloonPosition = async (
  row: number,
  column: number,
  color: string
) => {
  try {
    axios.post(
      `${endpoint}/soloons`,
      {
        row,
        column,
        candidateId,
        color,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("createSoloonPosition error: ", error);
  }
};

const deletePolyanetPosition = async (row: number, column: number) => {
  try {
    axios.delete(`${endpoint}/polyanets`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        row,
        column,
        candidateId,
      },
    });
  } catch (error) {
    console.log("deletePolyanetPosition error: ", error);
  }
};

const createComethPosition = async (
  row: number,
  column: number,
  direction: string
) => {
  try {
    axios.post(
      `${endpoint}/comeths`,
      {
        row,
        column,
        candidateId,
        direction,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("createComethPosition error: ", error);
  }
};

const generateCrossmintLogo = async () => {
  const sleep = (m: number): Promise<any> =>
    new Promise((r) => setTimeout(r, m));
    
  try {
    const goal = await getGoal();

    if (goal) {
      for (let [rowIndex, row] of goal.entries()) {
        for await (let [columnIndex, column] of row.entries()) {
          if (column === "POLYANET") {
            createPolyanetPosition(rowIndex, columnIndex).then(
              await sleep(1000)
            );
          } else if (column.endsWith("_SOLOON")) {
            const color: string = column.split("_")[0].toLowerCase();
            createSoloonPosition(rowIndex, columnIndex, color).then(
              await sleep(1000)
            );
          } else if (column.endsWith("_COMETH")) {
            const direction: string = column.split("_")[0].toLowerCase();
            createComethPosition(rowIndex, columnIndex, direction).then(
              await sleep(1000)
            );
          } else {
            deletePolyanetPosition(rowIndex, columnIndex).then(
              await sleep(1000)
            );
          }

          await sleep(1000);
        }
      }
    }
  } catch (error) {
    console.log("generateCrossmintLogo error: ", error);
  }
};

export { generateCrossmintLogo };
