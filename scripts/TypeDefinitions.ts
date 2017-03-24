export type AccountCreated = {
    id: string,
    name: string
}

export type AccountDeleted = {
    id: string,
    name: string
}

export type Account = {
    id: string;
    name: string;
    status?: "ACTIVE" | "DELETED"
};