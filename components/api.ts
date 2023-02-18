import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_TRAFIKVERKET_API_URL || "";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Accept"] = "application/json";

const renderUrl = (operation: string, params?: string) => {
  return `${operation}?outputFormat=json&apiKey=${
    process.env.REACT_APP_TRAFIKVERKET_API_KEY
  }${params || ""}`;
};

export const getParkingSpots = async (): Promise<Response> => {
  const data = await fetch(
    "https://openparking.stockholm.se/LTF-Tolken/v1/pmotorcykel/all/?outputFormat=json&apiKey=52cd6f7c-5ea8-433d-a52e-7ad0fa33f8dc",
    {
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
    }
  );
  // const data = await res.json();
  // const { data } = await axios.get(
  //   "https://openparking.stockholm.se/LTF-Tolken/v1/pmotorcykel/all/?outputFormat=json&apiKey=52cd6f7c-5ea8-433d-a52e-7ad0fa33f8dc"
  // );
  return data;
};
