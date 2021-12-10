import db from '../utils/db.js';

export default {
    findComment(userID, beingJudged = true, page, limit) {
        const off = (page - 1) * limit;
        let id_judged = 'ID2';
        let id_judging = 'ID1';
        if (!beingJudged) {
            [id_judged, id_judging] = [id_judging, id_judged];
        }
        return db.select('*').from('comment as c')
            .rightJoin('user as u', 'c.' + id_judging, 'u.ID')
            .where(id_judged, '=', userID).offset(off).limit(limit);
    },
    async countComment(userID, beingJudged = true, positive = true) {
        let id_judged = 'ID2';
        let id_judging = 'ID1';
        if (!beingJudged) {
            [id_judged, id_judging] = [id_judging, id_judged];
        }
        const list = await db.count('* as nComment').from('comment')
            .rightJoin('user as u', 'c.' + id_judging, 'u.ID')
            .where(id_judged,  '=', userID)
            .andWhere('Score', '=', positive)

        return list[0].nComment;
    },
}

