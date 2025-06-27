## Precision Agriculture Project
# Goal: Develop a full stack mobile application to integrate wirelessly sensed data into site specific degree day models.
- Researched agriculture extension degree day model.
- Developing front-end and back-end React Native mobile application.
- Developing React Native / MongoDB integration for data flow.


## Current UI of App

### iOS
<img src="https://github.com/user-attachments/assets/e0abb402-3aab-4de6-9ced-935c487f2eee" width="250" height="550" title="iPhone 16 Pro Screenshot" alt="iPhone 16 Pro Screenshot"/>
<img src="https://github.com/user-attachments/assets/04013bc4-6d97-49ab-80d9-6aca89d9ee96" width="250" height="550" title="iPhone 16 Pro Screenshot" alt="iPhone 16 Pro Screenshot"/>
<img src="https://github.com/user-attachments/assets/a02e395c-50b3-4f78-94ab-1f53fbed039e" width="250" height="550" title="iPhone 16 Pro Screenshot" alt="iPhone 16 Pro Screenshot"/>

## Front-End
The front end of this project is a React Native application written using TypeScript. The tought behind making the switch from JavaScript to TypeScript was to type check the information. 

# Front-End tech used
- React Native
- TypeScript
- Zustand

# Structure
### Folders
#### App
Theme
- _layout.tsx

Pages
- index.tsx
- individualIntoScreen.tsx

#### Components
tiles
- AddMetric.tsx
- DegreeTile.tsx
- IndividualTile.tsx
- LoadingDegreeTile.tsx
- SettingsTile.tsx
- WeatherTile.tsx

ui
- FooterToHome.tsx
- IconSymbol.ios.tsx
- ReCalculateButton.tsx (Button for ui for re-calculating data)
- SelectDate.tsx (Used to select a date)
- Wrapper.tsx (Used to wrap other files for consistent look)

#### Constants
- Colors.ts (Used for having a central location of colors used)
- Metrics.ts (Used for looping and displaying data: Should change this to be dynamic from the backend instead)

#### Hooks
- useColorScheme.ts
- useColorScheme.web.ts
- useFetchLogic.ts (Used for housing the fetching logic from the backend and storing the data in Zustand)
- useThemeColor.ts

#### Stores
- storage.ts 
- useChangeDate.ts (Sends a POST request to backend with new data to change date of metric)
- useFetch.ts (Get request to get most up-to-date data)
- useMetric.ts
- useResetYear.ts (Sends a POST request to backend with new data to reset specific year)
- useStore.ts (Where local Metric data is changed and updated for Zustand for the applications state)
- useTime.ts (Where local time data is changed and updated for Zustand for the applications state)

### To work on moving forward
- Improve upon the overall UI of the application where seen fit
- For IndividualInfoPage.tsx make altering the info more user friendly as well as adding in the capability to do so for other info