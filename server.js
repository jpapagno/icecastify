import express from "express";
import fetch from "node-fetch"; 

import { createRequire } from "module";

const require = createRequire(import.meta.url);

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

const redirect_uri = "http://localhost:3000/callback";
const client_id = "be24cd8a8f5347fba35b81d9c862875d";
const client_secret = "8440eb90c7fe4ae884c2948dfb3edea7";

global.access_token;

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/authorize", (req, res) => {
  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: "user-library-read",
    redirect_uri: redirect_uri,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize?" + auth_query_parameters.toString()
  );
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  var body = new URLSearchParams({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: body,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });

  const data = await response.json();
  global.access_token = data.access_token;

  res.redirect("/iceberg");
});

// the get request function
async function getData(endpoint) {
  const response = await fetch("https://api.spotify.com/v1" + endpoint, {
    method: "get",
    headers: {
      Authorization: "Bearer " + global.access_token,
    },
  });

  const data = await response.json();
  return data;
}

app.get("/iceberg", async (req, res) => {
  const userInfo = await getData("/me");
  const showsInfo = await getData("/me/shows");
  
  let lev1Arr = [];
  let lev2Arr = [];
  let lev3Arr = [];
  let lev4Arr = [];
  let lev5Arr = [];
  let lev6Arr = [];


  for (let i = 0; i < showsInfo.items.length; i++) {
    const curName = showsInfo.items[i].show.name;
    const curNum = await getResults(curName);
    
    console.log(curNum)
    // searches under 1,000
    if (curNum < 1000) {
      lev1Arr.push(curName);
      // searches under 15,000 
    } else if (curNum < 15000) {
      lev2Arr.push(curName);
      // searches under 100,000
    } else if (curNum < 100000) {
      lev3Arr.push(curName);
      // searches under 1,000,000
    } else if (curNum < 1000000) {
      lev4Arr.push(curName);
      // searches under 3,000,000
    } else if (curNum < 3000000) {
      lev5Arr.push(curName);
      // else
    } else {
      lev6Arr.push(curName);
    }

  }

  res.render("iceberg", {lev1: lev1Arr, lev2: lev2Arr, lev3: lev3Arr, lev4: lev4Arr, lev5: lev5Arr, lev6: lev6Arr});
});

let listener = app.listen(3000, function () {
  console.log(
    "Your app is listening on http://localhost:" + listener.address().port
  );
});

const {Builder, By, Key, until, WebDriver, ChromiumWebDriver} = require('selenium-webdriver');

async function getResults(keyword) {
    let chrome = require('selenium-webdriver/chrome');
    let {Builder} = require('selenium-webdriver');
    let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments("--incognito").headless())
    .build();

  try {
    await driver.get('http://www.google.com/');
    await driver.sleep(.5);
    await driver.findElement(By.name('q')).sendKeys('"' + keyword + '"', Key.RETURN);
    let m = await driver.findElement(By.id('result-stats')).getText();
    
    let output = ""
    let flag = false;
    for (let i = 0; i < m.length; i++) {
      const cur = m[i];
      if (flag && cur != "," && cur != " " && cur != "r") {
        output = output + cur
      }

      switch(cur) {
        case " ":
          flag = true;
          break;
        case "r":
          console.log(parseInt(output));
          return parseInt(output);
      }
    }

  }
   finally {
    await driver.quit();
  }

  
};