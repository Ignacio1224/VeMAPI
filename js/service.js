class Service {

    constructor(id, description, name) {
        this.id = id;
        this.description = description;
        this.name = name;
    }

    GetId () {
        return this.id;
    }

    GetDescription () {
        return this.description;
    }

    GetName () {
        return this.name;
    }
}