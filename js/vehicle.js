class Vehicle {

    /**
     * Cosntructor
     * @param {String} vehicleRegistration 
     * @param {String} description 
     * @param {User} user
     */
    constructor (vehicleRegistration, description, user) {
        this.vehicleRegistration = vehicleRegistration;
        this.description = description;
        this.user = user
    };


    GetVehicleJSON () {
        const vehicle = {
            matricula : this.vehicleRegistration,
            descripcion : this.description,
            usuario : this.user
        };
        return vehicle;
    };
};