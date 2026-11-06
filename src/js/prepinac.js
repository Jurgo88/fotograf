/**
 * Prepínanie sekcií s vlastnou adresou pre každú sekciu (napr. .../#kontakt).
 * - odkaz v menu s atribútom data-route prepne sekciu a zmení adresu
 * - funguje tlačidlo Späť/Dopredu v prehliadači
 * - po obnovení stránky alebo otvorení odkazu sa zobrazí správna sekcia
 */

// route (časť adresy za #) -> id sekcie
const ROUTES = {
    '': 'gallery-section',          // úvod
    'galeria': 'gallery-section',   // celá galéria
    'o-mne': 'about-section',
    'kontakt': 'contact-section',
    'extra': 'extra-section',
};

function currentRoute() {
    return decodeURIComponent(window.location.hash.slice(1));
}

/**
 * @param {(route: string) => void} [onRouteChange] - zavolá sa po každom prepnutí sekcie
 * @returns {{ navigate: (route: string) => void }}
 */
export function prepinac(onRouteChange) {
    const navLinks = document.querySelectorAll('.navbar a[data-route]');
    const contentSections = document.querySelectorAll('.content-section');

    function show(route) {
        // podpora starých odkazov typu #about-section
        if (!(route in ROUTES)) {
            const legacy = Object.keys(ROUTES).find((key) => ROUTES[key] === route);
            route = legacy ?? '';
        }
        const targetId = ROUTES[route];

        contentSections.forEach((section) => {
            const isTarget = section.id === targetId;
            section.classList.toggle('hidden', !isTarget);
            section.classList.toggle('active', isTarget);
        });

        navLinks.forEach((link) => {
            const isActive = link.dataset.route === route;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        if (onRouteChange) onRouteChange(route);
    }

    function navigate(route) {
        if (route !== currentRoute()) {
            const url = route
                ? `#${route}`
                : window.location.pathname + window.location.search;
            history.pushState(null, '', url);
        }
        show(route);
        window.scrollTo(0, 0);
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navigate(link.dataset.route);
        });
    });

    // Späť / Dopredu a ručne zmenená adresa
    window.addEventListener('popstate', () => show(currentRoute()));

    // úvodné zobrazenie podľa adresy
    show(currentRoute());

    return { navigate };
}
