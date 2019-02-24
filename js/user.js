class User {
    
    /**
     * Constructor
     * @param {String} id
     * @param {String} email 
     * @param {Number} phone 
     * @param {String} password 
     * @param {String} token
     * @param {Vehicle} vehicle
     * @param {Array} workshop 
     */
    constructor (id, email, phone, password = null, token = null) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.token = token;
        this.workshop = [];
    };


    /**
     * Get Id
     * Public
     * @returns {String}
     */
    GetId () {
        return this.id;
    };

    /**
     * Get Email
     * Public
     * @returns {String}
     */
    GetEmail () {
        return this.email;
    };

    /**
     * Get Phone
     * Public
     * @returns {Number}
     */
    GetPhone () {
        return this.phone;
    };

    /**
     * Get Password
     * Public
     * @returns {String}
     */
    GetPassword () {
        return this.password;
    };


    /**
     * Get Token
     * Public
     * @returns {String}
     */
    GetToken () {
        return this.token;
    };


    /**
     * Generate LogIn JSON
     * @returns {JSON}
     */
    GenerateLogInJSON () {
        const user = {
            email : this.email,
            password : this.password
        };
        return user;
    }


    /**
     * Generate JSON
     * Public
     * @returns {JSON}
     */ 
    GenerateSignInJSON () {
        const user = {
            email : this.email,
            telefono : String(this.phone),
            password : this.password
        };
        return user;
    };


    /**
     * User
     * Public
     * @returns {Object}
     */
    User () {
        const user = {
            email : this.email,
            phone : this.phone,
            token : this.token
        };
        return user;
    };

};