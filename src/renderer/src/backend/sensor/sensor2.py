import sys
import random
import time

def read_sensor(port, mm_max, zero_mm, device):
    OFFSET_VOLTAGE = 1.36
    VOLT_MAX_REAL = 9.98
    FACTOR_CONVERSION = float(mm_max) / VOLT_MAX_REAL
    TOLERANCIA_VOLT = 0.01  # Si el voltaje ajustado es menor a esto, lo consideramos cero

    try:
        # Simulamos la lectura de voltaje entre 2V y 10V
        voltaje = random.uniform(2.0, 10.0)
        print(f"Voltaje simulado leído desde Dev{device}/{port}: {voltaje:.2f} V")

        voltaje_ajustado = voltaje + OFFSET_VOLTAGE

        if abs(voltaje_ajustado) < TOLERANCIA_VOLT:
            mm = 0.0
        else:
            mm = voltaje_ajustado * FACTOR_CONVERSION
            mm = mm - (zero_mm if zero_mm is not None else 0.0)

        print(f"Medición simulada: {round(mm, 2)} mm")
        print(f"Valor de cero: {zero_mm}")

    except Exception as e:
        print(f"Error en simulación: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 4 and len(sys.argv) != 5:
        print("Error: Debes proporcionar el puerto, el tamaño máximo en mm, y opcionalmente un voltaje de referencia y el dispositivo.")
    else:
        device = sys.argv[4] if len(sys.argv) == 5 else "1"
        zero_mm = float(sys.argv[3]) if len(sys.argv) >= 4 else 0.0
        read_sensor_simulado(sys.argv[1], sys.argv[2], zero_mm, device)
