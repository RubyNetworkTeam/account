import type { User } from "../types/user";

export function FriendHelper(rnid: string, account?: User) {
    if(!account){
        return {
            mapped_ids: {
                mapped_id: {
                    in_id: rnid,
                    out_id: ""
                }
            }
        }
    }

    return {
        mapped_ids: {
            mapped_id: {
                in_id: rnid,
                out_id: account.pid
            }
        }
    }
}