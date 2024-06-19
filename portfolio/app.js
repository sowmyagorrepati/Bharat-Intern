
const toTop = document.querySelector(".top");
window.addEventListener("scroll",() =>{
    if (window.pageYOffset > 100){
        toTop.classList.add("active");
    }
    else{
        toTop.classList.remove("active");
    }
})

document.addEventListener("DOMContentLoaded", function() {
    const navbarLinks = document.querySelectorAll(".header .navbar  a");
    const homeLinks = document.querySelectorAll(".home-content .btn a");
    const navbarHeight = 50;

    navbarLinks.forEach(link => {
        link.addEventListener("click", smoothScroll);
    });

    homeLinks.forEach(link => {
        link.addEventListener("click", smoothScroll);
    });

    function smoothScroll(e) {
        const targetHref = e.target.getAttribute("href");

        if (targetHref === "./images/Resume.pdf") {
            return;
        }

        e.preventDefault();
        const targetId = targetHref.slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const targetPosition = targetSection.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    }
});
