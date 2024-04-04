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
};

// un forum avec ses sujets
export type FullForum = {
  forum: Forum;
  subjects: Subject[];
};

// message d'un sujet
export type SubjectMessage = {
  id: number;
  text: string;
  user_id: number;
  subject_id: number;
  last_updated: string;
  pseudo: string;
};

// un sujet avec ses messages
export type FullSubject = {
  subject: Subject;
  messages: SubjectMessage[];
};
