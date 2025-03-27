import { exec } from 'child_process'

export const readSensor = async () => {
  return new Promise((resolve) => {
    exec(
      'python C:\\Users\\johan\\OneDrive\\Escritorio\\metric-coga\\src\\renderer\\src\\backend\\sensor\\sensor1.py',
      (error, stdout, stderr) => {
        if (error) {
          resolve(`Error: ${error.message}`)
        } else if (stderr) {
          resolve(`Error: ${stderr}`)
        } else {
          resolve(stdout.trim()) // Eliminamos espacios y saltos de línea extra
        }
      }
    )
  })
}

export const readSensor2 = async () => {
  return new Promise((resolve) => {
    exec(
      'python C:\\Users\\johan\\OneDrive\\Escritorio\\metric-coga\\src\\renderer\\src\\backend\\sensor\\sensor2.py',
      (error, stdout, stderr) => {
        if (error) {
          resolve(`Error: ${error.message}`)
        } else if (stderr) {
          resolve(`Error: ${stderr}`)
        } else {
          resolve(stdout.trim()) // Eliminamos espacios y saltos de línea extra
        }
      }
    )
  })
}
