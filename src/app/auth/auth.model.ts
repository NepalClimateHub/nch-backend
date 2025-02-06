export type User = {
    id?: number;
    password: string;
    email: string;
    expertise: string | null;
    full_name: string;
    gender: string;
    profession: string | null;
    scope: "nch" | "organization" | "individual";
}