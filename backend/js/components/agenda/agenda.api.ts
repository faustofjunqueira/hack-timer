import { Application, Router } from 'express';
import { getActivities} from "./agenda.service";

export function configureAgendaRouter(app: Application) {
    const router = Router();
    router.get('/', async (req, res) => res.json(await getActivities()));
    app.use('/agenda', router);
}
