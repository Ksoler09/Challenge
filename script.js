document.addEventListener('DOMContentLoaded', function() {

    
    document.getElementById('botonDescarga').addEventListener('click', async function() {
        const sizeValue = parseInt(document.getElementById('textoDescarga').value, 10);
        
        if (isNaN(sizeValue) || sizeValue < 1 || sizeValue > 100) {
            alert('Por favor, introduce un número entero válido entre 1 y 100 en el cuadro de texto.');
            return;
        }
        
        const apiUrl = "https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/samples?size=" + (sizeValue);
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.text();
            
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

    
    const botonCarga = document.getElementById('botonCarga');
    const fileInputCarga = document.getElementById('fileInputCarga');
    const textoCarga = document.getElementById('textoCarga');
    if (botonCarga && fileInputCarga && textoCarga) {
        botonCarga.addEventListener('click', function() {
            fileInputCarga.click();
        });

        fileInputCarga.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                textoCarga.value = this.files[0].name;  
            }
        });
    }
    
    const objectToString = obj => {
        let str = "{";
        for (const key in obj) {
            str += key + ': "' + obj[key] + '", ';
        }
        str = str.slice(0, -2) + "}";
        return str;
    };

    document.getElementById('boton2').addEventListener('click', async function() {
        const file = fileInputCarga.files[0];
        if (!file) {
            alert('Por favor, carga el archivo contactos.csv primero.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = async function(event) {
            const text = event.target.result;
            
            const lines = text.trim().split('\n');
            const formattedDataArray = lines.map(line => {
                const [name, phone, email] = line.split(',');
                return objectToString({
                    name: name, 
                    email: email, 
                    phone: phone 
                });
            });

            
            const dataString = '[' + formattedDataArray.join(',') + ']';
            console.log(dataString)

            
            try {
                const response = await fetch("https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items", {
                    method: 'POST',
                    body: JSON.stringify(dataString),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error en la petición POST: ' + response.statusText);
                }

                const responseData = await response.json();
                console.log(responseData);
                alert('Datos enviados con éxito!');
            } catch (error) {
                alert('Error al realizar la petición POST: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    });

});
