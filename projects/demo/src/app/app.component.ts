import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import FroalaEditor from 'froala-editor';
import { DefineIcon,RegisterCommand } from 'froala-editor';
@Component({
  selector: 'app-demo',
  template: `

    <h1>Angular adapter for the Froala WYSIWYG editor</h1>
    <div class="sample">
      <h2>Sample 1: Inline Edit</h2>
      <div id="sample1" [froalaEditor]="titleOptions" [(froalaModel)]="myTitle"></div>
      <input [(ngModel)]="myTitle" (blur)="onBlurMethod()" />
    </div>
    <div class="sample">
      <h2>Sample 2: Full Editor</h2>
      <div id="sample2" [froalaEditor]="imgOptions" [(froalaModel)]="content" ></div>
      <h4>Rendered Content:</h4>
      <div [froalaView]="content"></div>
    </div>
    <div class="sample">
      <h2>Sample 3: Two way binding</h2>
      <div  id="sample3-1"  [froalaEditor] [(froalaModel)]="twoWayContent"></div>
      <div  id="sample3-2" [froalaEditor] [(froalaModel)]="twoWayContent"></div>
    </div>
    <div class="sample">
      <h2>Sample 4: Manual Initialization</h2>
      <button class="manual" (click)="initControls.initialize()">Initialize Editor</button>
      <button (click)="initControls.destroy()" [hidden]="!initControls || initControls.getEditor() == null">Close Editor</button>
      <button (click)="deleteAll()" [hidden]="!initControls || initControls.getEditor() == null">Delete All</button>
      <div id="sample4" [froalaEditor] (froalaInit)="initialize($event)" [(froalaModel)]="sample3Text">Check out the <a href="https://www.froala.com/wysiwyg-editor">Froala Editor</a></div>
    </div>
    <div class="sample">
      <h2>Sample 5: Editor on 'img' tag. Two way binding.</h2>
      <img id="sample5-1" [froalaEditor]="imgOptions" [(froalaModel)]="imgModel" />
      <img id="sample5-2" [froalaEditor]="imgOptions" [(froalaModel)]="imgModel" />
      <h4>Model Obj:</h4>
      <div>{{imgModel | json}}</div>
    </div>
    <div class="sample">
      <h2>Sample 6: Editor on 'button' tag</h2>
      <button  id="sample6" [froalaEditor] [(froalaModel)]="buttonModel"></button>
      <h4>Model Obj:</h4>
      <div>{{buttonModel | json}}</div>
    </div>
    <div class="sample">
      <h2>Sample 7: Editor on 'input' tag</h2>
      <input  id="sample7" [froalaEditor] [(froalaModel)]="inputModel" />
      <h4>Model Obj:</h4>
      <div>{{inputModel | json}}</div>
    </div>
    <div class="sample">
      <h2>Sample 8: Editor on 'a' tag. Manual Initialization</h2>
      <button class="manual" (click)="linkInitControls.initialize()">Initialize Editor</button>
      <button (click)="linkInitControls.destroy()" [hidden]="!linkInitControls || linkInitControls.getEditor() == null">Close Editor</button>
      <div>
      <a  id="sample8" [froalaEditor] (froalaInit)="initializeLink($event)" [(froalaModel)]="linkModel">Froala Editor</a>
      </div>
      <h4>Model Obj:</h4>
      <div>{{linkModel | json}}</div>
    </div>

    <div class="sample">
      <h2>Sample 9: Editor with reactive forms</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div *ngIf="formModel.invalid"> Name is too short. </div>
        <h3>Textarea with formControlName and froalaModel</h3>
        <textarea id="sample9-1" [froalaEditor] formControlName="formModel" [(froalaModel)]="form.formModel"></textarea>
        <h4>Rendered Content:</h4>
        <div [froalaView]="form.value.formModel"></div>
        <h3>Textarea only with formControlName</h3>
        <textarea  id="sample9-2" [froalaEditor] formControlName="formModel"></textarea>
        <button type="submit">Submit</button>
      </form>
      <button (click)="setValue()">Set preset value</button>
    </div>

    <div class="sample">
      <h2>Sample 10: Editor wrapped in a component with reactive forms</h2>
      <form [formGroup]="form2" (ngSubmit)="onSubmit2()">
        <div *ngIf="formModel.invalid"> Name is too short. </div>

        <froala-component formControlName="formModel"></froala-component>

        <button type="submit">Submit</button>
      </form>
      <button (click)="setValue2()">Set preset value</button>
    </div>

    <div class="sample">
      <h2>Sample 11: Add Custom Button</h2>
      <div  id="sample11" [froalaEditor]="options" [(froalaModel)]="content" ></div>
    </div>

  `
})

export class AppComponent implements OnInit {

  ngOnInit () {
    DefineIcon('alert', { SVG_KEY: 'help' });
    RegisterCommand('alert', {
      title: 'Hello',
      focus: false,
      undo: false,
      refreshAfterCallback: false,

      callback: function () {
        alert('Hello!');
      }
    });
  }

  // Sample 1 models
  public titleOptions: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    toolbarInline: true,
    events: {
      "initialized": () => {
        console.log('initialized');
      },
      "contentChanged": () => {
        console.log("content changed");
      }
    }
  }
  public myTitle: string;
  onBlurMethod()
  {
    console.log(this.myTitle);
  }


  // Sample 2 model
  public content: string = '<span>My Document\'s Title</span>';


  // Sample 3 model
   public twoWayContent;

  // Sample 4 models
  public sample3Text;
  public initControls;
  public deleteAll;
  public initialize(initControls) {
    this.initControls = initControls;
    this.deleteAll = function() {
        this.initControls.getEditor().html.set();
        this.initControls.getEditor().undo.reset();
        this.initControls.getEditor().undo.saveStep();
    };
  }

  // Sample 5 model
  public imgModel: Object = {
    src: '/image.jpg'
  };

  public imgOptions: Object = {
    angularIgnoreAttrs: ['style', 'ng-reflect-froala-editor', 'ng-reflect-froala-model'],
    immediateAngularModelUpdate: true,
    events: {
      "contentChanged": () => {
      }
    }
  }

  // Sample 6 model
  public buttonModel: Object = {
    innerHTML: 'Click Me'
  };

  // Sample 7 models
  public inputModel: Object = {
    placeholder: 'I am an input!'
  };

  // Sample 8 model
  linkInitControls;
  initializeLink(linkInitControls) {
   this.linkInitControls = linkInitControls;
  }

  public linkModel: Object = {
    href: 'https://www.froala.com/wysiwyg-editor'
  };

  // Sample 9
  formControls = {
    formModel: new FormControl('Hello World', Validators.minLength(2)),
  };
  form:any = new FormGroup(this.formControls);
  get formModel(): any { return this.form.get('formModel'); }
  onSubmit(): void {
    console.log(this.form.value);
  }
  setValue() { this.form.setValue({formModel: 'Default text'}); }

  // Sample 10
  form2 = new FormGroup({
    formModel: new FormControl('Hello World', Validators.minLength(2)),
  });
  get form2Model(): any { return this.form2.get('formModel'); }
  onSubmit2(): void {
    console.log(this.form2.value);
  }
  setValue2() { this.form2.setValue({formModel: 'Default text'}); }

  // Sample 11
  // Depending on your screen size you may want to use a specific toolbar dimension or all of them.

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
}
