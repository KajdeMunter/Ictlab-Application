# Ionic Application

This application is made for the ICTLAB course from the University of Applied Sciences Rotterdam. The application is a new version for the current classroom planning system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install ionic. Easy with npm:

```
npm install -g cordova ionic
```

### Installing

To get your development environment running:

Make sure you changedir to the ```/Timetable``` directory.

Run

```ionic serve``` For one platform without any other ionic features.

Or

```ionic lab``` To test multiple platforms and make use of different ionic features.

If you want to use cordova features you will need to build it on a device or emulator:
```
ionic cordova platform add <PLATFORM NAME LIKE IOS OR ANDROID>
```
And to run it on a device:
```
ionic cordova run <PLATFORM NAME> --device
```
(use `-lc` to enable debug and live reloading)

## Running the tests

// TODO

## Deployment

### Deploying your iOS app 
__(!)__ MAC OS ONLY + APPLE DEVELOPERS TEAM REQUIRED
1. check if 'platforms' folder exists, if not, run: `ionic cordova platform add ios`
2. ionic cordova prepare && ionic build
3. open plaftorms -> ios -> Timetable.xcodeproj
4. add your Apple Developers Team to the project
5. run project on a simulator or your device

### Deploying your Android app 
1. Check if 'platforms' folder exists, if not, run: `ionic cordova platform add android`
2. Run `ionic cordova prepare && ionic cordova run android --prod --release`

## Built With

* [Ionic](https://www.ionicframework.com) - open-source SDK for hybrid mobile app development.
* [npm](https://www.npmjs.com) - Package manager for Javascript.
* [SCSS](https://sass-lang.com) - CSS extension.
* [Typescript](https://www.typescriptlang.org) - Javascript superset that compiles to plain Javascript.
* [Firebase](https://firebase.google.com) - A comprehensive mobile development platform that we use primarily for the notifications.

## Contributing

You can't yet unless you are a Hogeschool Rotterdam student part of ```Team Kaas```.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

See the list of [contributors](https://github.com/KajdeMunter/Ictlab-Application/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
