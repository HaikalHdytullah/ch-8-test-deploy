import { GET_ALL_CARS, CARS_ERROR } from "./types";

export const getAllCars = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/cars");
    const data = await response.json();
    console.log(data);

    dispatch({
      type: GET_ALL_CARS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CARS_ERROR,
      payload: error.response,
    });
  }
};
