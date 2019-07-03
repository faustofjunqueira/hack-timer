import { getConfig } from "../configuration/configuration.service";
import { createCicleFunction } from "../../utils/cicle-function";
import { IConfiguration } from "../configuration/configuration";
import config = require('config');

export async function startInstagramProcess() {
  const configuration = await getConfig();
  if (configuration) {
    createCicleFunction(instagramGetData)
      .start(
        config.get('instagram.time-fetch-data'),
        configuration
      );
  }
}

export async function instagramGetData(configuration: IConfiguration) {
  // pega o registro no instagram
  // parser o registro na base
  // salva no elasticsearch
}

