// les rôles possibles pour un utilisateur
export type Role = 'admin' | 'user';

// les informations d'un utilisateur
export type User = {
  pseudo: string;
  role: Role;
};
