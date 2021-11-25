const list = [
    { UserID: 1, UserName: 'Phong', UserEmail: 'hihi@gmail.com' },
    { UserID: 2, UserName: 'Hieu', UserEmail: 'haha@gmail.com' },
    { UserID: 3, UserName: 'Thu', UserEmail: 'hehe@gmail.com' },
]

export default {
    findAll(){
        return list;
    },
    pending(){
        return list
    }
}