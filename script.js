document.addEventListener('DOMContentLoaded', function() {

    
    document.getElementById('botonDescarga').addEventListener('click', async function() {
        const sizeValue = parseInt(document.getElementById('textoDescarga').value, 10);
        
        if (isNaN(sizeValue) || sizeValue < 1 || sizeValue > 100) {
            alert('Por favor, introduce un número entero válido entre 1 y 100 en el cuadro de texto.');
            return;
        }
        
        const apiUrl = "https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/samples?size=" + (sizeValue-1);
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.text();
            
            /
            const blob = new Blob([data], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'contactos.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('Error al realizar la petición: ' + error.message);
        }
    });

    
    document.getElementById('boton2').addEventListener('click', function() {
        const fileInput = document.getElementById('fileInputDescarga');
        const file = fileInput.files[0];
        if (!file) {
            alert('Por favor, carga el archivo contactos.csv primero.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;
            
            const lines = text.split('\n');
            const formattedData = lines.map(line => {
                const [name, phone, email] = line.split(',');
                return { name, email, phone };
            });

            console.log(formattedData);
            alert(JSON.stringify(formattedData, null, 2));
        };
        
        reader.readAsText(file);
    });

    
    const botonCarga = document.getElementById('botonCarga');
    if (botonCarga) {
        botonCarga.addEventListener('click', function() {
        
        });
    }
});
