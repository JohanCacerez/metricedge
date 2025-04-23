import nidaqmx
import sys

def read_sensor(port, mm_max):
    OFFSET_VOLTAGE = 1.36
    VOLT_MAX_REAL = 9.98
    FACTOR_CONVERSION = float(mm_max) / VOLT_MAX_REAL
    TOLERANCIA_VOLT = 0.01  # Si el voltaje ajustado es menor a esto, lo consideramos cero

    try:
        with nidaqmx.Task() as task:
            task.ai_channels.add_ai_voltage_chan(f"Dev2/{port}", min_val=2, max_val=10)
            voltaje = task.read()
            
            voltaje_ajustado = voltaje + OFFSET_VOLTAGE
            
            # Si el voltaje ajustado está en un rango muy pequeño, la medida se fija en 0 mm
            if abs(voltaje_ajustado) < TOLERANCIA_VOLT:
                mm = 0.0
            else:
                mm = voltaje_ajustado * FACTOR_CONVERSION

            # Imprimir voltaje original y ajustado con conversión
            print(f"Voltaje leído: {voltaje:.5f} V")
            print(f"Voltaje ajustado: {voltaje_ajustado:.5f} V")
            print(f"Medida: {round(mm, 2)} mm")

    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Error: Debes proporcionar el puerto y el tamaño máximo en mm")
    else:
        read_sensor(sys.argv[1], sys.argv[2])


import nidaqmx
import sys

def read_sensor(port, mm_max):
    OFFSET_VOLTAGE = 1.36
    VOLT_MAX_REAL = 9.6
    FACTOR_CONVERSION = float(mm_max) / VOLT_MAX_REAL

    try:
        with nidaqmx.Task() as task:
            task.ai_channels.add_ai_voltage_chan(f"Dev1/{port}", min_val=2, max_val=10)
            voltaje = task.read()
            
            voltaje_ajustado = voltaje + OFFSET_VOLTAGE
            mm = voltaje_ajustado * FACTOR_CONVERSION
            mm = max(0, mm)
            
        print(round(mm, 2))
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Error: Debes proporcionar el puerto y el tamaño máximo en mm")

    else:
        read_sensor(sys.argv[1], sys.argv[2])


