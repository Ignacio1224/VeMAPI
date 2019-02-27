class Service {

    /**
     * Constructor
     * @param {String} id 
     * @param {String} description 
     * @param {String} name 
     */
    constructor(id, description, name) {
        this.id = id;
        this.description = description;
        this.name = name;
    }


    /**
     * Get Id
     * Public
     * @returns {String}
     */
    GetId () {
        return this.id;
    }

    /**
     * Get Description
     * Public
     * @returns {String}
     */
    GetDescription () {
        return this.description;
    }

    /**
     * Get Name
     * Public
     * @returns {String}
     */
    GetName () {
        return this.name;
    }
}

