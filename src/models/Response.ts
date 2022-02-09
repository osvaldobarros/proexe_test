class Response<T> {
    statusCode: number;
    data?: T;
    errorMessage?: string;

    constructor(statusCode: number, data?: T, errorMessage?: string) {
        this.statusCode = statusCode;
        this.data = data;
        this.errorMessage = errorMessage;
    }

    static fromException<U>(): Response<U> {
        return new Response<U>(500, undefined, "An unexpected error occurred");
    }
}

export default Response;