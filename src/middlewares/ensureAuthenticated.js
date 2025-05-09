const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;

    console.log("Header recebido:", authHeader);

    if(!authHeader) {
        throw new AppError("JWT Token não informado", 401);
    }

    const [bearer, token] = authHeader.split(" ");
    console.log("Token extraído:", token);

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        request.user = {
            id: Number(user_id),
        };

        console.log("Usuário autenticado:", request.user);

        return next();
    } catch {
        console.error("Erro ao verificar token:", error);
        throw new AppError("JWT Token inválido", 401);

    }
}

module.exports = ensureAuthenticated;