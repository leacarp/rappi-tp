export class UpdateVendorProfile {
    private readonly restaurantName?: string;
    private readonly schedule?: string;
    private readonly phone?: string;

    constructor(
        restaurantName?: string,
        schedule?: string,
        phone?: string
    ){
        this.restaurantName = restaurantName;
        this.schedule = schedule;
        this.phone = phone;
    }

    getRestaurantName(): string | undefined {
        return this.restaurantName;
    }

    getSchedule(): string | undefined {
        return this.schedule;
    }

    getPhone(): string | undefined {
        return this.phone;
    }
}