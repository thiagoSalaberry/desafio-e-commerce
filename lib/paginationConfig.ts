import { NextApiRequest } from "next";
export function getLimitAndOffset(req:NextApiRequest, maxLimit:number, maxOffset:number) {
    const queryLimit = Number(req.query.limit);
    const queryOffset = Number(req.query.offset);
    const limit = queryLimit <= maxLimit ? queryLimit : maxLimit;
    const offset = queryOffset < maxOffset ? queryOffset : 0;
    return { limit, offset };
};