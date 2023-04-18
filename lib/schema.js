// Defining standard schema for quick ref

// Documents in 'hospitals' Collection
const HOSPITAL = {
    id: uuidString,
    name: string,
    branch: string,
    phone: integer, // 10 digit
    mail: string,
    address: string,
    password: hash, // Argon2 password hash
    new: boolean, // Whether it is a new account,if true, reset default password and set to false
}

const RADIOLOGIST = {

}





