import express from 'express';
import fetch from 'node-fetch';
import { getSubtextResults } from './getSubtextResults.js';

const app = express();
const port = 9999;

const searchTextApiUrl = 'https://join.reckon.com/test2/textToSearch';
const subTextsApiUrl = 'https://join.reckon.com/test2/subTexts';
const submitResultsApiUrl = 'https://join.reckon.com/test2/submitResults'
const maxApiRetries = 50;
const retryDelayMs = 100;

app.get('/', async (req, res) => {
  try {
    const searchTextJson = await getApiJson(searchTextApiUrl);
    if (!searchTextJson) 
      throw `Search text API failed after ${maxApiRetries} retries`;
    const searchText = searchTextJson.text;

    const subTextsJson = await getApiJson(subTextsApiUrl)
    if (!subTextsJson)
      throw `Sub texts API failed after ${maxApiRetries} retries`;
    const subTexts = subTextsJson.subTexts;

    const results = getSubtextResults(searchText, subTexts);

    const data = getPostData(searchText, results);
    if(!postApiData(submitResultsApiUrl, data))
      throw `Submit results API POST failed after ${maxApiRetries} retries`;

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
})

const getPostData = (searchText, results) => {
  return {
    "candidate": "Paul Bryant",
    "text": searchText,
    "results": results
  };
}

//return json retrieved from the api at the given url. Keep retrying until a 200 response is recieved or maxApiRetries is exceeded
const getApiJson = async (apiUrl) => {
  let json = null;
  for (let retry = 0; retry <= maxApiRetries; retry++) {
    if (retry > 0)
      console.log(`Failed to retrieve json from endpoint ${apiUrl}. Retry ${retry}`);

    const res = await fetch(apiUrl);
    if (res.ok) {
      json = await res.json();
      break;
    } else {
      await sleep(retryDelayMs);
    }
  }

  if (json != null) {
    console.log(`Received json from endpoint ${apiUrl}`);
    console.log(json);
    return json;
  } else {
    console.log(`Failed to retrieve json from endpoint ${apiUrl}. No more retries!`);
    return null;
  }
};

//post the given data to the api at the given url. Keep retrying until a 200 response is recieved or maxApiRetries is exceeded
const postApiData = async (apiUrl, data) => {
  for (let retry = 0; retry <= maxApiRetries; retry++) {
    if (retry > 0)
      console.log(`Failed to post data to endpoint ${apiUrl}. Retry ${retry}`);

    const res = await fetch(apiUrl, { 
      method: 'POST', 
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' } 
    });

    if (res.ok) {
      console.log(`Successfully posted data to endpoint ${apiUrl}`);
      return true;
    } else {
      await sleep(retryDelayMs);
    }
  }

  console.log(`Failed to post data to endpoint ${apiUrl}. No more retries!`);
  return false;
};

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.listen(port, () => console.log(`Listening on port ${port}`));