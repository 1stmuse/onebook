import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBook = createAsyncThunk(
    "get/book",
    async (_,{ dispatch }) => {
      try {
        console.log("calling endpit")
        const res = await axios.get("https://api.itbook.store/1.0/new")
        return res.data?.books;
      } catch (err) {
       console.log(err)
      }
    }
  );

