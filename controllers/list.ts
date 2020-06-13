import ListClass from '../models/list.ts';

const listClass = new ListClass();

export const allList = async (ctx:any) => {
    const allData = await listClass.getAllList()
    ctx.response.body = allData; 
}

export const addList = async (ctx:any) => {
    const formBody = await ctx.request.body({
        contentTypes: {
            text: ["application/x-www-form-urlencoded"]
        }
    });

    const listTitle = formBody.value.get("title");
    const isCompleted = false;
    await listClass.createList({listTitle, isCompleted});
    ctx.response.body = {
        msg: 'Data has been Added'
    };
};
