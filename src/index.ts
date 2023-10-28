import express from "express"
import { credo, ff } from "./fetcher.js"

const app = express()
app.listen(3000, () => {
  console.log("Server started on port 3000")
})

app.get("/", async (req, res) => {
  const cred = await credo()
  if (!cred) return res.status(500)
  const data = await ff(0, cred.sm_id, cred.csrfToken)

  res.status(200).json(data)
})
