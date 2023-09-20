document.getElementById('boton1').addEventListener('click', async function() {
    const sizeValue = parseInt(document.getElementById('texto').value, 10);
    
    if (isNaN(sizeValue) || sizeValue < 1 || sizeValue > 100) {
        alert('Por favor, introduce un número entero válido entre 1 y 100 en el cuadro de texto.');
        return;
    }
    
    const apiUrl = "https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/samples?size=" + (sizeValue-1);
    
    try {
        const response = await fetch(apiUrl);
        
   
        const data = await response.text();
        
        
        const lines = data.split('\n');
        const formattedData = lines.map(line => {
            const [name, phone, email] = line.split(',');
            return { name, email, phone };
        });

        console.log(formattedData);

        alert(JSON.stringify(formattedData, null, 2));
    } catch (error) {
        alert('Error al realizar la petición: ' + error.message);
    }
});

document.getElementById('boton2').addEventListener('click', function() {
    alert('Haz hecho clic en el Botón 2');
});
