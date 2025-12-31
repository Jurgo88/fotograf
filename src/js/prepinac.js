/**
 * Inicializuje logiku prepínania obsahu (sekcií) na základe kliknutia v navigačnom menu.
 * Predpokladá, že sekcie majú triedu '.content-section' a odkazy v menu 
 * majú 'href' začínajúci znakom '#' (napr. '#about-section').
 */
export function prepinac() {
    // console.log('Prepinac initialized');
    // 1. Získame všetky navigačné odkazy, ktoré by mali prepínať obsah (kotvy)
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    
    // 2. Získame všetky sekcie obsahu
    const contentSections = document.querySelectorAll('.content-section');

    // schovame vsetky sekcie okrem galerie
    contentSections.forEach(section => {
        if (!section.classList.contains('active')) {
            section.classList.add('hidden');
        }
    });

    /**
     * Skryje všetky sekcie a zobrazí len cieľovú sekciu.
     * @param {string} targetId - ID sekcie (bez '#').
     */
    function switchSection(targetId) {
        // console.log(`Switching to section: ${targetId}`);
        // A. Skry všetky sekcie
        contentSections.forEach(section => {
            // console.log(`Hiding section: ${section.id}`);
            section.classList.add('hidden');
            section.classList.remove('active');
        });

        // B. Ukáž len cieľovú sekciu
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetHash = link.getAttribute('href');

            // Overíme, či ide o lokálnu kotvu
            if (targetHash && targetHash.startsWith('#')) {
                // console.log(`Navigating to section: ${targetHash}`);
                // Zastavíme predvolené správanie (scroll)
                event.preventDefault(); 
                
                // Získame ID sekcie (odstránime #)
                const targetId = targetHash.substring(1); 
                
                // Spustíme prepínanie
                switchSection(targetId);
            }
        });
    });

    // Voliteľné: Zabezpečenie, že sa pri načítaní zobrazí prvá sekcia (napr. ak je prvá sekcia 'home-section')
    // Ak sa má zobraziť prvá sekcia s triedou .active, nie je to nutné.
}