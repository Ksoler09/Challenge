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


const formatPhoneNumber = (phone) => {
    let cleaned = ('' + phone).replace(/\D/g, '');  

    
    while (cleaned.length < 10) {
        cleaned = '0' + cleaned;
    }

    
    if (cleaned.length > 10) {
        cleaned = cleaned.substring(0, 10);
    }

    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return [match[1], match[2], match[3]].join('-');
    }
    return null;
}


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
            const formattedPhone = formatPhoneNumber(phone.trim());
            if (!formattedPhone) {
                alert(`El número de teléfono ${phone.trim()} no tiene el formato correcto.`);
                return null;
            }
            return {
                name: name.trim(), 
                email: email.trim(), 
                phone: formattedPhone
            };
        }).filter(Boolean);

        const dataString = formattedDataArray.map(data => JSON.stringify(data));

        for (const record of dataString) {
            try {
                const response = await fetch("https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items", {
                    method: 'POST',
                    body: record,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow'
                });

                if (!response.ok) {
                    throw new Error('Error en la petición POST: ' + response.statusText);
                }

                const responseData = await response.json();
                console.log(responseData);
            } catch (error) {
                alert('Error al realizar la petición POST para el registro ' + record + ': ' + error.message);
                break;
            }
        }
        alert('Datos enviados con éxito!');
    };
    
    reader.readAsText(file);


    });
   

});
