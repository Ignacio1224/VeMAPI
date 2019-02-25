class Workshop {

    /**
     * 
     * @param {String} service 
     * @param {String} address 
     * @param {String} phone 
     * @param {String} description 
     * @param {String} img 
     * @param {String} id 
     * @param {String} lat 
     * @param {String} lng 
     */
    constructor(service, address, phone, description, img, id, lat, lng) {
        this.service = service;
        this.address = address;
        this.phone = phone;
        this.description = description;
        this.img = img;
        this.id = id;
        this.lat = parseFloat(lat);
        this.lng = parseFloat(lng);
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
     * Get Address
     * Public
     * @returns {String}
     */
    GetAddress() {
        return this.address;
    }

    /**
     * Get Phone
     * Public
     * @returns {String}
     */
    GetPhone() {
        return this.phone;
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
     * Get Img
     * Public
     * @returns {String}
     */
    GetImg() {
        return this.img;
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
     * Get Lat
     * Public
     * @returns {Float}
     */
    GetLat() {
        return this.lat;
    }

    /**
     * Get Lng
     * Public
     * @returns {Float}
     */
    GetLng() {
        return this.lng;
    }

    /**
     * Get Position
     * Public
     * @returns {JSON}
     */
    GetPosition() {
        const pos = {
            lat: this.lat,
            lng: this.lng
        };
        return pos;
    }
}

