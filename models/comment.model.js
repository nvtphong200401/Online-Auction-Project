import db from '../utils/db.js';

export default {
    findComment(userID, beingJudged = true, page, limit) {
        const off = (page - 1) * limit;
        let id_judged = 'ID2';
        let id_judging = 'ID1';
        if (!beingJudged) {
            [id_judged, id_judging] = [id_judging, id_judged];
        }
        return db.select('c.*', 'u.Username as Username', 'p.ProName as ProName').from('comment as c')
            .rightJoin('user as u', 'c.' + id_judging, 'u.ID')
            .leftJoin('product as p', 'c.ProId', 'p.ProId')
            .where(id_judged, '=', userID).offset(off).limit(limit);
    },
    async countComment(userID, beingJudged = true) {
        let id_judged = 'ID2';
        let id_judging = 'ID1';
        if (!beingJudged) {
            [id_judged, id_judging] = [id_judging, id_judged];
        }
        const total = await db.count('* as nComment').from('comment as c')
            .rightJoin('user as u', 'c.' + id_judging, 'u.ID')
            .where(id_judged, '=', userID);

        return total[0].nComment;
    },
    async countGoodComment(userID, beingJudged = true) {
        let id_judged = 'ID2';
        let id_judging = 'ID1';
        if (!beingJudged) {
            [id_judged, id_judging] = [id_judging, id_judged];
        }
        const good = await db.count('* as nComment').from('comment as c')
            .rightJoin('user as u', 'c.' + id_judging, 'u.ID')
            .where(id_judged, '=', userID).andWhere('Score', '=', 1);

        return good[0].nComment;
    },
    async countBadComment(userId, beingJudged = true) {
        const total = await this.countComment(userId, beingJudged)
        const good = await this.countGoodComment(userId, beingJudged)
        return total - good;
    },
    async percentGoodComment(userId, beingJudged = true) {
        const total = await this.countComment(userId, beingJudged);
        if (total === 0) // If there is no comment yet, return -1
            return -1;
        const good = await this.countGoodComment(userId, beingJudged);
        return good / total * 100;
    },
    async percentBadComment(userId, beingJudged = true) {
        const total = await this.countComment(userId, beingJudged);
        if (total === 0) // If there is no comment yet, return -1
            return -1;
        const bad = await this.countBadComment(userId, beingJudged);
        return bad / total * 100;
    },
    addComment(comment) {
        return db('comment').insert(comment);
    },
}

