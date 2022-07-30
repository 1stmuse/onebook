import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getBook } from './bookActions';
import {  v4 as uid } from "uuid"

export type Book = {
    id?: string
    title?: string,
    subtitle?: string,
    price?: string,
    image?: string,
    url?: string,
    isbn13?: string
    isCustom?: boolean
    customAmount?: number
}

export interface bookResponse {
    total: string,
    books: Book[]
}

interface initState {
    books: Book[],
    loading: boolean
}


const initialState: initState = {loading: true, books: []}

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBook: (state: initState, {payload}:PayloadAction<Partial<Book>>) => {
            const newBook: Book = {...payload, isCustom: true, id: uid()}
            state.books = [newBook, ...state.books]
        },
        editBook: (state: initState, {payload}:PayloadAction<Partial<Book>>) =>{
            const bookIndex = state.books.findIndex((bk) => bk.id === payload.id)
            state.books.splice(bookIndex, 1, payload)
        }
    },
    extraReducers: {
        [getBook.pending.toString()]: (state: initState, {payload}: PayloadAction<Partial<Book>>) => {
            state.loading = true
        },
        [getBook.fulfilled.toString()]: (state: initState, {payload}: PayloadAction<Partial<Book>[]>) =>{
            const formatedBooks = payload.map((bk) => ({
                ...bk,
                isCustom: false,
                id: uid(),

                customAmount: Math.floor((Math.random() * 7000) + 500 )
            }))
            state.books = [...state.books, ...formatedBooks]
            state.loading = false
        },
        [getBook.rejected.toString()]: (state: initState, {payload}: PayloadAction<Partial<Book>[]>) =>{
            state.loading = false
        }
    }
}) 

export const { addBook , editBook} = bookSlice.actions
export default bookSlice.reducer

