import { toXML } from 'jstoxml';
import type { User } from '../types/user';
const account: User = {
    pid: 1,
    mii_hash1: 'AwAAQAJAOOSApDDg3QtZyK9dv9a1ngAAGRNNAHUAawB1AHIAbwAAAEkALgAAAGpAAJARAHpIRBgA FEYWIRQeYg0AACkAUkhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbU',
    mii_hash2: 'bc53de83f88c8d',
    nnid: 'prodtest',
    screen_name: 'Mukuro',
    gender: 'F',
    birth_date: '1990-01-01',
    create_date: '2023-11-10T22:11:73',
    email: 'l@g.c',
    id: 'a2efa818a34fa16b8afbc8a74eba3eda',
    country: 'US',
    utc_offset: -36000,
    language: 'en',
    mii_url: 'http://olv.genebelcher.com:8096/mii/1/standard.tga',
    tz_name: 'Pacific/Honolulu',
    update_time: '2023-11-10T22:11:73',
    region: 822411264,
    serviceToken: '',
    password: 'bbe0c989ce04dd55ae8f24b97c0b5928e2810841253388aea544e150f367d2f7'
}
const Content = {
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
            data: account.mii_hash1,
            id: 1816791782,
            mii_hash: account.mii_hash2,
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

console.log(toXML(Content));
