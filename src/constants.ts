export interface Player {
  name: string;
  nickname: string;
  mmr: number;
}

const data = [
  '송창경-호추안심스테이크-3038',
  '김재민-호주안심스테이크-2142',
  '윤준희-딱복좋아-2982',
  '황진혁-호주안심스태이크-2213',
  '도경환-호주인삼스테이크-1700',
  '권정원-권정원-1754',
  '권중혁-권중혁-1883',
  '김해녘-물박사-1806',
  '박순익-스테인리스판커리-1994',
  '장기순-장각 장기순-1800',
];

const parsed = data.reduce<Record<string, Player>>((acc, row) => {
  const [name, nickname, mmr] = row.split('-');

  acc[name] = {
    name,
    nickname,
    mmr: mmr ? Number(mmr) : 1500,
  };

  return acc;
}, {});

export default parsed;
