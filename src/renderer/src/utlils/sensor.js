const { exec } = require('child_process');

exec('python C:\\Users\\johan\\OneDrive\\Escritorio\\python\\prueba.py', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`Datos de la tarjeta DAQ: ${stdout}`);
});