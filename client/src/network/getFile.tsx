const BASE_URL = "http://localhost:3000";
const BASE_HEADER = {
    'Content-Type': "application/json"
  }
const getFileMap = async () => {
  let response = await fetch(`${BASE_URL}/esri-grid`, {
    method: "GET",
    headers: BASE_HEADER
  });

  let data = await response.text();
  return data;
}

const getFileItinary = async () => {
  let response = await fetch(`${BASE_URL}/esri-grid/gpx`, {
    method: "GET",
    headers: BASE_HEADER
  });

  let data = await response.text();
  return data;
}

export {
    getFileMap,
    getFileItinary
};