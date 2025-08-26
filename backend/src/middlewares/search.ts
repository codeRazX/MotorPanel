import { RequestHandler } from "express";
import { sanitazeSearch, setFilters } from "../utils/filters";
import { normalizeString } from "../utils";

export const search : RequestHandler = async (req, res, next) => {
  let rawSearch = req.query.search
  let search: string | number | boolean | null = null
  const user = req.user!

  if (typeof rawSearch === 'string') {
    if (rawSearch.trim() !== '' && rawSearch.length <= 50) {
      search = sanitazeSearch(normalizeString(rawSearch))
      console.log(search)
    }
  }
  
  req.filters =  await setFilters(search, user.id, req.baseUrl)
  next()
}