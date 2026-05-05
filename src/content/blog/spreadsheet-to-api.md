---
author: Cem Karakurt
pubDatetime: 2025-10-28T08:00:00Z
modDatetime: 2025-10-28T08:00:00Z
title: Converting a Google Spreadsheet to an API
slug: converting-a-google-spreadsheet-to-an-api
featured: true
draft: false
tags:
  - api
  - backend
  - cloudflare
description: Convert a Google Spreadsheet to an API using Google Apps Script and Cloudflare Workers.
---

For one of my projects, I needed a place to manage basic data. Installing a CMS or building a custom backend was overkill for my needs. I decided to use a Google Spreadsheet and convert it to an **[API](https://cemkarakurt.com/tags/api/)** using Google Apps Script and Cloudflare Workers. There are many apps that provide this service, but since Google does this for free, why not use it?

Only problem was that I needed to send requests from the browser, and Google Apps Script does not support CORS. So I had to use a proxy. This is where Cloudflare Workers comes in.

## 1. Creating the Google Apps Script project

Go to [apps-script page](https://developers.google.com/apps-script) and create a new project.

Add the following code to the script:

```javascript
function doGet(e) {
  const ss = SpreadsheetApp.openById("spreadsheet-id"); // Replace with your spreadsheet ID
  const sheet = ss.getSheetByName("sheet-name"); // Replace with your sheet name
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  const data = rows.map(r => {
    const obj = {};
    headers.forEach((h, i) => (obj[h] = r[i]));
    return obj;
  });
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);

  return output;
}
```

Click the `deploy` button and select `web app`. Do not forget to select the `Allow access to everyone` checkbox. Then confirm the deployment. You will get a URL like `https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec`.

## 2. Proxying the API

Now to overcome the CORS issue, we need to proxy the **[API](https://cemkarakurt.com/tags/api/)** through a **[Cloudflare Worker](https://cemkarakurt.com/tags/cloudflare/)**. Create a new worker and add the following code (by via dashboard or via CLI):

```javascript
/**
 * Cloudflare Worker - Simple API Proxy
 * Forwards requests to the API and returns the response
 */
export default {
  async fetch(request, env) {
    const res = await fetch("app-script-url"); // Replace with your app script URL
    const body = await res.text();
    return new Response(body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  },
};
```

This will proxy the API and return the response. However, since in every request we request the spreadsheet data again, it is not efficient. We can cache the data for a certain period of time using Cloudflare Workers KV.

Add the following code to the worker:

```javascript
export default {
  async fetch(request, env) {
    const cache = caches.default;
    const cacheKey = new Request(request.url);

    // Try cache first
    let response = await cache.match(cacheKey);
    if (response) return response;

    // Otherwise fetch and cache
    response = await fetch("app-script-url"); // Replace with your app script URL
    // Cache for 5 minutes
    response = new Response(response.body, response);
    response.headers.set("Cache-Control", "public, max-age=300"); // 5 minutes, replace with your desired cache time
    response.headers.set("Access-Control-Allow-Origin", "*");

    // Store in cache
    await cache.put(cacheKey, response.clone());

    return response;
  },
};
```

Now requests will be cached for 5 minutes and will be served from the cache.

## 3. Using the API

Now you can use the API in your project. Once you have the worker URL, you can use it in your project.

```javascript
const response = await fetch("worker-url/api/data"); // Replace with your worker URL
const data = await response.json();
console.log(data);
```

## Conclusion

I hope this helps you to convert a Google Spreadsheet to an API using Google Apps Script and Cloudflare Workers. If you have any questions, please feel free to leave a comment below.
