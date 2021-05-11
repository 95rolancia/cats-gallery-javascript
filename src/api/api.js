const ROOT_URL = "public/data";
const IMG_URL = "public/imgs/cats";

const delay = (ms = 10) => new Promise((r) => setTimeout(r, ms));

const api = {
  request: async (nodeId) => {
    try {
      await delay();
      const res = await fetch(`${ROOT_URL}/${nodeId ? nodeId : "content"}.json`);
      if (!res.ok) {
        throw new Error("서버의 상태가 이상합니다!");
      }
      return await res.json();
    } catch (e) {
      throw new Error("무언가가 잘못되었습니다!", e);
    }
  },

  fetchPng: async (filePath) => {
    try {
      window.open(filePath);
      console.log(filePath);
      const result = await fetch(`${filePath}`);

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
