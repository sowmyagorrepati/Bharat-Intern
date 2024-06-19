let accordian = document.getElementsByClassName("faq-que-content");

for (let i = 0; i < accordian.length; i++) {
    accordian[i].addEventListener("click", function () {
        // Hide all other answers
        let allContents = document.getElementsByClassName("faq-ans");
        for (let j = 0; j < allContents.length; j++) {
            if (allContents[j] !== this.nextElementSibling) {
                allContents[j].style.maxHeight = null;
                if (accordian[j].childNodes[1].classList.contains("fa-x")) {
                    accordian[j].childNodes[1].classList.remove("fa-x");
                    accordian[j].childNodes[1].classList.add("fa-plus");
                }
            }
        }

        // Toggle current answer
        if (this.childNodes[1].classList.contains("fa-plus")) {
            this.childNodes[1].classList.remove("fa-plus");
            this.childNodes[1].classList.add("fa-x");
        } else {
            this.childNodes[1].classList.remove("fa-x");
            this.childNodes[1].classList.add("fa-plus");
        }

        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}
