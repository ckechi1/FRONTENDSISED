# FrontEndSISED

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.6.

## Development server

In general you would Run `ng serve` to start the  server and navigate to `http://localhost:4200/` but in this case i change the proxy config to reach the backend instead of using ` @CrossOrigin(origins = "http://localhost:4200")` Spring boot side.   
you have to change the `proxy.json.config` file inside angular to match the backend uri. 
`{ 
    "/SISED/*": {
        "target": "http://localhost:8080",
        "secure": false,
        "logLevel": "debug"
      }
     
}` 

then `npm start` to start the server . The app will automatically reload if you change any of the source files. 
      
### project screenshot 

![alt text]( https://github.com/ckechi1/FRONTENDSISED/blob/master/img1.png)  
![alt text]( https://github.com/ckechi1/FRONTENDSISED/blob/master/img2.png)  
![alt text]( https://github.com/ckechi1/FRONTENDSISED/blob/master/img3.png)  
![alt text]( https://github.com/ckechi1/FRONTENDSISED/blob/master/img4.png) 

 ### Installing  
 install git and checkout from version control  
``` 
 VCS > Checkout from version control > Git   
 ``` 
clone using this link  
``` 
 https://github.com/ckechi1/FRONTENDSISED.git 
 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


