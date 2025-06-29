import { Model } from "mongoose"

export interface iBook{
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description: string,
    copies: number,
    available: boolean
}

export interface updateAvailableStaticMethod extends Model<iBook>{
    updateAvailable( bookId: string): Promise<void>
}