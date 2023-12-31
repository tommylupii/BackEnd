import express from "express"

const app = express()
const PORT = 8080
let currentID = 0

let usuarios = []

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/api/user", (req, res) => {
  res.json({datos: usuarios})
})

app.post("/api/user", (req, res) => {
  let {first_name, last_name, email, password} = req.body
  if (!email || !password){
    res
    .status(400)
    .send("para pdoer crear el usuario es necesario el email y password")
  }

  let newUser = {
    id: currentID++,
    first_name,
    last_name,
    email,
    password,
  }

  usuarios.push(newUser)

  res.status(200).json("usuario creado correctamente")
})

app.put("/api/user/:id", (req, res) => {
  let {id} = req.params
  const {first_name, last_name, email, password} = req.body
  id = parseInt(id)
  let indexUser = usuarios.findIndex(usuario => usuario.id === id)
  let newUser = {
    id,
    first_name,
    last_name,
    email,
    password,
  }

  if (indexUser !== -1) {
    usuarios[indexUser] = newUser
    res.json({mensaje: "usuario actualizado", data: usuarios})
  } else {
    res.josn({mensaje: "usuario no encontrado"})
  }
})

app.delete("/api/user/:id", (req, res) => {
  let {id} = req.params
  let temporalUser = {}
  id = parseInt(id)
  let indexUser = usuarios.findIndex(usuario => usuario.id === id)

  if (indexUser !== -1) {
    temporalUser = usuarios[indexUser]
    usuarios.splice(indexUser, 1)
    res.json({mensaje: "usuario eliminado", data: temporalUser})
  } else {
    res.json({mensaje: "usuario no encontrado"})
  }

})

app.listen(PORT, () => {
  console.log(`servidor running en el puerto ${PORT}`)
})