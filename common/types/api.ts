// objet réponse d'api
export type ApiResponse<T = unknown> = {
  code: number;
} & (
  | {
      message: string;
    }
  | {
      data: T;
    }
);

// objet erreur d'api
export type ApiError = {
  code: number;
  error: string;
};
