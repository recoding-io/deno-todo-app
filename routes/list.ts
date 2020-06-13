import {Router} from 'https://deno.land/x/oak/mod.ts';
import {addList, allList} from '../controllers/list.ts';

const router = new Router();

router
    .get('/',allList)
    .post('/add-list', addList);

export default router;