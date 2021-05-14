const API_END_POINT = "public/data";
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export default class Api {
  async request(nodeId) {
    try {
      await delay();
      const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : "content"}.json`);
      if (!res.ok) {
        throw new Error("서버의 상태가 이상합니다!", res);
      }
      return await res.json();
    } catch (err) {
      throw new Error("무언가가 잘못되었습니다!", err);
    }
  }
}
