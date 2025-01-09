# Angular Froala WYSIWYG Editor - [Demo](https://www.froala.com/wysiwyg-editor)

[![npm](https://img.shields.io/npm/v/angular-froala-wysiwyg.svg)](https://www.npmjs.com/package/angular-froala-wysiwyg)
[![npm](https://img.shields.io/npm/dm/angular-froala-wysiwyg.svg)](https://www.npmjs.com/package/angular-froala-wysiwyg)
[![npm](https://img.shields.io/npm/l/angular-froala-wysiwyg.svg)](https://www.npmjs.com/package/angular-froala-wysiwyg)

>Angular 19+ versions bindings for Froala WYSIWYG Editor.

![WYSIWYG HTML Editor](https://raw.githubusercontent.com/froala/wysiwyg-editor/v2/editor.jpg)

## Table of contents
1. [Installation instructions](#installation-instructions)
2. [Update editor instructions](#update-editor-instructions)
3. [Integration](#integration)
   - [angular-cli](#use-with-angular-cli)
   - [ionic v2 or v3](#use-with-ionic-v2-or-v3)
   - [webpack/starter](#use-with-webpack)
   - [System.js and JIT](#use-with-systemjs-and-jit)
   - [AOT](#use-with-aot)
4. [Usage](#usage)
5. [Manual Initialization](#manual-initialization)
6. [Displaying HTML](#displaying-html)
7. [License](#license)
8. [Development environment setup](#development-environment-setup)

## Installation instructions

Install `angular-froala-wysiwyg` from `npm`

```bash
npm install angular-froala-wysiwyg
```

You will need CSS styles

```html
<!-- index.html -->
<link href="node_modules/froala-editor/css/froala_editor.pkgd.min.css" rel="stylesheet">
```

>Note :  In case you want to use font-awesome icons , you can use them by installing it.
- Run ` npm install font-awesome ` 
- Or in `index.hml` add given cdn  
 `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">`


## Update editor instructions

```bash
npm update froala-editor --save
```

## Integration

### Use with Angular CLI

#### Installing @angular/cli

*Note*: you can skip this part if you already have application generated.

```bash
npm install -g @angular/cli
ng new my-app
cd my-app
```

#### Add angular-froala-wysiwyg

- install `angular-froala-wysiwyg`

```bash
npm install angular-froala-wysiwyg --save
```

- if you are adding Froala to an application that uses Server-side rendering, open `src/app/app.component.ts` and add

```typescript
// Import helpers to detect browser context
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
...

@Component({
  ...
  imports: [FroalaEditorModule, FroalaViewModule ... ],
  ...
})

export class AppComponent {
  ...
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Import Froala plugins dynamically only in the browser context
    if (isPlatformBrowser(this.platformId)) {
      // Import all Froala Editor plugins.
      // @ts-ignore
      // import('froala-editor/js/plugins.pkgd.min.js');

      // Import a single Froala Editor plugin.
      // @ts-ignore
      // import('froala-editor/js/plugins/align.min.js');

      // Import a Froala Editor language file.
      // @ts-ignore
      // import('froala-editor/js/languages/de.js');

      // Import a third-party plugin.
      // @ts-ignore
      // import('froala-editor/js/third_party/font_awesome.min');
      // @ts-ignore
      // import('froala-editor/js/third_party/image_tui.min');
      // @ts-ignore
      // import('froala-editor/js/third_party/spell_checker.min';
      // @ts-ignore
      // import('froala-editor/js/third_party/embedly.min');
    }
  }
  ...
}
```

- alternatively, for non-SSR applications, open `src/app/app.module.ts` and add

```typescript
// Import all Froala Editor plugins.
// import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/font_awesome.min';
// import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/spell_checker.min';
// import 'froala-editor/js/third_party/embedly.min';

// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
...

@NgModule({
   ...
   imports: [FroalaEditorModule.forRoot(), FroalaViewModule.forRoot() ... ],
   ...
})
```

- open `angular.json` file and insert a new entry into the `styles` array

```json
"styles": [
  "styles.css",
  "./node_modules/froala-editor/css/froala_editor.pkgd.min.css",
  "./node_modules/froala-editor/css/froala_style.min.css",
]
```

- open `src/app/app.component.html` and add

```html
<div [froalaEditor]>Hello, Froala!</div>
```

#### Run angular-cli
```bash
ng serve
```



### Use with `ionic v2 or v3`

#### Create Ionic app

*Note*: you can skip this part if you already have application generated.

```bash
npm install -g cordova ionic
ionic start sample blank
cd sample
```

#### Add angular-froala-wysiwyg

For v3 make sure that you use the latest version of ionic and also the latest version of angular.

Installing Froala Wysiwyg Editor in Ionic is fairly easy, it can be done using npm:
```bash
npm install angular-froala-wysiwyg --save
```

- Inside `src/app/app.component.html` add

```html
<ion-app>
<ion-router-outlet></ion-router-outlet>
<div [froalaEditor]>Hello, Froala!</div>
</ion-app>
```


- open `src/app/app.module.ts` and add

```typescript
// Import all Froala Editor plugins.
// import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/font_awesome.min';
// import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/spell_checker.min';
// import 'froala-editor/js/third_party/embedly.min';

// Import Angular2 plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
...

```
Replace  
```
imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule]
```
with   
```
imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()]
```

- Inside `src/app/app-routing.module.ts` remove the line
```
{ path: '', redirectTo: 'home', pathMatch: 'full' }  
```

- Inside `src/index.html`

```html
<link rel="stylesheet" href="assets/css/font-awesome.min.css">  
<link rel="stylesheet" href="assets/css/froala_editor.pkgd.min.css">
<link rel="stylesheet" href="assets/css/froala_style.min.css">
```

- In `angular.json` change outpath of build to  "outputPath": "src/assets" and insert following inside `assets`array  of build:
```javascript
"assets":[
 ...,
 
  {
    "glob": "**/*",
    "input": "node_modules/froala-editor/css",
    "output": "css"
  },
  {
    "glob": "**/*",
    "input": "node_modules/font-awesome/css",
    "output": "css"
  },
  {
    "glob": "**/*",
    "input": "node_modules/font-awesome/fonts",
    "output": "fonts"
  },
  {
    "glob": "**/*",
    "input": "node_modules/froala-editor/js",
    "output": "js"
  }
 ]
```

#### Run your App

```bash
ionic build
ionic serve
```



### Use with `webpack/starter`

#### Create webpack app

*Note*: you can skip this part if you already have application generated.

```bash
git clone --depth 1 https://github.com/AngularClass/angular-starter.git
cd angular-starter
npm install
npm install rxjs@6.0.0 --save
npm install @types/node@10.1.4
```

#### Add angular-froala-wysiwyg

- install `angular-froala-wysiwyg`

```bash
npm install angular-froala-wysiwyg --save
```

- open `src/app/app.module.ts` and add

```typescript
// Import all Froala Editor plugins.
// import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/font_awesome.min';
// import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/spell_checker.min';
// import 'froala-editor/js/third_party/embedly.min';

// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
...

@NgModule({
   ...
   imports: [FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), ... ],
   ...
})
```

- open `src/app/app.component.ts` and add to the template

```html
<div [froalaEditor]>Hello, Froala!</div>
```

- open `config/webpack.common.js`

```javascript
var webpack = require('webpack');
```


- open `config/webpack.common.js` and add the following to `CopyWebpackPlugin`

```javascript
{
  from: 'node_modules/froala-editor/css/',
  to: 'assets/froala-editor/css/',
},
```

- open `config/head-config.common.js` and add a new entry to link

```javascript
{ rel: 'stylesheet', href: '/assets/froala-editor/css/froala_editor.pkgd.min.css' },
{ rel: 'stylesheet', href: '/assets/froala-editor/css/froala_style.min.css' }
```

#### Run webpack app

```bash
npm run start
```

### Use with `system.js` and `JIT`

#### Create Angular app

*Note*: you can skip this part if you already have application generated.

```bash
git clone https://github.com/froala/angular-froala-systemjs-demo
cd angular-froala-systemjs-demo
npm install
```

#### Add angular-froala-wysiwyg

- install `angular-froala-wysiwyg`

```bash
npm install angular-froala-wysiwyg --save
```

- open `src/index.html` and add

```html
<link rel="stylesheet" href="node_modules/froala-editor/css/froala_editor.pkgd.min.css">
<link rel="stylesheet" href="node_modules/froala-editor/css/froala_style.min.css">
```

- open `src/app/app.module.ts` and add

```typescript
// Import all Froala Editor plugins.
// import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/font_awesome.min';
// import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/spell_checker.min';
// import 'froala-editor/js/third_party/embedly.min';

// Import Angular2 plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
...

@NgModule({
   ...
   imports: [FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), ... ],
   ...
})
```

- open `src/app/app.component.ts` file and add to the template

```html
<div [froalaEditor]>Hello, Froala!</div>
```

#### Run app

```bash
npm run start
```



### Use with `aot`

#### Create Angular app

1. ng new froala-aot

```javascript
{
  "glob": "**/*",
  "input": "./node_modules/froala-editor",
  "output": "assets/froala-editor/"
},
{
  "glob": "**/*",
  "input": "./node_modules/font-awesome",
  "output": "assets/font-awesome/"
},
{
  "glob": "**/*",
  "input": "./node_modules/jquery",
  "output": "assets/jquery/"
}
```
- Go to `package.json` and update `scripts.build` to `ng build --aot` and `scripts.start` to `ng serve --aot`

#### Add angular-froala-wysiwyg

- install `angular-froala-wysiwyg`

 In case you want to use font-awesome icons , you can use them by installing it.

- Run ` npm install font-awesome ` and add in `app.module.ts`
```
import 'froala-editor/js/third_party/font_awesome.min';
```

- Go to `angular.json` and change `architect.build.options.outputPath` to `src/dist` and add following json to `architect.build.options.assets array` 

```bash
npm install angular-froala-wysiwyg --save
```

- open `src/index.html` and add

```html
<link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="assets/froala-editor/css/froala_editor.pkgd.min.css">
```

- open `src/app/app.module.ts` and add

```typescript
// Import all Froala Editor plugins.
// import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/spell_checker.min';
// import 'froala-editor/js/third_party/embedly.min';

// Import Angular2 plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
...

@NgModule({
   ...
   imports: [FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), ... ],
   ...
})
```

- open `src/app/app.component.ts` file and add to the template

```html
<div [froalaEditor]>Hello, Froala!</div>
```

#### Run app

```bash
npm run build
npm run start
```


## Usage

### Options

You can pass editor options as Input (optional).

`[froalaEditor]='options'`

You can pass any existing Froala option. Consult the [Froala documentation](https://www.froala.com/wysiwyg-editor/docs/options) to view the list of all the available options:

```typescript
public options: Object = {
  placeholderText: 'Edit Your Content Here!',
  charCounterCount: false
}
```

Additional option is used:
* **immediateAngularModelUpdate**: (default: false) This option synchronizes the angular model as soon as a key is released in the editor. Note that it may affect performances.



### Events and Methods

Events can be passed in with the options, with a key events and object where the key is the event name and the value is the callback function.

```typescript
public options: Object = {
  placeholder: "Edit Me",
  events : {
    'focus' : function(e, editor) {
      console.log(editor.selection.get());
    }
  }
}
```

Using the editor instance from the arguments of the callback you can call editor methods as described in the [method docs](http://froala.com/wysiwyg-editor/docs/methods).

Froala events are described in the [events docs](https://froala.com/wysiwyg-editor/docs/events).



### Model

The WYSIWYG HTML editor content model.

`[(froalaModel)]="editorContent"`

Pass initial content:

```typescript
public editorContent: string = 'My Document\'s Title'
```

Use the content in other places:

```html
<input [ngModel]="editorContent"/>
<input [(ngModel)]="editorContent"/> <!-- For two way binding -->
```

Other two way binding example:

```html
<div [froalaEditor] [(froalaModel)]="editorContent"></div>
<div [froalaEditor] [(froalaModel)]="editorContent"></div>
```

Use it with reactive forms:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <textarea [froalaEditor] formControlName="formModel"></textarea>
  <button type="submit">Submit</button>
</form>
```

If you want to use two-way binding to display the form model in other places you must include `[(froalaModel)]`:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <textarea [froalaEditor] formControlName="formModel" [(froalaModel)]="form.formModel"></textarea>
  <div [froalaView]="form.formModel"></div>
  <button type="submit">Submit</button>
</form>
```

If you want to wrap froalaEditor directive into a component that supports reactive forms please see [froala.component.ts](https://github.com/froala/angular-froala-wysiwyg/blob/master/projects/demo/src/app/froala.component.ts) from demo.

### Extend functionality

You can extend the functionality by adding a custom button like bellow:

```typescript
// Import Froala Editor.
import FroalaEditor from 'froala-editor';

// We will make usage of the Init hook and make the implementation there.
import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `<div class="sample">
               <h2>Sample 11: Add Custom Button</h2>
               <div [froalaEditor]="options" [(froalaModel)]="content" ></div>
             </div>`,


export class AppComponent implements OnInit{

  ngOnInit () {
    FroalaEditor.DefineIcon('alert', {NAME: 'info'});
    FroalaEditor.RegisterCommand('alert', {
      title: 'Hello',
      focus: false,
      undo: false,
      refreshAfterCallback: false,

      callback: () => {
        alert('Hello!', this);
      }
    });
  }

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
}
```


### Special tags
Note: In order to use special tags in `app.module.ts` add
```
// Import all Froala Editor plugins.
 import 'froala-editor/js/plugins.pkgd.min.js';
```

You may also use the editor on **img**, **button**, **input** and **a** tags:

```html
<img [froalaEditor] [(froalaModel)]="imgObj"/>
```

The model must be an object containing the attributes for your special tags. Example:

```typescript
public imgObj: Object = {
  src: 'path/to/image.jpg'
};
```

The froalaModel will change as the attributes change during usage.

* froalaModel can contain a special attribute named **innerHTML** which inserts innerHTML in the element: If you are using 'button' tag, you can specify the button text like this:

```typescript
public buttonModel: Object = {
  innerHTML: 'Click Me'
};
```
As the button text is modified by the editor, the **innerHTML** attribute from buttonModel model will be modified too.



### Specific option for special tags

* **angularIgnoreAttrs**: (default: null) This option is an array of attributes that you want to ignore when the editor updates the froalaModel:

```typescript
public inputOptions: Object = {
  angularIgnoreAttrs: ['class', 'id']
};
```



## Manual Initialization

Gets the functionality to operate on the editor: create, destroy and get editor instance. Use it if you want to manually initialize the editor.

`(froalaInit)="initialize($event)"`

Where `initialize` is the name of a function in your component which will receive an object with different methods to control the editor initialization process.

```typescript
public initialize(initControls) {
  this.initControls = initControls;
  this.deleteAll = function() {
  	this.initControls.getEditor()('html.set', '');
  };
}
```

The object received by the function will contain the following methods:

- **initialize**: Call this method to initialize the Froala Editor
- **destroy**: Call this method to destroy the Froala Editor
- **getEditor**: Call this method to retrieve the editor that was created. This method will return *null* if the editor was not yet created




## Displaying HTML

To display content created with the froala editor use the froalaView directive.

`[froalaView]="editorContent"`

```html
<div [froalaEditor] [(froalaModel)]="editorContent"></div>
<div [froalaView]="editorContent"></div>
```



## License

The `angular-froala-wyswiyg` project is under MIT license. However, in order to use Froala WYSIWYG HTML Editor plugin you should purchase a license for it.

Froala Editor has [3 different licenses](http://froala.com/wysiwyg-editor/pricing) for commercial use.
For details please see [License Agreement](http://froala.com/wysiwyg-editor/terms).



## Development environment setup

If you want to contribute to angular-froala-wyswiyg, you will first need to install the required tools to get the project going.

#### Prerequisites

* [Node Package Manager](https://npmjs.org/) (NPM)
* [Git](http://git-scm.com/)

#### Install dependencies

    $ npm install

#### Build

    $ npm run demo.build

#### Run Demo

    $ npm run start
