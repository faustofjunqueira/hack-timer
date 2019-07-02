import { Application, Router } from 'express';
import { getActivities} from "./agenda.service";

export function getAllActivities(app: Application) {
    const router = Router();
    router.get('/', async (req, res) => res.json(await getActivities()));
    return app.use('/agenda', router);
}
