export const SyphorServicePath = "/services/syphor";

export interface SyphorServiceCredentials {
  url: string;
  username: string;
  password: string;
}

export interface ISyphorService {
  initialize(credentials: SyphorServiceCredentials): Promise<void>;
  runQuery(query: string): Promise<any[]>;
}

export const SyphorService = Symbol("SyphorService");
