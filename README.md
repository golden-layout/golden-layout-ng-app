# GoldenLayoutNgApp

## Overview

This application is primarily used to test integration of Golden Layout with Angular. However it can be reviewed to gain an understanding of how this integration works when developing your own Angular application.

## Install and run

To run the application:
* Clone the repository into a directory on your computer.
* Install its dependencies with `npm install` or `npm ci`.
* From within that directory, run the script `npm run build` to build the application.
* Run the script `npm run start` to start the application.
* In a web browser, start the application with the URL:\
[http://localhost:4200](http://localhost:4200).

## Techniques

This application demonstrates how to write an Angular application using several different approaches to binding Angular components to Golden Layout:

1. **"Embedded with Events" using "Application Ref"**\
In this approach, the "Application Ref" technique is used to extract the root HTML Element from Angular components. This element is then bound to Golden Layout by embedding it within Golden Layout's own DOM sub tree. This is the classic approach to component binding used by Golden Layout. It is easiest to set up. However the Angular application's component tree hierarchy and the hierarchy of their host elements now differ. This works but note that the "Application Ref" technique uses undocumented Angular API calls.
1. **"Virtual with Events" using an Angular View Container as the parent of all layout components**\
This approach uses the standard (and documented) Angular methods for managing a Angular child components. Angular component host HTML elements are not extracted and they maintain the same hierarchy as their respective components. With "Virtual with Events" component binding, Golden Layout calculates the position, visibility and Z-Index of components but does not actually apply these to the components. Instead it fires events which allows the application to manage components' position, visibility and Z-Index. It has several advantages over "Embedded with Events" component binding which are discussed in the Golden Layout documentation.
1. **"Virtual with Events" using "Application Ref" to extract the root HTML Element from Angular components**\
A hybrid approach combining "Virtual with Events" with the "Application Ref" technique. There may be some performance advantages with this approach.

Note that when developing your own Angular application with Golden Layout, it is only necessary to implement one of the above approaches.

Earlier versions of this application used Golden Layout's `getComponentEvent` and `releaseComponentEvent` to implement the above "Embedded with Events" approach. These events are now deprecated. Please use the new `bindComponentEvent` and `unbindComponentEvent` events instead.

## Application Ref Technique

The "Application Ref" technique was written up by Carlos Roso: [Angular Pro Tip: How to dynamically create components in \<body\>](https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6)

Thanks also to ttquang1063750 whose post on Stack Overflow pointed me in this direction:
  [https://stackoverflow.com/questions/64478364/load-component-to-html-element](https://stackoverflow.com/questions/64478364/load-component-to-html-element)
