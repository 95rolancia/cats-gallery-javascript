const ROOT_URL =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchRoot: async () => {
    const response = await fetch(ROOT_URL);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("i couldnt get a data");
    }
  },

  fetchDirectory: async (id) => {
    const response = await fetch(`${ROOT_URL}/${id}`);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("i couldnt get a data");
    }
  },
};

export default api;
