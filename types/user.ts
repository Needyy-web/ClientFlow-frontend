export type User = {
    id: number,
    name: string,
    organization_id: number,
    role: "Owner" | "Admin" | "Employee",
    email: string,
};

export type HeaderProps = {
    user: User;
};