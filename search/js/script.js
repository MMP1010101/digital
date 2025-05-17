document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results-container');
    const suggestionsContainer = document.getElementById('search-suggestions');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Course data from materia.csv
    const courseData = [
        {
            document: "RA2",
            title: "RA2 – Quarta revolució industrial",
            activities: [
                {
                    number: "1",
                    description: "Crea una infografia en forma de línia del temps il·lustrada que representi les fites més importants de l'evolució de la indústria. Cal incloure-hi dates i descripcions breus.",
                    type: "actividad",
                    tags: ["Infografía", "Evolució", "Industria"]
                },
                {
                    number: "2",
                    description: "Investiga sobre els sensors que es troben comunament als telèfons mòbils actuals. Selecciona'n almenys tres i proporciona una descripció detallada de com operen i per a què es fan servir. Reflexiona sobre l'ús de tecnologies 4RI en sistemes domòtics interconnectats.",
                    type: "actividad",
                    tags: ["Sensores", "Móviles", "Domótica", "4RI"]
                },
                {
                    number: "4",
                    description: "Busca a internet exemples de relació entre IA i 4RI i comparteix-los en Canva o document compartit. Explora GPT Store, tria una app i exposa'n la utilitat.",
                    type: "actividad",
                    tags: ["IA", "4RI", "GPT", "Aplicaciones"]
                },
                {
                    number: "5",
                    description: "Esmenta tres exemples d'aplicacions o indústries que es beneficien de l'adopció de l'IoT. Llegeix l'article sobre dispositius IoT i amplia informació.",
                    type: "actividad",
                    tags: ["IoT", "Aplicaciones", "Industria"]
                },
                {
                    number: "6",
                    description: "Observa a casa dispositius IoT, enumera'ls i reflexiona com fan la vida més eficient.",
                    type: "actividad",
                    tags: ["IoT", "Eficiencia", "Dispositivos"]
                }
            ]
        },
        {
            document: "RA1",
            title: "RA1 – Economia lineal i circular · ODS",
            activities: [
                {
                    number: "1",
                    description: "Debat sobre avantatges i desavantatges de l'economia lineal. Cerca a internet el punt més proper al teu lloc de residència. Llista dispositius amb obsolescència programada.",
                    type: "actividad",
                    tags: ["Economía lineal", "Obsolescencia", "Debate"]
                },
                {
                    number: "2",
                    description: "Traça el cicle de vida d'un objecte comú i crea una infografia. Analitza residus a casa i documenta tres productes reciclables o reutilitzables. Revisa errors comuns a Ecoembes.",
                    type: "actividad",
                    tags: ["Ciclo de vida", "Reciclaje", "Residuos", "Infografía"]
                },
                {
                    number: "3",
                    description: "Analitza com l'estratègia d'economia circular d'Espanya afecta el teu sector. Proposa pràctiques circulars per al teu centre d'estudis i destaca beneficis. Identifica un punt de la cadena de subministrament per implementar economia circular.",
                    type: "actividad",
                    tags: ["Economía circular", "Estrategia", "Beneficios"]
                },
                {
                    number: "4",
                    description: "Estudi detallat d'una empresa local amb model circular: cadena de producció i gestió de recursos, reutilització, reciclatge i prolongació de vida útil. Impactes econòmics, socials i ambientals.",
                    type: "actividad",
                    tags: ["Empresa", "Modelo circular", "Impacto", "Recursos"]
                }
            ]
        },
        {
            document: "RA3",
            title: "RA3 – Cloud Computing",
            activities: [
                {
                    number: "1",
                    description: "Classifica serveis al núvol (IaaS/PaaS/SaaS) amb exemples reals i presenta'ls en taula o infografia.",
                    type: "actividad",
                    tags: ["Cloud", "IaaS", "PaaS", "SaaS", "Infografía"]
                },
                {
                    number: "2",
                    description: "Aula: enumera tres recursos TIC connectats al núvol amb breu descripció. Fes backup del mòbil al núvol, mostra configuració i avantatges/inconvenients.",
                    type: "actividad",
                    tags: ["TIC", "Backup", "Configuración", "Cloud"]
                },
                {
                    number: "3",
                    description: "Sector professional: analitza normatives de cloud computing per al teu sector i resumeix obligacions legals.",
                    type: "actividad",
                    tags: ["Normativas", "Legal", "Cloud computing", "Sector profesional"]
                },
                {
                    number: "4",
                    description: "Explora aplicacions IoT quotidianes i descriu tres exemples; indica una aplicació IoT pel teu sector i el seu valor afegit.",
                    type: "actividad",
                    tags: ["IoT", "Aplicaciones", "Valor añadido"]
                }
            ]
        },
        {
            document: "RA5",
            title: "RA5 – Transformació Digital i Tendències Tecnològiques",
            activities: [
                {
                    number: "1",
                    description: "Busca un negoci local basat en automatització o digitalització industrial, indica tecnologia fonamental i explica el seu impacte en els ingressos.",
                    type: "actividad",
                    tags: ["Automatización", "Digitalización", "Impacto", "Ingresos"]
                },
                {
                    number: "2",
                    description: "Identifica una empresa sense digitalitzar, proposa tecnologies per millorar eficència (p.ex. sistema de reserves online), i explica beneficis operatius i experiència client.",
                    type: "actividad",
                    tags: ["Digitalización", "Eficiencia", "Experiencia cliente"]
                },
                {
                    number: "3",
                    description: "IET: selecciona un repte global i investiga quatre tendències innovadores, descriu impacte en producció/distribució/consum i mediambiental.",
                    type: "actividad",
                    tags: ["IET", "Tendencias", "Innovación", "Impacto"]
                },
                {
                    number: "4",
                    description: "ERP: investiga què és, localitza tres exemples, detalla dos mòduls i tres casos d'èxit amb avantatges, desavantatges i viabilitat d'implementació.",
                    type: "actividad",
                    tags: ["ERP", "Implementación", "Casos de éxito"]
                }
            ]
        }
    ];
    
    // Generate complete project files list from course data
    const projectFiles = [];
    
    // Add document main files
    courseData.forEach(module => {
        projectFiles.push({
            title: module.title,
            path: `../${module.document.toLowerCase()}/index.html`,
            description: `Temario completo de ${module.title}`,
            tags: [module.document, "Temario", "Principal"],
            lastUpdated: "2023-11-15",
            type: "temario"
        });
        
        // Add individual activities
        module.activities.forEach(activity => {
            if (activity.number !== "Title") {
                projectFiles.push({
                    title: `${module.document} - Activitat ${activity.number}`,
                    path: `../${module.document.toLowerCase()}/actividad${activity.number}.html`,
                    description: activity.description,
                    tags: activity.tags,
                    lastUpdated: "2023-11-15",
                    type: "actividad"
                });
            }
        });
    });
    
    // Add additional resources
    projectFiles.push(
        {
            title: "Guía de Economía Circular",
            path: "../recursos/economia-circular.pdf",
            description: "Documento explicativo sobre los principios y aplicaciones de la economía circular",
            tags: ["Economía circular", "ODS", "Sostenibilidad", "PDF"],
            lastUpdated: "2023-10-10",
            type: "recursos"
        },
        {
            title: "Tutorial: Cloud Computing",
            path: "../recursos/tutorial-cloud.pdf",
            description: "Tutorial paso a paso para implementar servicios en la nube",
            tags: ["Cloud", "Tutorial", "Implementación", "PDF"],
            lastUpdated: "2023-10-12",
            type: "recursos"
        },
        {
            title: "Vídeo: Industria 4.0",
            path: "../videos/industria40.mp4",
            description: "Explicación visual sobre los componentes de la Industria 4.0",
            tags: ["Industria 4.0", "Tecnología", "Vídeo"],
            lastUpdated: "2023-09-25",
            type: "videos"
        }
    );

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

    // Trending tags click event
    document.querySelectorAll('.trending-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent;
            searchInput.value = tagText;
            searchInput.focus();
            searchInput.dispatchEvent(new Event('input'));
        });
    });

    // Recent search items click event
    document.querySelectorAll('.recent-item').forEach(item => {
        item.addEventListener('click', function() {
            const searchText = this.querySelector('span').textContent;
            searchInput.value = searchText;
            searchInput.focus();
            searchInput.dispatchEvent(new Event('input'));
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
            
            const typeIcon = getTypeIcon(file.type);
            
            suggestionItem.innerHTML = `
                <div class="suggestion-icon">${typeIcon}</div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${highlightMatch(file.title, searchInput.value)}</div>
                    <div class="suggestion-tags">${file.tags.slice(0, 3).join(' • ')}</div>
                </div>
                <div class="suggestion-arrow">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            `;
            
            // Add click event to navigate to the file
            suggestionItem.addEventListener('click', () => {
                window.location.href = file.path;
            });
            
            suggestionsContainer.appendChild(suggestionItem);
        });
        
        // Add "Ver todos los resultados" link if there are more results
        if (files.length > 5) {
            const viewAllItem = document.createElement('div');
            viewAllItem.className = 'suggestion-item view-all';
            viewAllItem.innerHTML = `
                <div class="view-all-text">Ver todos los resultados (${files.length})</div>
            `;
            viewAllItem.addEventListener('click', () => {
                suggestionsContainer.style.display = 'none';
                // Just keep the current results displayed
            });
            suggestionsContainer.appendChild(viewAllItem);
        }
    }

    // Get icon based on file type
    function getTypeIcon(type) {
        switch(type) {
            case 'temario':
                return '<i class="fa-solid fa-book-open"></i>';
            case 'actividad':
                return '<i class="fa-solid fa-laptop-code"></i>';
            case 'recursos':
                return '<i class="fa-solid fa-file-pdf"></i>';
            case 'videos':
                return '<i class="fa-solid fa-video"></i>';
            default:
                return '<i class="fa-solid fa-file"></i>';
        }
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
                    <p>Intenta con otros términos de búsqueda o cambia el filtro</p>
                </div>
            `;
            return;
        }
        
        // Group results by type for better organization
        const groupedResults = {
            temario: files.filter(file => file.type === 'temario'),
            actividad: files.filter(file => file.type === 'actividad'),
            recursos: files.filter(file => file.type === 'recursos'),
            videos: files.filter(file => file.type === 'videos')
        };
        
        // Set order of display
        const displayOrder = ['temario', 'actividad', 'recursos', 'videos'];
        let delay = 0;
        
        // Display each group
        displayOrder.forEach(type => {
            const typeFiles = groupedResults[type];
            if (typeFiles.length > 0) {
                // Create section header for this type if showing all types
                if (currentFilter === 'todos') {
                    const sectionHeader = document.createElement('h3');
                    sectionHeader.className = 'results-section-header';
                    sectionHeader.innerHTML = `
                        ${getTypeIcon(type)}
                        <span>${getTypeName(type)}</span>
                        <span class="results-count">(${typeFiles.length})</span>
                    `;
                    resultsContainer.appendChild(sectionHeader);
                }
                
                // Create result grid for this type
                const resultGrid = document.createElement('div');
                resultGrid.className = 'results-grid';
                
                // Create and append result elements
                typeFiles.forEach((file, index) => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.style.setProperty('--delay', delay++);
                    
                    // Generate badge for file type
                    const badge = `<span class="result-badge ${file.type}">${getTypeShortName(file.type)}</span>`;
                    
                    resultItem.innerHTML = `
                        ${badge}
                        <h3>${file.title}</h3>
                        <p>${file.description.length > 100 ? file.description.substring(0, 100) + '...' : file.description}</p>
                        <div class="tags">
                            ${file.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="result-footer">
                            <span class="last-updated">
                                <i class="fa-regular fa-clock"></i> 
                                Actualizado: ${formatDate(file.lastUpdated)}
                            </span>
                            <span class="view-more">Ver más <i class="fa-solid fa-arrow-right"></i></span>
                        </div>
                    `;
                    
                    // Add click event to navigate to the file
                    resultItem.addEventListener('click', () => {
                        window.location.href = file.path;
                    });
                    
                    resultGrid.appendChild(resultItem);
                });
                
                resultsContainer.appendChild(resultGrid);
            }
        });
    }

    // Get readable name for file type
    function getTypeName(type) {
        switch(type) {
            case 'temario':
                return 'Temarios';
            case 'actividad':
                return 'Actividades';
            case 'recursos':
                return 'Recursos';
            case 'videos':
                return 'Vídeos';
            default:
                return 'Otros';
        }
    }

    // Get short name for badge
    function getTypeShortName(type) {
        switch(type) {
            case 'temario':
                return 'Temario';
            case 'actividad':
                return 'Actividad';
            case 'recursos':
                return 'Recurso';
            case 'videos':
                return 'Vídeo';
            default:
                return 'Otro';
        }
    }

    // Format date for better readability
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    // Function to highlight matching text in suggestions
    function highlightMatch(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
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
        if (this.value.trim().length > 0) {
            suggestionsContainer.style.display = 'block';
        }
    });

    // Clear history button functionality
    document.querySelector('.clear-history')?.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const recentItems = document.querySelector('.recent-items');
        recentItems.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-history"></i>
                <p>No hay búsquedas recientes</p>
            </div>
        `;
    });

    // Update trending tags with the most common tags from our files
    updateTrendingTags();

    function updateTrendingTags() {
        // Get all tags from files
        const allTags = projectFiles.flatMap(file => file.tags);
        
        // Count occurrences of each tag
        const tagCounts = {};
        allTags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        
        // Sort tags by occurrence count
        const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
        
        // Take top 5 tags
        const topTags = sortedTags.slice(0, 5);
        
        // Update trending tags in the HTML
        const trendingTagsContainer = document.querySelector('.trending-tags');
        if (trendingTagsContainer) {
            trendingTagsContainer.innerHTML = topTags.map(tag => 
                `<span class="trending-tag">${tag}</span>`
            ).join('');
            
            // Add click event to the new trending tags
            document.querySelectorAll('.trending-tag').forEach(tag => {
                tag.addEventListener('click', function() {
                    searchInput.value = this.textContent;
                    searchInput.focus();
                    searchInput.dispatchEvent(new Event('input'));
                });
            });
        }
    }
});
