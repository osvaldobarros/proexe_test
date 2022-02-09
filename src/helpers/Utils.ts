class Utils {
    static validateEmail = (email: string): boolean => {
        const re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;
        return re.test(email);
    }
}

export default Utils;