export interface Player {
  name: string;
  mmr: number;
  puuid: string;
}

const puuids: Record<string, string> = {
  김재민:
    "GQHZ5nLVNPMUIvoUE76umVkmy8V8xxju2DeBknAZ7ByOS16Cu99Q_pvgPCk5hI6dIbGPLZ-OSbMq3A",
  송창경:
    "obZZEE23lpGHIJZAWgEGpBQ-5sWso7AXy-Rs83zZTHVTF72vOWgXHWjGvUmDzCGEc_mm5SYTC8ePTQ",
  윤준희:
    "jFthXjs4h6OTlV5WsAyE09D7kB2_6wpG0VDsmPsQ-UL7nIamrRsbMtqCRwXeZaFg_ZIO8mZoFjIS7Q",
  황진혁:
    "7rP4eGV1ZMGQk_4rqohdeTj2gFAkZ8q2JY8FB4Bd_aUGcK5zW5uCgud5fi57xtee67kq3B79ijy1SA",
  도경환:
    "UH7cpwvmPY7w_LOSZpgwNrnfSVVs_zuz5lb8Pifrz9EfditURiBue-UoJXv_Gs9PWO0llYCpRGhy1w",
  권정원:
    "_FHRZpJp9INSuLFgxq2hEl1RgNQ2CAWUpOMGrwEqf_KTgqPOMXLsmS1uswFX3a-XApoXqIktVsbo8w",
  권중혁:
    "0yrdp39D69I1DD7qmoO6bexmlWs_L74KoLZqDeKenSM1QA89TnTHlm29bPsLlekwIePVbyyex8qQrw",
  김해녘:
    "Mk6dvbkhuwDjxT2mzlt834FEFunx2_irqfMXMn3VfdoV25v2vd4mzDSBgWgkxKoM4o_RD2B6aDaU1w",
  박순익:
    "8RLExX0sjwzZiCFINl0QRtkrPSQJHunpqSDxRk6d8hB0dZvgdRWkr7X7LTJRg1ahLSDtEpwT6me8JQ",
  장기순:
    "_aV-z6tRXLob3WQDWsGieKvB8FF7BRaSZAtZ-GWYSEAzEnohmbA2Jgj267-HTJa0BeolqDNToEDaPA",
};

const data = [
  "송창경-3038",
  "김재민-2142",
  "윤준희-2982",
  "황진혁-2213",
  "도경환-1700",
  "권정원-1754",
  "권중혁-1883",
  "김해녘-1806",
  "박순익-1994",
  "장기순-1800",
];

const parsed = data.reduce<Record<string, Player>>((acc, row) => {
  const [name, mmr] = row.split("-");
  const puuid = puuids[name] || "";

  acc[name] = {
    name,
    mmr: mmr ? Number(mmr) : 1500,
    puuid,
  };

  return acc;
}, {});

export default parsed;

export const discordUserMap: Record<string, string> = {
  김재민: "김재민",
  장기순: "장기순",
  권중혁: "권중혁",
  kwongarden: "권정원",
  무딜링호흡창경: "송창경",
  준희: "윤준희",
  황진혁: "황진혁",
  박순익: "박순익",
  도도새: "도경환",
};
