# GoldenLayoutNgApp

## Install and run
This application demonstrates how to use Golden Layout inside an Angular application.

**Important:** Requires Golden Layout release which includes the Virtual Components feature. This is not yet available from NPM.

To run the application:
* Clone the repository into a directory on your computer.
* Install its dependencies with `npm install`.
* From within that directory, run the script `npm run build` to build the application.
* Run the script `npm run start` to start the application.
* In a web browser, start the application with the URL:\
[http://localhost:4200](http://localhost:4200).

## Techniques

Can either test with "virtual with events" or "embedded with events" binding.

With "virtual with events" binding, components can be connected to the Golden Layout host component using either a View Container (the normal Angular design) or using "Application Ref" (the technique used in version 1). There may be some performance advantages with using "Application Ref" instead of a View Container.

Earlier versions of this application used Golden Layout's `getComponentEvent` and `releaseComponentEvent`. These events are now deprecated and virtual components should now be used instead.

### Acknowledgement

The "Application Ref" technique was written up by Carlos Roso: [Angular Pro Tip: How to dynamically create components in \<body\>](https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6)

Thanks also to ttquang1063750 whose post on Stack Overflow pointed me in this direction:
  [https://stackoverflow.com/questions/64478364/load-component-to-html-element](https://stackoverflow.com/questions/64478364/load-component-to-html-element)
