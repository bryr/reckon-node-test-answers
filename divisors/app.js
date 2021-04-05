import express from 'express';
import fetch from 'node-fetch';
import { getDivisorOutputs } from './getDivisorOutputs.js';

const app = express();
const port = 9999;

const rangeApiUrl = 'https://join.reckon.com/test1/rangeInfo';
const divisorsApiUrl = 'https://join.reckon.com/test1/divisorInfo';
const maxApiRetries = 50;
const retryDelayMs = 100;

app.get('/', async (req, res) => {
  try {
    const range = await getApiJson(rangeApiUrl);
    if (!range) 
      throw `Range API failed after ${maxApiRetries} retries`;

    const divisorsJson = await getApiJson(divisorsApiUrl)
    if (!divisorsJson)
      throw `Divisors API failed after ${maxApiRetries} retries`;
    const divisors = divisorsJson.outputDetails;

    const outputs = getDivisorOutputs(range.lower, range.upper, divisors);
    res.send(getResponse(range.lower, range.upper, outputs));
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
})

//given an array of divisor outputs, return html that can be sent back to the api caller 
const getResponse = (lowerRange, upperRange, divisorOutputs) => {
  let response = '';

  for (let i = lowerRange; i <= upperRange; i++) {
    response += `${i}: `;
    const outputs = divisorOutputs[i];
    if (outputs)
      response += outputs.join('');
    response += '<br>';
  }  

  return response;
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

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.listen(port, () => console.log(`Listening on port ${port}`));