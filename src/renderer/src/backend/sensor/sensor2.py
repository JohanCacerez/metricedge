import nidaqmx

# Parámetros de calibración
OFFSET_VOLTAGE = 1.36  # Compensación para que -1.36V sea 0V
VOLT_MAX_REAL = 9.6  # Máximo real detectado
FACTOR_CONVERSION = 600 / VOLT_MAX_REAL  # mm por voltio

def read_sensor():
    try:
        with nidaqmx.Task() as task:
            task.ai_channels.add_ai_voltage_chan("Dev1/ai1", min_val=-2, max_val=10)
            voltaje = task.read()
            
            # Aplicar compensación
            voltaje_ajustado = voltaje + OFFSET_VOLTAGE
            
            # Convertir a mm
            mm = voltaje_ajustado * FACTOR_CONVERSION
            
            # Asegurar que no haya valores negativos
            mm = max(0, mm)
            
        return round(voltaje_ajustado, 2), round(mm, 2)
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    voltaje, mm = read_sensor()
    print(mm)
