import { createContext, useContext, useState } from 'react';

const MeasureContext = createContext();

export const useMeasure = () => useContext(MeasureContext);

export const MeasureProvider = ({ children }) => {

    const [LSE, setLSE] = useState(1250);
    const [LIE, setLIE] = useState(1246);

    //funcion Xmed
    const Xmed = async () => { 
        try {
            const response = await window.api.getPromMeasurements();
            return response
        } catch (error) {
            console.error("Error en la función Xmed:", error);      
            
        }
    }
    const LSCXmed = async () => {
        const x = await Xmed();
        const r = await Rmed();
        return x + (0.577 * r);
      };
      const LICXmed = async () => {
        const x = await Xmed();
        const r = await Rmed();
        return x - (0.577 * r);
      };

    //funcion Rmed
    const Rmed = async () => {
        try {
            const response = await window.api.getRangeMeasurements();
            return await response
        } catch (error) {
            console.error("Error en la función Rmed:", error);      
            
        }
    }
    const LSCRmed = async () => {
        const r = await Rmed();
        return 2.114 * r;
      };

    //Otras
    const s = async () => {
        const r = await Rmed();
        return r / 2.326;
      };
      const CPK = async () => {
        const x = await Xmed();
        const sd = await s();
        return Math.min((LSE - x) / (3 * sd), (x - LIE) / (3 * sd));
      };
      const CP = async () => {
        const sd = await s();
        return (LSE - LIE) / (6 * sd);
      };

    //Limite de control
    const LSC = async () => {
        const lscx = await LSCXmed();
        return lscx + (0.00002 * lscx);
      };
      const LIC = async () => {
        const licx = await LICXmed();
        return licx - (0.00002 * licx);
      };

  return (
    <MeasureContext.Provider value={{ setLSE, setLIE, Xmed, LSCXmed, LICXmed, Rmed, LSCRmed, s, CPK, CP, LSC, LIC }}>
      {children}
    </MeasureContext.Provider>
  );
};
