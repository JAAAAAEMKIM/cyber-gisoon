import parsed, { Player } from '../constants';

class TeamMaker {
  players: Player[] = [];
  optimalValue = Infinity;
  ret: Player[][] = [];

  setPlayers(values: string[]) {
    this.players = values.map((value) => parsed[value]).filter(Boolean);
  }

  calculate() {
    const count = Math.floor(this.players.length / 2);
    this.dfs(0, [], count);

    return this.ret;
  }

  private setOptimalValue(queue: number[]) {
    const teamA: Player[] = [];
    const teamB: Player[] = [];

    this.players.map((player, index) => {
      if (queue.includes(index)) {
        teamA.push(player);
      } else {
        teamB.push(player);
      }
    });

    const newValue = Math.abs(
      teamB.reduce((acc, { mmr }) => acc + mmr * mmr, 0) -
        teamA.reduce((acc, { mmr }) => acc + mmr * mmr, 0)
    );

    console.log(
      'A: ',
      teamA,
      teamA.reduce((acc, { mmr }) => acc + mmr * mmr, 0)
    );
    console.log(
      'B: ',
      teamB,
      teamB.reduce((acc, { mmr }) => acc + mmr * mmr, 0)
    );
    console.log(this.optimalValue, newValue);

    if (newValue < this.optimalValue) {
      this.optimalValue = newValue;
      this.ret = [[...teamA], [...teamB]];
    }
  }

  private dfs(idx: number, queue: number[], count: number) {
    if (count === queue.length) {
      this.setOptimalValue(queue);
      return;
    }

    for (let i = idx; i < this.players.length; i++) {
      queue.push(i);
      this.dfs(i + 1, queue, count);
      queue.pop();
    }
  }
}

export default TeamMaker;
