// les rôles possibles pour un utilisateur
export type Role = 'admin' | 'user';

// les informations d'un utilisateur
export type User = {
  pseudo: string;
  role: Role;
  id: number;
};

// les informations d'un forum
export type Forum = {
  id: number;
  name: string;
  created_at: string;
  subject_count: number;
};

// les informations d'un sujet
export type Subject = {
  id: number;
  name: string;
  forum_id: number;
  created_at: string;
  original_message_id: number;
};

// un forum avec ses sujets
export type FullForum = {
  forum: Forum;
  subjects: Subject[];
};
