import 'dotenv/config'

const {
  LIMIT_PAGE
} = process.env

export default {
  limit_page: Number(LIMIT_PAGE)
}