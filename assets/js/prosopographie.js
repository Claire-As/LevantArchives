fetch('assets/js/prosopographie.json')
  .then(response => response.json())
  .then(characters => {
    const charactersByCountry = characters.reduce((acc, character) => {
      if (!acc[character.sert]) {
        acc[character.sert] = [];
      }
      acc[character.sert].push(character);
      return acc;
    }, {});

    const visualization = document.getElementById('visualization');
    const countryImages = {
      France: 'assets/img/france.png',
      Syrie: 'assets/img/syrie.png',
      Angleterre: 'assets/img/angleterre.png',
      Égypte: 'assets/img/egypte.png'
      // Ajoute d'autres pays avec leurs chemins d'image correspondants ici
    };

    for (const [country, characters] of Object.entries(charactersByCountry)) {
      const countryDiv = document.createElement('div');
      countryDiv.classList.add('country');

      const countryHeader = document.createElement('h3');
      countryHeader.textContent = country;

      const countryImg = document.createElement('img');
      countryImg.src = countryImages[country]; // Récupère le chemin d'image pour le pays

      countryDiv.appendChild(countryHeader);
      countryHeader.prepend(countryImg);

      characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');
      
        const characterImg = document.createElement('img');
        characterImg.src = 'assets/img/identity.png'; // Chemin de l'image de l'école
        characterImg.alt = 'icon personnage'; // Texte alternatif pour l'image
      
        characterDiv.appendChild(characterImg);
      
        const characterText = document.createElement('span');
        characterText.textContent = character.nom + ' - ' + character.fonction;
        characterDiv.appendChild(characterText);
      
        countryDiv.appendChild(characterDiv);
      });

      visualization.appendChild(countryDiv);

    }
  })
  .catch(error => {
    console.error('Erreur de chargement du fichier JSON : ', error);
  });