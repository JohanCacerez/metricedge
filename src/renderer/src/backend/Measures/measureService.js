import { queryDatabase, insertIntoDatabase, runQuery } from '../dbService'

export const getPromMeasurements = async () => {
    const result = queryDatabase(
      `SELECT SUM(median) as prom, COUNT(*) as cantidad FROM measurements`,
      []
    );
  
    if (result.length === 0 || result[0].cantidad === 0) return 0;
  
    const { prom, cantidad } = result[0];
    return prom / cantidad;
  };

  export  const getRangeMeasurements = async () => {   
    const result = queryDatabase(
      `SELECT SUM(range) as range, COUNT(*) as cantidad FROM measurements`,
      []
    );
  
    if (result.length === 0 || result[0].cantidad === 0) return 0;
  
    const { range, cantidad } = result[0];
    return range / cantidad;
  }
  