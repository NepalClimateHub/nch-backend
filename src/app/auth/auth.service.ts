import type { User } from "./auth.model.js";
import type { AuthRepository } from "./auth.repository.js";

export class AuthService {
    constructor(private repo: AuthRepository) {
        this.repo = repo;
    }

    public async create(input: User) {
        console.log("input: ", input);
        return this.repo.create(input);
    }
}
