/* -------------------------------------------------------------------------- */
/*                            Erreurs Application                             */
/* -------------------------------------------------------------------------- */

// la table n'existe pas dans la base de données
export const ERROR_NO_SUCH_TABLE = 1146;

/* -------------------------------------------------------------------------- */
/*                                 Codes HTTP                                 */
/* -------------------------------------------------------------------------- */

// réponse http en cas de succès
export const HTTP_OK = 200;

// réponse http en cas de création
export const HTTP_CREATED = 201;

// réponse http en cas de mauvaise requête de la part du client
export const HTTP_BAD_REQUEST = 400;

// réponse http en cas d'entité introuvable
export const HTTP_NOT_FOUND = 404;

// réponse http en cas d'erreur de l'application
export const HTTP_SERVER_ERROR = 500;
