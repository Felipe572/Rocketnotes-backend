module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "minha_chave_secreta",
        expiresIn: "1d"
    }
}