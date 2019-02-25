class Maintenance {
    constructor(vehicle, service, workshop, date, time, description, kilometers, price, id) {
        this.vehicle = vehicle;
        this.service = service;
        this.workshop = workshop;
        this.date = date;
        this.time = time;
        this.description = description;
        this.kilometer = kilometers;
        this.price = price;
        this.id = id;
    }

    /**
     * Get Vehicle
     * Public
     * @returns {String}
     */
    GetVehicle() {
        return this.vehicle;
    }

    /**
     * Get Service
     * Public
     * @returns {String}
     */
    GetService() {
        return this.service;
    }

    /**
     * Get Worksop
     * Public
     * @returns {String}
     */
    GetWorkshop() {
        return this.workshop;
    }

    /**
     * Get Date
     * Public
     * @returns {String}
     */
    GetDate() {
        return this.date;
    }

    /**
     * Get Time
     * Public
     * @returns {String}
     */
    GetTime() {
        return this.time;
    }

    /**
     * Get Description
     * Public
     * @returns {String}
     */
    GetDescription() {
        return this.description;
    }

    /**
     * Get Id
     * Public
     * @returns {String}
     */
    GetKilometer() {
        return this.kilometer;
    }

    /**
     * Get Price
     * Public
     * @returns {String}
     */
    GetPrice() {
        return this.price;
    }

    /**
     * Get Id
     * Public
     * @returns {String}
     */
    GetId() {
        return this.id;
    }

    /**
     * Get DateTime
     * Public
     * @returns {String}
     */
    GetDateTime() {
        return this.date.split('-').reverse().join('-').replace(/-/g, '/') + " " + this.time;
    }

    /**
     * Get JSON
     * Public
     * @returns {JSON}
     */
    GetJSON() {
        const maintenance = {
            vehiculo: this.vehicle,
            descripcion: this.description,
            fecha: this.date.split('-').reverse().join('-').replace(/-/g, '/') + ' ' + this.time,
            servicio: this.service,
            kilometraje: this.kilometer,
            costo: this.price + ' U$D',
            taller: this.workshop
        }
        return maintenance;
    }
}