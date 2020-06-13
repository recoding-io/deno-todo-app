import DB from './db.ts';

interface List {
    listTitle: string,
    isCompleted: boolean
}

class ListClass{
    constructor(){}

    listRepo = DB.collection('listCollection');

    getAllList = async () => {
        return await this.listRepo.find({});
    }

    createList = async (inputListDetails: List) => {
        const listTitle = inputListDetails.listTitle;
        const isCompleted = inputListDetails.isCompleted;
        const createList = await this.listRepo.insertOne({title: listTitle, completed: isCompleted});
        return createList;
    }

}

export default ListClass;