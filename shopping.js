
// ===================================================================== INIT

let numOfProducts = 9;
let answered = 0;

let isScanning = false;

const containerProduct = document.getElementById("container-product");
const scannerReader = document.getElementById("reader");
const buttonSound = document.getElementById("buttonSound");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

const html5QrCode = new Html5Qrcode("reader");

function startGame() {
    buttonSound.currentTime = 0;
    buttonSound.play();

    answered = 0;

    if (isScanning){
        stopScanner();
    }

    products.sort(() => 0.5 - Math.random());

    while (containerProduct.firstChild) {
        containerProduct.firstChild.remove();
    }

    for (let i=0; i < numOfProducts; i++) {
        const card = document.createElement('img');
        card.setAttribute("src", products[i].src);
        card.setAttribute("id", products[i].id);
        card.setAttribute("index", i);
        card.addEventListener('click', scanning);

        containerProduct.append(card);
    }
    
}

function gameOver() {
    while (containerProduct.firstChild) {
        containerProduct.firstChild.remove();
    }

    const winBox = document.createElement("div");
    winBox.classList.add("win");
    winBox.innerHTML = "<i class='fa-solid fa-trophy'></i>";
    containerProduct.append(winBox);

    winSound.currentTime = 0;
    winSound.play();
}


// ===================================================================== SCANNER

function scanning() {

    if (isScanning){
        stopScanner();
    }

    isScanning = true;
    containerProduct.style.display = "none";

    html5QrCode.start(
        { facingMode: "environment" }, 
        {
            fps: 10,
            qrbox: {width: scannerReader.clientWidth, height: scannerReader.clientWidth},
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.CODE_128]
        },
        (decodedText, decodedResult) => {
            setTimeout(() => {
                stopScanner();

                if (decodedText === this.getAttribute("id")) {
                    this.style.opacity = 0;
                    this.removeEventListener('click', scanning);

                    correctSound.currentTime = 0;
                    correctSound.play();

                    answered += 1;

                    if (answered == numOfProducts) {
                        gameOver();
                    }
                }
                else {
                    wrongSound.currentTime = 0;
                    wrongSound.play();
                }
            }, 500);
        },
        (error) => {
            // Optional
        }
    ).catch(err => {
        console.error("Scanning failed: ", err);
    });

    const btnClose = document.createElement('button');
    btnClose.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    btnClose.addEventListener("click", () => {
        stopScanner();
    });

    setTimeout(() => {
        scannerReader.prepend(btnClose);
    }, 500);
    
}

function stopScanner() {
    isScanning = false;

    html5QrCode.stop().then(ignore => {
        console.log("Scan stopped.");
    }).catch(err => {
        console.error("Stop failed: ", err);
    });

    scannerReader.firstChild.remove();

    setTimeout(() => {
        containerProduct.style.display = "flex";
    }, 500);
}


