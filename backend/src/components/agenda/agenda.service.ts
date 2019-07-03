import { HackActivity, IHackActivity } from "./agenda";
import * as fs from "fs";
import * as parse from "csv-parse/lib/sync";

export function csvParse(csvPath: string): IHackActivity[]
{
    const csv: Array<{start: string, end: string, title: string, description: string}> =
    parse(fs.readFileSync(csvPath).toString().trim(),
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
    return activities;
}

export async function getActivities(): Promise<IHackActivity[]>
{
   return await HackActivity.find({});
}

export async function saveActivities(csvPath: string): Promise<IHackActivity[]>
{
    try
    {
        const activities = csvParse(csvPath);
        const docs: IHackActivity[] = [];
        await activities.forEach(async (a) => {
            docs.push(await a.save());
        });
        return Promise.resolve(docs);
    } catch {
        return Promise.resolve([]);
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
