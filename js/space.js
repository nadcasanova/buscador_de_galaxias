

function mostrarImagenes(imagenes) {
    const container = document.getElementById('contenedor');
    container.innerHTML = '';
    imagenes.forEach(item => {
        const { links, data } = item;
        if (links && data.length > 0) {
            const { title, description, date_created } = data[0];
            const card = `
                <div class="col">
                    <div class="card mb-4">
                    <img src="${links[0].href}" class="card-img-top" alt="${title}">
                    <div class="card-body overflow-auto">
                        <h5 class="card-title">${title || 'Sin titulo'}</h5>
                        <p class="card-text">${description || 'Sin descripción disponible.'}</p>
                        <p class="card-text"><small class="text-muted">Fecha: ${date_created || 'Sin fecha'}</small></p>
                    </div>
                </div>
                </div>
            `;
            container.innerHTML += card;
        }
    });
}

async function buscarDeImagenes() {
    try {
        const texto = document.getElementById('inputBuscar').value;
        const url = `https://images-api.nasa.gov/search?q=${texto}`;
        const response = await fetch(url);
        const data = await response.json();
        mostrarImagenes(data.collection.items);
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('btnBuscar').addEventListener('click', buscarDeImagenes);