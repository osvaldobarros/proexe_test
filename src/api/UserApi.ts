import User from "../models/User";
import Response from "../models/Response";
import axios from "axios";

const USER_API = "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb";

class UserApi {
    static getUserList = async (): Promise<Response<User[]>> => {
        try {
            const response = await axios.get<User[]>(`${USER_API}/data`);
            return new Response(response.status, response.data);
        } catch(e) {
            console.error(e);
            return Response.fromException();
        }
    }

    static addUser = async (user: User): Promise<Response<User>> => {
        try {
            const response = await axios.post(`${USER_API}/data`, user);
            return new Response(response.status);
        } catch(e) {
            console.error(e);
            return Response.fromException();
        }
    }

    static editUser = async (user: User): Promise<Response<User>> => {
        try {
            const response = await axios.put(`${USER_API}/data/${user.id}`, user);
            return new Response(response.status);
        } catch(e) {
            console.error(e);
            return Response.fromException();
        }
    }

    static deleteUser = async (userId: string): Promise<Response<void>> => {
        try {
            const response = await axios.delete(`${USER_API}/data/${userId}`);
            return new Response(response.status);
        } catch(e) {
            console.error(e);
            return Response.fromException();
        }
    }
}


export default UserApi;