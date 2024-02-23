# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install the dependencies

Need to install the node_modules, run the following command from the _root_ of the project:

```bash
npm install
```

## Step 2: Start the Metro Server

Need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following commands from the _root_ of the project:

```bash
npm start
```

## Step 3.1: Start your Application (Using Terminal)

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of the project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

Make sure you have the device connected or else Android emulator running before running the below command:

```bash
npm run android
```

### For iOS

Make sure you have the device connected or else iOS emulator running before running the below command:

```bash
cd ios && bundle install && cd ..
npx pod-install ios 
npm run ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

## Step 3.2: Start your Application (Using Android Studio)

-> Open the android folder in _root_ of the project via 'Android Studio'
-> Connect a physical device or create a virtual device in 'Device Manager' in android studio.
-> Select the 'app' and desired device and click on 'run' icon in the toolbar.
-> App will get installed in the Android emulator and open.

## Step 3.3: Start your Application (Using Xcode)

Run the below commands:

```bash
cd ios && bundle install && cd ..
npx pod-install ios 
```

-> Open `ios/risk_profile_calculator.xcworkspace` in _root_ of the project via 'Xcode'
-> Selected the desired emulator from the list and click on the 'Build and Run' icon in the tool bar.
-> App will get installed in the iOS emulator and open.
