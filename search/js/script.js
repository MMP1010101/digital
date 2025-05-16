document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results-container');
    const suggestionsContainer = document.getElementById('search-suggestions');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Simulated database of all HTML files in the project
    // In a real application, this would be generated from the server
    const projectFiles = [
        {
            title: "RA1. Economia lineal i circular. ODS",
            path: "../ra1/index.html",
            description: "Introducción a la economía circular y los ODS",
            tags: ["Economía", "ODS", "Sostenibilidad"],
            lastUpdated: "2023-10-15",
            type: "temario"
        },
        {
            title: "RA2. Quarta revolució industrial",
            path: "../ra2/index.html",
            description: "Análisis de la cuarta revolución industrial y sus implicaciones",
            tags: ["Industria 4.0", "Tecnología", "Innovación"],
            lastUpdated: "2023-10-20",
            type: "temario"
        },
        {
            title: "RA3. Cloud computing",
            path: "../ra3/index.html",
            description: "Fundamentos y aplicaciones del cloud computing",
            tags: ["Cloud", "Infraestructura", "Servicios"],
            lastUpdated: "2023-11-05",
            type: "temario"
        },
        {
            title: "RA5. Pla de transformació",
            path: "../ra5/index.html",
            description: "Desarrollo de planes de transformación digital",
            tags: ["Transformación", "Estrategia", "Digital"],
            lastUpdated: "2023-11-10",
            type: "temario"
        },
        {
            title: "Activitat 1: Infografia (5MIX B)",
            path: "../actividades/actividad1.html",
            description: "Creación de infografías sobre tecnologías emergentes",
            tags: ["Infografía", "Diseño", "Comunicación"],
            lastUpdated: "2023-09-15",
            type: "actividad"
        },
        {
            title: "Activitat 2: Sensors - Domòtica (5MIX B)",
            path: "../actividades/actividad2.html",
            description: "Implementación de sensores en sistemas domóticos",
            tags: ["IoT", "Sensores", "Domótica"],
            lastUpdated: "2023-09-22",
            type: "actividad"
        },
        {
            title: "Activitat 4: Relació IA - 4Ri (5MIX B)",
            path: "../actividades/actividad4.html",
            description: "Análisis de la relación entre IA y la 4ª Revolución Industrial",
            tags: ["IA", "Industria 4.0", "Automatización"],
            lastUpdated: "2023-10-05",
            type: "actividad"
        },
        {
            title: "Activitat 5: IoT 1 (5MIX B)",
            path: "../actividades/actividad5.html",
            description: "Introducción al Internet de las Cosas (IoT)",
            tags: ["IoT", "Dispositivos", "Conectividad"],
            lastUpdated: "2023-10-12",
            type: "actividad"
        },
        {
            title: "Activitat 6: IoT 2 (5MIX B)",
            path: "../actividades/actividad6.html",
            description: "Implementación avanzada de soluciones IoT",
            tags: ["IoT", "Redes", "Aplicaciones"],
            lastUpdated: "2023-10-19",
            type: "actividad"
        }
    ];

    let currentFilter = "todos";
    let searchTimeout;

    // Initialize the search results with all files
    displayResults(projectFiles);

    // Search input event listener
    searchInput.addEventListener('input', function() {
        // Clear any pending timeout
        clearTimeout(searchTimeout);
        
        const query = this.value.trim().toLowerCase();
        
        // Show suggestions container if there's input
        if (query.length > 0) {
            suggestionsContainer.style.display = 'block';
            
            // Add a small delay to avoid excessive searches while typing
            searchTimeout = setTimeout(() => {
                const suggestions = searchFiles(query);
                displaySuggestions(suggestions);
                
                // Also update the main results
                const filteredResults = filterResults(suggestions, currentFilter);
                displayResults(filteredResults);
            }, 300);
        } else {
            // Hide suggestions if input is empty
            suggestionsContainer.style.display = 'none';
            
            // Reset results to show all files (with current filter)
            const filteredResults = filterResults(projectFiles, currentFilter);
            displayResults(filteredResults);
        }
    });

    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            currentFilter = filter;
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter results based on search input and selected filter
            const query = searchInput.value.trim().toLowerCase();
            let results = query.length > 0 ? searchFiles(query) : projectFiles;
            results = filterResults(results, filter);
            
            displayResults(results);
        });
    });

    // Search function
    function searchFiles(query) {
        if (!query) return projectFiles;
        
        return projectFiles.filter(file => {
            // Search in title, description, and tags
            return (
                file.title.toLowerCase().includes(query) ||
                file.description.toLowerCase().includes(query) ||
                file.tags.some(tag => tag.toLowerCase().includes(query))
            );
        });
    }
    
    // Filter results by type
    function filterResults(results, filter) {
        if (filter === 'todos') {
            return results;
        }
        return results.filter(file => file.type === filter);
    }

    // Display suggestions function
    function displaySuggestions(files) {
        // Limit to top 5 suggestions
        const topSuggestions = files.slice(0, 5);
        
        // Clear previous suggestions
        suggestionsContainer.innerHTML = '';
        
        if (topSuggestions.length === 0) {
            suggestionsContainer.innerHTML = '<div class="suggestion-item no-match">No se encontraron coincidencias</div>';
            return;
        }
        
        // Create and append suggestion elements
        topSuggestions.forEach((file, index) => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerHTML = `
                <div class="suggestion-title">${highlightMatch(file.title, searchInput.value)}</div>
                <div class="suggestion-tags">${file.tags.join(' • ')}</div>
            `;
            
            // Add click event to navigate to the file
            suggestionItem.addEventListener('click', () => {
                window.location.href = file.path;
            });
            
            suggestionsContainer.appendChild(suggestionItem);
        });
    }

    // Display search results function
    function displayResults(files) {
        // Clear the results container
        resultsContainer.innerHTML = '';
        
        if (files.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-search fa-3x"></i>
                    <h3>No se encontraron resultados</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            `;
            return;
        }
        
        // Create and append result elements
        files.forEach((file, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.style.setProperty('--delay', index);
            
            resultItem.innerHTML = `
                <h3>${file.title}</h3>
                <p>${file.description}</p>
                <div class="tags">
                    ${file.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
            
            // Add click event to navigate to the file
            resultItem.addEventListener('click', () => {
                window.location.href = file.path;
            });
            
            resultsContainer.appendChild(resultItem);
        });
    }

    // Function to highlight matching text in suggestions
    function highlightMatch(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // Close suggestions when clicking elsewhere
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#search-input') && !event.target.closest('#search-suggestions')) {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Show suggestions again when clicking on the input
    searchInput.addEventListener('click', function() {
        if (this.value.trim().length > 0 && suggestionsContainer.childElementCount > 0) {
            suggestionsContainer.style.display = 'block';
        }
    });
});
