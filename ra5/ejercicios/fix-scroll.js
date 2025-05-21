// Script mejorado para corregir problemas de desplazamiento en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos principales
    const mainContent = document.querySelector('.main-content');
    const player = document.querySelector('.player');
    const appContainer = document.querySelector('.app-container');
    const sidebar = document.querySelector('.sidebar');
    
    // Función para aplicar estilos CSS con el prefijo correcto para cada navegador
    function applyStyleWithVendorPrefix(element, property, value) {
        const prefixes = ['', '-webkit-', '-moz-', '-ms-', '-o-'];
        prefixes.forEach(prefix => {
            element.style[prefix + property] = value;
        });
    }
    
    if (mainContent && player) {
        // Calcular el espacio correcto para el reproductor
        const playerHeight = player.offsetHeight;
        const paddingBottom = playerHeight + 40; // Añadimos espacio extra
        
        // Aplicar espacio para que el contenido no quede oculto debajo del reproductor
        mainContent.style.paddingBottom = paddingBottom + 'px';
        
        // Asegurar que el desplazamiento está habilitado
        mainContent.style.overflowY = 'auto';
        mainContent.style.height = '100vh';
        mainContent.style.position = 'relative';
        
        // Configurar el sidebar para que tenga altura completa pero permita desplazamiento
        if (sidebar) {
            sidebar.style.height = '100vh';
            sidebar.style.overflowY = 'auto';
            sidebar.style.overflowX = 'hidden';
            sidebar.style.position = 'sticky';
            sidebar.style.top = '0';
        }
        
        // Configurar el contenedor principal para permitir desplazamiento
        if (appContainer) {
            appContainer.style.overflow = 'hidden';
            appContainer.style.display = 'flex';
            appContainer.style.flexDirection = 'row';
            appContainer.style.height = '100vh';
            appContainer.style.width = '100vw';
            appContainer.style.position = 'relative';
        }
        
        // Configurar el reproductor correctamente
        player.style.position = 'fixed';
        player.style.bottom = '0';
        player.style.left = '0';
        player.style.right = '0';
        player.style.zIndex = '1000';
        
        // Ajustar para soporte de backdrop-filter en diferentes navegadores
        applyStyleWithVendorPrefix(player, 'backdrop-filter', 'blur(30px)');
        
        // Ajustar botones de navegación para asegurar visibilidad
        const navigationButtons = document.querySelector('.navigation-buttons');
        if (navigationButtons) {
            navigationButtons.style.marginBottom = '60px'; // Más espacio para evitar ocultamiento
        }
        
        // Añadir un listener de redimensionamiento para ajustar en tiempo real
        window.addEventListener('resize', function() {
            mainContent.style.paddingBottom = (player.offsetHeight + 40) + 'px';
        });
        
        // Solución para dispositivos táctiles (mejorar experiencia de desplazamiento)
        mainContent.addEventListener('touchstart', function(e) {
            // Permitir el desplazamiento táctil
        }, { passive: true });
    }
});
