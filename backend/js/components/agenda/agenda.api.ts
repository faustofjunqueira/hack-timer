import { Application, Router } from 'express';
import { getActivities, resetActivities, saveActivities} from "./agenda.service";

export function configureAgendaRouter(app: Application) {
    const router = Router();
    router.get('/', async (req, res) => res.json(await getActivities()));
    router.delete('/', async (req, res) => res.json(await resetActivities()));
    router.put('/', async (req, res) => {
        res.json(await saveActivities(req.body));
    });
    return app.use('/agenda', router);
}
