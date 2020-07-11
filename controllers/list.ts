import ListClass from '../models/list.ts';

const listClass = new ListClass();

export const allList = async (ctx:any) => {
    const allData = await listClass.getAllList()
    ctx.render('index',{datas: allData});
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

export const deleteList = async (ctx:any) => {
    const listId = await ctx.params.listId;
    const deleteList = await listClass.deleteList(listId);
    if(deleteList == true){
        ctx.response.status = 200;
        ctx.response.body = {
            msg: 'List has been deleted'
        }
    }
    else{
        ctx.response.status = 404;
        ctx.response.body = {
            msg: 'List not found'
        }
    }
}

export const updateList = async (ctx:any) => {
    const listId = await ctx.params.listId;
    const updatedBody = await ctx.request.body({
        contentTypes: {
            text: ["application/x-www-form-urlencoded"]
        }
    });
    const listTitle = updatedBody.value.get("title");
    var isCompleted = updatedBody.value.get("completed");
    switch(isCompleted){
        case "true":
            isCompleted = true
            break;
        case "false":
            isCompleted = false
            break;
    }
    const isListUpdated = await listClass.editList({listTitle,isCompleted},listId);
    if(isListUpdated == true){
        ctx.response.status = 200;
        ctx.response.body = {
            msg: 'List has been updated'
        }
    }
    else{
        ctx.response.status = 404;
        ctx.response.body = {
            msg:"List not found"
        }
    }
}
