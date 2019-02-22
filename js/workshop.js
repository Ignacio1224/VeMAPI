class Workshop {

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

    GetService() {
        return this.service;
    }

    GetAddress() {
        return this.address;
    }

    GetPhone() {
        return this.phone;
    }

    GetDescription() {
        return this.description;
    }

    GetImg() {
        return this.img;
    }

    GetId() {
        return this.id;
    }

    GetLat() {
        return this.lat;
    }

    GetLng() {
        return this.lng;
    }

    GetPosition() {
        const pos = { lat: this.lat, lng: this.lng };
        return pos;
    }
}

