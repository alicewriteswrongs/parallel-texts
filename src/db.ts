import Dexie from "dexie"

export interface ParallelText {
  id?: number
  title: string
}

export interface Translation {
  id?: number
  language: string
  text: string
  parallelTextID: number
}

export class TextDatabase extends Dexie {
  parallelTexts: Dexie.Table<ParallelText, number>
  translations: Dexie.Table<Translation, number>

  constructor() {
    super("ParallelTextDatabase")

    this.version(1).stores({
      parallelTexts: "++id, title",
      translations: "++id, language, text, parallelTextID",
    })

    this.parallelTexts = this.table("parallelTexts")
    this.translations = this.table("translations")
  }
}

export const db = new TextDatabase()
