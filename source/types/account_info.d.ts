export type AccountInfoResponse = {
    person: {
        active_flag: "Y";
        birth_date: string;
        country: string;
        create_day: string;
        device_attributes: {};
        gender: "M" | "F";
        language: string;
        updated: string;
        marketing_flag: "N";
        off_device: string;
        pid: number;
        password: string;
        email: {
            address: string;
            id: 2425205774 | number;
            parent: "N";
            reachable: "Y";
            type: "DEFAULT";
            updated_by: "USER";
            validated: "Y";
            validated_date: {}
        };
        mii: {
            status: "COMPLETED";
            /** TODO: Make sure its correct */
            date: string;
            data: string;
            id: 1816791782;
            mii_hash: string;
            mii_images: {
                mii_image: {
                    cached_url: string;
                    id: number;
                    url: string;
                    type: 'standard';
                }
            };
            name: string;
            primary: "N";
        };
        region: string;
        tz_name: string;
        user_id: string;
        utc_offset: number
    }
}