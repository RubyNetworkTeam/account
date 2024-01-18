import type { User } from "../types/user";

export function LoginResponse(account: User){
    return {
        person: {
            active_flag: "Y",
            birth_date: account.birth_date,
            country: account.country,
            create_day: account.create_date,
            device_attributes: {},
            gender: account.gender,
            language: account.language,
            updated: account.update_time,
            marketing_flag: "N",
            off_device: "Y",
            pid: account.pid,
            email: {
                address: account.email,
                id: 2425205774,
                parent: "N",
                reachable: "Y",
                type: "DEFAULT",
                updated_by: "USER",
                validated: "Y",
                validated_date: {}
            },
            mii: {
                status: "COMPLETED",
                data: account.mii_data,
                id: 1816791782,
                mii_hash: account.mii_hash,
                mii_images: {
                    mii_image: {
                        cached_url: account.mii_url,
                        id: 1,
                        url: account.mii_url,
                        type: 'standard',
                    }
                },
                name: account.screen_name,
                primary: "N",
            },
            region: account.region,
            tz_name: account.tz_name,
            user_id: account.nnid,
            utc_offset: account.utc_offset
        }
    }
}