import dotenv from 'dotenv';
import AppDataSource from './dataSource';

import parsed from './constants';
import { User } from './entities/user';

import fetch from 'node-fetch';

dotenv.config();

const fetchAndInsertUser = async (data) => {
  const res = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${data.puuid}?api_key=${process.env.API_KEY}`);
  const result = await res.json();

  const user = User.create({ ...data, nickname: result.name });
  await User.insert(user);
}

const initUsers = async () => {
  await Promise.all(Object.values(parsed).map(fetchAndInsertUser));
  console.log("Done.");
}

AppDataSource.initialize()
  .then(() => {
    console.log('datasource init');    // here you can start to work with your database
    initUsers();
  })
  .catch((error) => console.log(error));

