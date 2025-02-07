import type { User } from "./model.js";
import type { AuthRepository } from "../../adapter/persistent/auth.js";

export class AuthService {
    private repo: AuthRepository;
    constructor(repo: AuthRepository) {
        this.repo = repo;
    }

    public async create(input: User) {
        return this.repo.create(input);
    }
}
