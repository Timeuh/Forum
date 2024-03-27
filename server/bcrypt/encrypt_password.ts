import * as bcrypt from 'bcrypt';

/**
 * Encrypte un mot de passe avec bcrypt
 *
 * @param password le mot de passe à hacher
 *
 * @return une promesse contenant le mot de passe haché
 */
const encryptPassword = async (password: string): Promise<string> => {
  if (!process.env.BCRYPT_SALT) {
    throw new Error('Erreur : vous devez renseigner la variable d’environnement BCRYPT_SALT dans le .env');
  }

  const toHash = process.env.BCRYPT_SALT + password;

  return await bcrypt.hash(toHash, 10);
};

export default encryptPassword;
