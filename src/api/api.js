const ROOT_URL = "public/data/";
const IMG_URL = "public/imgs/cats";

const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const request = async (url) => {
  try {
    await delay();
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    };
  }
};

const api = {
  fetchRoot: async () => {
    try {
      const result = await request(`${ROOT_URL}content.json`);
      console.log(result);
      return {
        isError: false,
        data: result,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },

  fetchDirectory: async (id) => {
    try {
      const result = await request(`${ROOT_URL}/${id}.json`);
      return {
        isError: false,
        data: result,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },

  fetchPng: async (filePath) => {
    try {
      window.open(filePath);
      console.log(filePath);
      const result = await request(`${filePath}`);

      return {
        isError: false,
        data: result,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
};

export default api;
