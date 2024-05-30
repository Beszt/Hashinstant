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
                loader.classList.remove('hidden');
                imagePreview.classList.add('hidden');
                hashtags.classList.add('hidden');
                copyButton.classList.add('hidden');
                setTimeout(function() {
                    loader.classList.add('hidden');
                    imagePreview.classList.remove('hidden');
                    hashtags.classList.remove('hidden');
                    copyButton.classList.remove('hidden');
                    generateHashtags();
                }, 2000); // Symulacja ładowania
            };
            reader.readAsDataURL(file);
        }
    });

    copyButton.addEventListener('click', function() {
        const hashtagsText = hashtags.textContent;
        navigator.clipboard.writeText(hashtagsText).then(function() {
            alert('Hashtags coppied to clipboard!');
        }, function(err) {
            alert('Error on copying hashtags: ', err);
        });
    });

    function generateHashtags() {
        const exampleHashtags = ['#nature', '#photo', '#instagood', '#picoftheday', '#love', '#beautiful', '#happy', '#followme', '#art', '#selfie'];
        hashtags.innerHTML = exampleHashtags.join(' ');
    }
});