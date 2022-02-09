import Address from "./Address"

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    address: Address;
}

export default User;