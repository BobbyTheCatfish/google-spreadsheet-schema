# Google-Spreadsheet-Schema
A schema based plugin for the 4.x version of the [Google-Spreadsheet](https://www.npmjs.com/package/google-spreadsheet/v/3.3.0) npm package

# Installation
```
npm i google-spreadsheet google-spreadsheet-schema
```

I mostly made this because
1) I didn't realize they introduced a schema option in v4, and
2) I didn't really like the implementation
3) It doesn't actually parse values

# To get started:

### Create a document, authorize it, and load the info

```js
import { GoogleSpreadsheet } from 'google-spreadsheet'
// or const { GoogleSpreadsheet } = require('google-spreadsheet')
import  { JWT } from "google-auth-library";

const auth = {
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
};

const account = new JWT(auth);


// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet('<the sheet ID from the url>', account);

await doc.loadInfo(); // loads document properties and worksheets
```

Now you're ready to make a schema! There are a few different types.

## Object Schemas
An object schema creates a Collection (a fancy Map) of objects based on the provided schema, with the key being one of the properties.

```js
import { ObjectSchema } from 'google-spreadsheet-schema'
// or const { ObjectSchema } = require('google-spreadsheet-schema')

const treeSchema = new ObjectSchema("name", {
  // object property name
  name: {
    type: "string",
    key: "Tree Name" // Column Name
  }
  // object property name
  color: {
    type: "string",
    key: "Tree Color" // Column Name
  },
  // object property name
  fruit: {
    type: "number",
    key: "Fruit Count" // Column Name
  }
})

await treeSchema.load(doc.sheetsByTitle["Trees"])

// The following column would be turned into this object:
// Tree Name | Tree Color | Fruit Count
// ----------|------------|------------
// oak       | brown      | 19

// { name: "oak", color: "brown", fruit: 19 }
```

## Array and Set Schemas
These provide single-column parsing. The syntax is the same for arrays and sets
```js
import { SetSchema } from 'google-spreadsheet-schema'

// "Column name", "type"
const colorSchema = new SetSchema("Tree Color", "string")

await colorSchema.load(doc.sheetsByTitle["Trees"])

// The following columns would be turned into this array or set:
// Tree Name | Tree Color | Fruit Count
// ----------|------------|------------
// oak       | brown      | 19
// peach     | pink       | 94
// cedar     | brown      | 34

// ["brown", "pink", "brown"] or Set<"brown", "pink">
```

## Function Schemas
Sometimes data types are more complicated than strings or numbers. Function Schemas take rows and run them through a custom function that you pass into it.

```js
import { FunctionSchema } from 'google-spreadsheet-schema'

const pointSchema = new FunctionSchema("UserId", (row) => {
  const user = client.users.get(row.get("UserId"));

  return {
    id: row.get("UserId"),
    username: user.username,
    points: parseInt(row.get("Points"))
  }
})

await pointSchema.load(doc.sheetsByTitle["Users"])

// The following column would be turned into this object
// UserId | Points
// -------|-------
// 123    | 15
// 456    | 34
// 789    | 72

// { id: "123", username: "Bobby", points: 15 }
```

# Advanced Usage

## Filters
When calling `load()`, you can pass in a filter. If it passes the filter, it will process the row and add it to the dataset.

```js
await pointSchema.load(doc.sheetsByTitle["Users"], (row) => {
  // this will only include rows that have a UserId
  return client.users.has(row.get("UserId"));
})
```

## Pre-fetched Rows
Sometimes you might need to make multiple schemas for the same sheet. In that case, you can do something like this to avoid API rate limits.

```js
// Example Sheet:
// ChannelId | Multiplier | BannedEmoji
// 123       | 5          | "📁"
// 456       | 2.1        | "🔥"
// 789       | 1          | "🐱"

const schema1 = new ObjectSchema(...)
const schema2 = new ArraySchema("BannedEmoji", "string")

const sheet = doc.sheetsByTitle["Sheet Name"]
const rows = await sheet.getRows();

await schema1.load(sheet, undefined, rows)
await schema2.load(sheet, undefined, rows)

// result:
// schema1:
// Collection<
// { channelId: "123", multiplier: 5 },
// { channelId: "456", multiplier: 2.1 },
// { channelId: "789", multiplier: 1 }
// >

// schema2: ["📁", "🔥", "🐱"]
```