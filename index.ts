import GS from 'google-spreadsheet'

type Row = { [key: string]: string}
type Sheet = { [key: string]: Row }


class Schema<S extends Sheet>{
    scheme: S
    doc: GS.GoogleSpreadsheet
    constructor(doc: GS.GoogleSpreadsheet, scheme: S) {
        if (!doc.auth) throw new SyntaxError("Spreadsheet not Authorized!")
        if (doc.sheetsByIndex.length == 0) throw new SyntaxError("Spreadsheet not loaded (or has no sheets)!")
        this.scheme = scheme
        this.doc = doc;
    }
    async getRows<K extends keyof S>(name: K) {
        const byTitle = this.doc.sheetsByTitle as Record<K, GS.GoogleSpreadsheetWorksheet>
        const data = byTitle[name].getRows()
        return data as Promise<(S[K] & GS.GoogleSpreadsheetRow)[]>
    }
    async addRows<K extends keyof S>(name: K, rowData: S[K][], options?: GS.AddRowOptions) {
        const byTitle = this.doc.sheetsByTitle as Record<K, GS.GoogleSpreadsheetWorksheet>
        const data = byTitle[name].addRows(rowData.map(r => r), options)
        return data as Promise<(S[K] & GS.GoogleSpreadsheetRow)[]>
    }
    async addRow<K extends keyof S>(name: K, rowData: S[K], options?: GS.AddRowOptions) {
        const byTitle = this.doc.sheetsByTitle as Record<K, GS.GoogleSpreadsheetWorksheet>
        const data = byTitle[name].addRow(rowData, options)
        return data as Promise<(S[K] & GS.GoogleSpreadsheetRow)>
    }
    /**
     * @description Use getRows and addRow(s) instead if possible.
     */
    getSheet<K extends keyof S>(name: K) {
        const byTitle = this.doc.sheetsByTitle as Record<K, GS.GoogleSpreadsheetWorksheet>
        return byTitle[name]
    }
}

// example/testing to make sure everything works right

const sh = new GS.GoogleSpreadsheet("", {apiKey: ""})

const scheme = new Schema(sh, {
    trees: {
        watered: "",
        apples: ""
    },
    grass: {
        "height": ""
    }
})

async function testing() {
    const get = await scheme.getRows("trees")
    get.filter(b => b.apples)
    const addMany = await scheme.addRows("grass", [{ height: '23' }])
    addMany.filter(b => b.height)
    const addOne = await scheme.addRow("trees", { apples: "53", watered: "TRUE" })
    addOne.apples
    scheme.getSheet("grass")
}
