// Hashing - takes in arbitrary data & maps it to Hash/ Digest, can identify duplicate datasets
import bcrypt from "bcryptjs"

//🧂 - randomized data added into hashing
const saltRounds = 10;

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    console.log(salt)
    return bcrypt.hashSync(password, salt)
}
// this will rehash PWs
export const comparePW = (plain, hashed) =>
    bcrypt.compareSync(plain, hashed)