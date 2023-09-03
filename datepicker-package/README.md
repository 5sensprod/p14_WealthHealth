# React Custom DatePicker

Un composant DatePicker personnalisé pour React.
Installation

## Installez via npm

npm install react-custom-datepicker

## Utilisation

```javascript
import DatePicker from 'react-custom-datepicker'

function App() {
  return (
    <div>
      <h1>Mon application</h1>
      <DatePicker name={name} value={value} onChange={onChange} />
    </div>
  )
}
export default App
```

Notes importantes:

    Les props name, value et onChange sont essentiels pour récupérer les données.
    La prop value doit être au format spécifié par dateFormat (par défaut, DD/MM/YYYY).
    Si vous souhaitez lier le DatePicker à un <label>, assurez-vous de fournir un attribut id unique au DatePicker et utilisez ce même ID dans l'attribut for du <label>. Ceci améliore l'accessibilité et l'expérience utilisateur :

    ```javascript

import DatePicker from 'react-custom-datepicker'

function App() {
return (

<div>
<label htmlFor={`${name}DateInput`}>{label}</label>
<DatePicker
id={`${name}DateInput`}
name={name}
value={value}
onChange={onChange}
/>
</div>
)
}
export default App
```

## Configurations

Les props name, value et onChange sont essentiels pour récupérer les données.

### Exemple :

<DatePicker
  name={name}
  value={value}
  onChange={onChange}
  startOfWeek="1"
  language="fr"
  dateFormat="ISO"
  manualInputEnabled={true}
/>

Vous pouvez personnaliser le comportement et l'apparence du DatePicker avec les props suivantes :

- **useIcons** (type: Boolean, default: `true`):

  - Si `true`, des icônes (chevrons) seront utilisées pour la navigation du calendrier.
  - Si `false`, du texte sera utilisé à la place.

- **dateFormat** (type: String, default: `'DEFAULT'`):

  - Le format de la date affichée. Les options disponibles sont `'DEFAULT'`, `'US'`, et `'ISO'`, qui correspondent respectivement à `'DD-MM-YYYY'`, `'MM-DD-YYYY'` et `'YYYY-MM-DD'`.

- **customStyles** (type: Object, default: `{}`):

  - Un objet pour surcharger les styles par défaut.

- **startOfWeek** (type: Number, default: `0`):

  - Définit le premier jour de la semaine. `0` pour Dimanche, `1` pour Lundi, etc.

- **manualInputEnabled** (type: Boolean, default: `true`):

  - Si `true`, permet à l'utilisateur d'entrer manuellement une date.
  - Sinon, l'utilisateur doit sélectionner une date à partir du calendrier.

- **minYear** et **maxYear** (type: Number ou String, default: `1930` et `2025` respectivement):

  - Définit l'année minimum et maximum disponibles pour la sélection.
  - Vous pouvez également utiliser des valeurs comme `'auto-10'` pour `minYear`, qui serait l'année actuelle moins 10 ans.

- **language** (type: String, default: `'en'`):

  - Définit la langue du calendrier. Les options disponibles sont `'en'` pour l'anglais et `'fr'` pour le français.

- **yearBlockSize** (type: Number, default: `16`):

  - Nombre d'années à afficher dans le sélecteur d'année.

- **designType** (type: String, default: `'default'`):
  - Change le design du DatePicker. Les valeurs possibles sont :
    - `'default'`: Design standard.
    - `'neuro'`: Design effet neurmorphism.
    - `'glass'`: Design effet glassmorphism.

## Contribution

Les contributions sont les bienvenues. Veuillez ouvrir une issue ou soumettre une pull request sur GitHub.

## Licence

MIT

```

```
