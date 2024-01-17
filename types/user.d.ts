export type User = {
    pid: number;
    mii_hash1: string;
    mii_hash2: string;
    nnid: string;
    screen_name: string;
    // idk if nintendo network allows another gender srry
    gender: "M" | "F";
    // format year-month-day
    birth_date: string;
    // format: year-month-day + T + hour:minute:second
    create_date: string;
    email: string;
    id: string;
    country: string;
    utc_offset: number;
    language: string;
    mii_url: string;
    tz_name: string;
    // format: year-month-day + T + hour:minute:second
    update_time: string;
    region: number;
    serviceToken: string;
    password: string;
}