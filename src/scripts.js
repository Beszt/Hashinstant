document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const copyButton = document.getElementById('copyButton');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const uploadedImage = document.getElementById('uploadedImage');
    const loader = document.getElementById('loader');
    const hashtags = document.getElementById('hashtags');

    uploadButton.addEventListener('click', function() {
        imageInput.click();
    });

    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage.src = e.target.result;
                imagePreview.classList.remove('d-none');
                loader.classList.remove('d-none');
                hashtags.classList.add('d-none');
                copyButton.classList.add('d-none');
                setTimeout(function() {
                    loader.classList.add('d-none');
                    hashtags.classList.remove('d-none');
                    copyButton.classList.remove('d-none');
                    generateHashtags();
                }, 2000); // Symulacja ładowania
            };
            reader.readAsDataURL(file);
        }
    });

    copyButton.addEventListener('click', function() {
        const hashtagsText = hashtags.textContent;
        navigator.clipboard.writeText(hashtagsText).then(function() {
            alert('Hashtagi skopiowane do schowka!');
        }, function(err) {
            alert('Błąd kopiowania hashtagów: ', err);
        });
    });

    function generateHashtags() {
        const exampleHashtags = ['#nature', '#photo', '#instagood', '#picoftheday', '#love', '#beautiful', '#happy', '#followme', '#art', '#selfie'];
        hashtags.innerHTML = exampleHashtags.join(' ');
    }
});