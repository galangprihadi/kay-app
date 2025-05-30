// =====================================================================  PRODUCTS

const products =[
    {src: "products/cheeseburger.png", id: "KayA"},
    {src: "products/fries.png", id: "KayB"},
    {src: "products/hotdog.png", id: "KayC"},
    {src: "products/ice-cream.png", id: "KayD"},
    {src: "products/milkshake.png", id: "KayE"},
    {src: "products/pizza.png", id: "KayF"},
    {src: "products/cheeseburger.png", id: "KayA"},
    {src: "products/fries.png", id: "KayB"},
    {src: "products/hotdog.png", id: "KayC"},
    {src: "products/ice-cream.png", id: "KayD"},
    {src: "products/milkshake.png", id: "KayE"},
    {src: "products/pizza.png", id: "KayF"},
];


// ===================================================================== INIT

let numOfProducts = 15;

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


// ===================================================================== SCANNER

function scanning() {
    
    if (isScanning){
        stopScanner();
    }

    isScanning = true;
    containerProduct.style.display = "none";

    html5QrCode.start(
        { facingMode: "user" }, 
        {
            fps: 10,
            qrbox: {width: scannerReader.clientWidth, height: scannerReader.clientWidth},
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.CODE_128]
        },
        (decodedText, decodedResult) => {
            setTimeout(() => {
                stopScanner();

                if (decodedText === this.getAttribute("id")) {
                    //this.setAttribute("src", "products/blank.png");
                    //this.style.filter = "grayscale(80%) brightness(20%)";
                    this.style.opacity = 0;
                    this.removeEventListener('click', scanning);

                    correctSound.currentTime = 0;
                    correctSound.play();
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


