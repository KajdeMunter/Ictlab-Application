# Ionic Application

### Creating your Ionic project
1. npm install -g cordova ionic
2. cd Timetable
3. ionic serve

### Deploying your iOS app [MAC OS ONLY + APPLE DEVELOPERS TEAM REQUIRED]
1. check if 'platforms' folder excists, if not, run: ionic cordova platform add ios
2. ionic cordova prepare && ionic build
3. open plaftorms -> ios -> Timetable.xcodeproj
4. add your Apple Developers Team to the project
5. run project on a simulator or your device
