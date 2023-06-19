export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean,
    is_superuser: boolean,
    is_verified: boolean,
}