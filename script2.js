let partie_changeable = document.getElementById("partie_changeable")

const traitement = document.getElementById("traitement");
const information = document.getElementById("information");
const analyse = document.getElementById("analyse");
const donnee = document.getElementById("donnee");
const infos= document.getElementById("infos");
document.getElementById("info").addEventListener("click",()=>{
    analyse.style.display = "none";
    donnee.style.display = "none";
    infos.style.display = "block";

})

information.addEventListener("click", ()=>{
        infos.style.display = "none";
        analyse.style.display = "none";
        donnee.style.display = "block";
});
traitement.addEventListener("click", ()=>{
    infos.style.display = "none";
    donnee.style.display = "none";
    analyse.style.display = "block";
})

document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('imageInput');
    const fileList = document.getElementById('fileList');
    const uploadForm = document.getElementById('button');

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.stopPropagation();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', (event) => {
        event.preventDefault();
        event.stopPropagation();
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        event.stopPropagation();
        dropZone.classList.remove('dragover');

        const files = event.dataTransfer.files;
        if (files.length) {
            fileInput.files = files;
            updateFileList(files);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            updateFileList(fileInput.files);
        }
    });

    uploadForm.addEventListener('click', (event) => {
        if (!fileInput.files.length) {
            event.preventDefault();
            alert('Veuillez d\'abord sélectionner des fichiers.');
        }
    });

    function updateFileList(files) {
        fileList.innerHTML = '';
        for (let i = 0; i < files.length; i++) {
            const li = document.createElement('li');
            li.textContent = files[i].name;
            fileList.appendChild(li);
        }
    }
});

