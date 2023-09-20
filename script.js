document.getElementById('boton1').addEventListener('click', async function() {
    const sizeValue = document.getElementById('texto').value;
    if (isNaN(sizeValue) || sizeValue < 1 || sizeValue > 100) {
        alert('Por favor, introduce un número entero válido entre 1 y 100 en el cuadro de texto.');
        return;
    }
    
    const apiUrl = "https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/samples?size=" + sizeValue;
    
    try {
        const response = await fetch(apiUrl);
        
        const data = await response.text();
        alert(data);
    } catch (error) {
        alert('Error al realizar la petición: ' + error.message);
    }
});

document.getElementById('boton2').addEventListener('click', function() {
    alert('Haz hecho clic en el Botón 2');
});
