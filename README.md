# Google-Spreadsheet-Schema
A schema based plugin for the 3.x version of the [Google-Spreadsheet](https://www.npmjs.com/package/google-spreadsheet/v/3.3.0) npm package

I mostly made this because
1) I didn't realize they introduced a schema option in v4, and
2) I didn't really like the implimentaion

## To get started:

### Create a document, authorize it, and load the info

```js
import { GoogleSpreadsheet } from 'google-spreadsheet'
// or const { GoogleSpreadsheet } = require('google-spreadsheet')

// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet('<the sheet ID from the url>');

await doc.useServiceAccountAuth(config.auth); // authorizes the document
await doc.loadInfo(); // loads document properties and worksheets
```

### Create a new Schema

```js
import { Schema } from 'google-spreadsheet-scheme'
// or const { Schema } = require('google-spreadsheet-schema')

const schema = new Schema(doc, {
  // Sheet Name
  Trees: {
    // Column Names
    Height: String,
    "Fruit Type": String,
  },
  // Sheet Name
  Bushes: {
    // Column Names
    Bushiness: String,
    "Fruit Count": String
  }
})
```

<b>More features like more types besides string, validation, and slightly less clunky wording are coming in a future version.</b>

## Using the schema
Class methods `Schema.getRows(sheetName)`, `Schema.addRow(sheetName)`, and `Schema.addRows(sheetName)` are effectively the same thing as `doc.sheetsByTitle[sheetName].(getRows|addRow|addRows)`, but provide intellisense.

`getSheet` acts like `doc.sheetsByTitle[sheetName]`, but provides a `GoogleSpreadsheetWorksheet` instead of `never`.

`Schema.doc` provides the original document passed in. It's reccomended to use this instead of directly referencing the doc we created.

`Schema.scheme` provides the input schema and can be modified. The functions above only provide types, so modifying `Schema.scheme` doesn't change anything in runtime.

