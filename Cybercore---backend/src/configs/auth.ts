import 'dotenv/config'
const SECRET_KEY = process.env.SECRET_JWT

if(!SECRET_KEY) {
  throw new Error('SECRET_KEY não definida');
}

const jwtConfig = {
  secret: SECRET_KEY,
  expiresIn: '1d',
}

export { jwtConfig }