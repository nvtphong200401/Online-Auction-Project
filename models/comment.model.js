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
    async countComment(userID, beingJudged = true) {
        let id_judged = 'ID2';
        let id_judging = 'ID1';
        if (!beingJudged) {
            [id_judged, id_judging] = [id_judging, id_judged];
        }
        return db.count('* as nComment').from('comment as c')
            .rightJoin('user as u', 'c.' + id_judging, 'u.ID')
            .where(id_judged, '=', userID);
    },
    async countGoodComment(userID, beingJudged = true) {
        let id_judged = 'ID2';
        let id_judging = 'ID1';
        if (!beingJudged) {
            [id_judged, id_judging] = [id_judging, id_judged];
        }
        return db.count('* as nComment').from('comment as c')
            .rightJoin('user as u', 'c.' + id_judging, 'u.ID')
            .where(id_judged, '=', userID).andWhere('Score', '=', 1);
    },

    async countBadComment(userId, beingJudged = true) {
        return await this.countComment(userId, beingJudged) - await this.countGoodComment(userId, beingJudged);
    },

    async percentGoodComment(userId, beingJudged = true) {
        const total = await this.countComment(userId, beingJudged);
        if (total === 0) // If there is no comment yet, return -1
            return -1;
        const good = await this.countGoodComment(userId, beingJudged);
        return good / total * 100;
    }
}

