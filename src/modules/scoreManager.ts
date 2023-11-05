import { User } from "../entities/user";
import parsed from "../constants";

type MatchResult = {
  win: number;
  lose: number;
};

const BASE_POINT = 30;
const SYNC_TIME = 15000;

class ScoreManager {
  #instance: ScoreManager | null = null;

  constructor() {
    if (!this.#instance) {
      this.#instance = this;
    } else {
      throw new Error("already instantiated!");
    }
  }

  async update(name: string, result: MatchResult) {
    const player = await User.findOneBy({ name });
    if (!player) return;
    const score = player.mmr;
    const delta = (result.win - result.lose) * BASE_POINT;
    User.update(player.id, { mmr: score + delta });
  }

  async getAllRank() {
    const users = await User.find();
    users.sort((a, b) => b.mmr - a.mmr);

    return users
      .map((user, i) => `${i + 1}: ${user.name} - ${user.mmr}`)
      .join("\n");
  }

  async getScoreByName(name: string) {
    const user = await User.findOneBy({ name });

    if (!user) return 2000;

    return user.mmr;
  }

  async getRankByName(name: string) {
    const users = await User.find();
    users.sort((a, b) => b.mmr - a.mmr);

    const idx = users.findIndex((user) => user.name === name);
    if (idx < 0) return 0;

    return idx + 1;
  }
}

export default new ScoreManager();
