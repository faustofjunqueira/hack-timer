import { HackActivity, IHackActivity } from "./agenda";
import logger from '../../utils/log';
import * as fs from "fs";
import * as parse from "csv-parse/lib/sync";

export function csvParse(csvString: string): IHackActivity[]
{
    const csv: Array<{start: string, end: string, title: string, description: string}> =
    parse(csvString.trim(),
        {columns: (header) => header}
    );
    const activities = new Array<IHackActivity>();
    csv.forEach((row) => {
        activities.push(new HackActivity({
            start: new Date(row.start),
            end: new Date(row.end),
            title: row.title,
            description: row.description
        }));
    });
    logger.info(activities);
    return activities;
}

export async function getActivities(): Promise<IHackActivity[]>
{
   return await HackActivity.find({});
}

export async function saveActivities(csvString: string): Promise<IHackActivity[]>
{
    try
    {
        const activities = csvParse(csvString);
        const docs: IHackActivity[] = new Array<IHackActivity>();
        activities.forEach(async (a) => {
            docs.push(await HackActivity.create(a));
        });
        return Promise.resolve(docs);
    } catch {
        return Promise.reject();
    }
}

export async function resetActivities(): Promise<boolean>
{
    try {
        const activity = await HackActivity.remove({});
        return Promise.resolve(true);
    } catch {
        return Promise.resolve(false);
    }
}
