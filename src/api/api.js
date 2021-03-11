const ROOT_URL =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const PNG_URL =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

const request = async (url) => {
  try {
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
      const result = await request(ROOT_URL);
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
      const result = await request(`${ROOT_URL}/${id}`);
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
      const result = await request(`${PNG_URL}${filePath}`);
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
