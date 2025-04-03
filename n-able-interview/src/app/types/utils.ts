import { MinimalRepository } from "./repositories";
import { User } from "./user";

export type RequiredProp<T, P extends keyof T> =
  & Omit<T, P>
  & Required<Pick<T, P>>;

export type RequiredKeys = {
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
};

export const requiredKeys: Array<keyof RequiredKeys> = [
  "private_gists",
  "total_private_repos",
  "owned_private_repos",
  "disk_usage",
  "collaborators",
  "two_factor_authentication",
];

export interface DataResponse<T> {
  data: T | null;
  error: string | null;
}

export interface UserWithRepositoriesResponse {
  user: User | null;
  userError: string | null;
  repositories: MinimalRepository[] | null;
  repoError: string | null;
}