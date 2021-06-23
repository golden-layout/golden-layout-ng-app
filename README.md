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

### Version 2

Version 2 uses Golden Layout's virtual components.

### Version 1

Version 1 used a technique written up by Carlos Roso: [Angular Pro Tip: How to dynamically create components in \<body\>](https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6)

Thanks also to ttquang1063750 whose post on Stack Overflow pointed me in this direction:
  [https://stackoverflow.com/questions/64478364/load-component-to-html-element](https://stackoverflow.com/questions/64478364/load-component-to-html-element)

This was implemented with Golden Layout's `getComponentEvent` and `releaseComponentEvent`. These events are deprecated and virtual components should now be used instead.