// Fetch data from API
fetch('https://picsum.photos/v2/list')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    show(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

function show(data) {
    const images = document.getElementById('images');
    const list = document.createDocumentFragment();

    data.map(function (image) {
        let img = document.createElement('img');
        img.src = image.download_url;
        img.alt = image.author;
        img.height = 150;

        list.appendChild(img);
    });

    images.appendChild(list);
}
