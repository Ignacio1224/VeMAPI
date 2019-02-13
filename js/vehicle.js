class Vehicle {

    /**
     * Cosntructor
     * @param {String} car_registration 
     * @param {String} description 
     * @param {User} user
     */
    constructor (car_registration, description, user) {
        this.car_registration = car_registration;
        this.description = description;
        this.user = user
    };


    GetVehicle () {
        const vehicle = {
            car_registration : this.car_registration,
            description : this.description,
            user : this.user
        };
        return vehicle;
    };
};