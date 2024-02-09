import bcrypt from "bcrypt"

const saltRounds = 10;// how much time is needed to calculate the hash for bcrypt

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds) // can be async
    console.log(salt)
    return bcrypt.hashSync(password, salt)
}
//compare plain to hashed
//bcrypt.compareSync(plain , hashed )
export const comparePW = (plain, hashed) => {
    bcrypt.compareSync(plain ,hashed )
}
