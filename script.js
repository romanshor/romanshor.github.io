// Highlight the navigation link for the section currently in view.
// The page works fully without this script; it only adds aria-current to the nav.
document.addEventListener("DOMContentLoaded", function () {
    const links = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
    const sections = links
        .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
        .filter(Boolean);

    if (!sections.length) return;

    function setCurrent(id) {
        links.forEach((link) => {
            if (link.getAttribute("href") === "#" + id) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function update() {
        const header = document.querySelector(".site-header");
        const offset = (header ? header.offsetHeight : 0) + 24;
        let current = sections[0].id;

        for (const section of sections) {
            if (section.getBoundingClientRect().top - offset <= 0) {
                current = section.id;
            }
        }

        // At the very bottom of the page, the last section is current.
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
            current = sections[sections.length - 1].id;
        }

        setCurrent(current);
    }

    let ticking = false;
    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                update();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener("resize", update);
    update();
});
