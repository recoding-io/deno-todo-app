import {Router} from 'https://deno.land/x/oak/mod.ts';
import {addList, allList, deleteList, updateList} from '../controllers/list.ts';

const router = new Router();

router
    .get('/',allList)
    .post('/add-list', addList)
    .delete('/delete/:listId', deleteList)
    .patch('/update/:listId', updateList);

export default router;