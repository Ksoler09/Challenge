document.getElementById('boton1').addEventListener('click', async function() {
    const sizeValue = document.getElementById('texto').value;
    if (!sizeValue || isNaN(sizeValue)) {
        alert('Por favor, introduce un número válido en el cuadro de texto.');
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
