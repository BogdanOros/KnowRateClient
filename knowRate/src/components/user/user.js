class User {
    constructor() {
        this.user = null;
    }

    getUser = () => {
        return this.user;
    };

    setUser = (loaded) => {
        this.user = loaded;
    };

}

let user = new User();

export default user;