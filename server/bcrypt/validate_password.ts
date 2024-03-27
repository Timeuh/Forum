import bcrypt from 'bcrypt';

/**
 * Compare un mot de passe et sa version hachée en base de données
 *
 * @param password le mot de passe fourni
 * @param hashedPassword le mot de passe haché
 *
 * @return une promesse contenant le statut de la comparaison des mots de passe
 */
const validatePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  if (!process.env.BCRYPT_SALT) {
    throw new Error('Erreur : vous devez renseigner la variable d’environnement BCRYPT_SALT dans le .env');
  }

  const toDecode = process.env.BCRYPT_SALT + password;

  return await bcrypt.compare(toDecode, hashedPassword);
};

export default validatePassword;
