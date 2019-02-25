class Vehicle {

    /**
     * Cosntructor
     * @param {String} vehicleRegistration 
     * @param {String} description 
     * @param {User} user
     */
    constructor(vehicleRegistration, description, user, id) {
        this.vehicleRegistration = vehicleRegistration;
        this.description = description;
        this.user = user
        this.id = id;
    };


    GetId() {
        return this.id;
    }

    GetRegistration() {
        return this.vehicleRegistration;
    }

    GetDescription() {
        return this.description;
    }

    GetVehicleJSON() {
        const vehicle = {
            matricula: this.vehicleRegistration,
            descripcion: this.description,
            usuario: this.user
        };
        return vehicle;
    };
};
